#!/bin/sh
set -e

JWT_DIR="/var/www/html/config/jwt"
mkdir -p "$JWT_DIR"

# Décode les clés JWT depuis les variables d'environnement base64
if [ -n "$JWT_SECRET_KEY_BASE64" ] && [ -n "$JWT_PUBLIC_KEY_BASE64" ]; then
    echo "$JWT_SECRET_KEY_BASE64" | base64 -d > "$JWT_DIR/private.pem" 2>/dev/null || true
    echo "$JWT_PUBLIC_KEY_BASE64" | base64 -d > "$JWT_DIR/public.pem" 2>/dev/null || true
fi

# Si les clés n'existent pas encore, les générer automatiquement
if [ ! -s "$JWT_DIR/private.pem" ]; then
    echo "Génération automatique des clés JWT..."
    PASSPHRASE="${JWT_PASSPHRASE:-shiftly_default_passphrase}"
    openssl genpkey -out "$JWT_DIR/private.pem" -aes256 \
        -algorithm rsa -pkeyopt rsa_keygen_bits:4096 \
        -pass "pass:$PASSPHRASE" 2>/dev/null
    openssl pkey -in "$JWT_DIR/private.pem" -out "$JWT_DIR/public.pem" \
        -pubout -passin "pass:$PASSPHRASE" 2>/dev/null
    echo "Clés JWT générées avec succès."
fi

chown www-data:www-data "$JWT_DIR"/*.pem 2>/dev/null || true
chmod 600 "$JWT_DIR/private.pem" 2>/dev/null || true
chmod 644 "$JWT_DIR/public.pem" 2>/dev/null || true

# Attendre que la base de données soit prête (max 30s)
if [ -n "$DATABASE_URL" ]; then
    echo "Attente de la base de données..."
    ATTEMPTS=0
    MAX_ATTEMPTS=15
    until php /var/www/html/bin/console doctrine:query:sql "SELECT 1" --env=prod > /dev/null 2>&1; do
        ATTEMPTS=$((ATTEMPTS + 1))
        if [ "$ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
            echo "WARN: Base de données non accessible après ${MAX_ATTEMPTS} tentatives, démarrage sans migration."
            break
        fi
        echo "  tentative $ATTEMPTS/$MAX_ATTEMPTS..."
        sleep 2
    done

    if [ "$ATTEMPTS" -lt "$MAX_ATTEMPTS" ]; then
        echo "Exécution des migrations..."
        php /var/www/html/bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration --env=prod 2>&1 || true
    fi
fi

php /var/www/html/bin/console cache:clear --env=prod 2>/dev/null || true
php /var/www/html/bin/console cache:warmup --env=prod 2>/dev/null || true

echo "Démarrage de l'application..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
