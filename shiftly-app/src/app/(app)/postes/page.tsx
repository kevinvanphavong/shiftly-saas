import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Postes — Shiftly' }

const zones = [
  { nom: 'Accueil', color: '#3b82f6', competences: [
    { titre: 'Gestion des réservations en ligne', diff: 'avancee', pts: 30, prio: 'important' },
    { titre: 'Accueil et attribution des pistes', diff: 'simple', pts: 15, prio: 'vitale' },
  ], missions: [
    { titre: 'Allumer les écrans d\'affichage', cat: 'OUVERTURE', prio: 'vitale' },
    { titre: 'Vérifier la caisse', cat: 'OUVERTURE', prio: 'vitale' },
    { titre: 'Accueillir les groupes', cat: 'PENDANT', prio: 'vitale' },
    { titre: 'Faire la caisse', cat: 'FERMETURE', prio: 'vitale' },
  ]},
  { nom: 'Bar', color: '#a855f7', competences: [
    { titre: 'Préparation cocktails sans alcool', diff: 'avancee', pts: 25, prio: 'important' },
    { titre: 'Gestion du stock bar', diff: 'experimente', pts: 40, prio: 'important' },
  ], missions: [
    { titre: 'Vérifier les stocks de boissons', cat: 'OUVERTURE', prio: 'important' },
    { titre: 'Préparer les commandes et servir', cat: 'PENDANT', prio: 'vitale' },
    { titre: 'Nettoyer le comptoir et les tables', cat: 'MENAGE', prio: 'important' },
  ]},
  { nom: 'Salle', color: '#22c55e', competences: [
    { titre: 'Entretien de base des pistes', diff: 'simple', pts: 10, prio: 'vitale' },
    { titre: 'Diagnostic pannes machines', diff: 'experimente', pts: 50, prio: 'important' },
  ], missions: [
    { titre: 'Vérifier le bon fonctionnement des pistes', cat: 'OUVERTURE', prio: 'vitale' },
    { titre: 'Contrôler les quilles et les boules', cat: 'OUVERTURE', prio: 'important' },
    { titre: 'Nettoyer les pistes et ranger les boules', cat: 'FERMETURE', prio: 'important' },
  ]},
]

const DIFF_STYLES: Record<string, string> = {
  simple:      'bg-[rgba(34,197,94,0.1)] text-green',
  avancee:     'bg-[rgba(249,115,22,0.1)] text-accent',
  experimente: 'bg-[rgba(168,85,247,0.1)] text-purple',
}
const CAT_LABELS: Record<string, string> = {
  OUVERTURE: '🌅', PENDANT: '⚡', MENAGE: '🧹', FERMETURE: '🌙',
}

export default function PostesPage() {
  return (
    <div className="mx-auto px-5 py-6 lg:max-w-2xl">
      <div className="mb-5">
        <h1 className="font-syne font-extrabold text-[20px] text-text">Postes</h1>
        <p className="text-[12px] text-muted mt-0.5">Fiches de poste par zone</p>
      </div>

      <div className="flex flex-col gap-4">
        {zones.map((z) => (
          <div key={z.nom} className="bg-surface border border-border rounded-[18px] overflow-hidden">
            {/* Zone header */}
            <div className="px-4 py-3 flex items-center gap-2.5"
                 style={{ background: `${z.color}14`, borderBottom: `1px solid ${z.color}22` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: z.color }} />
              <span className="font-syne font-extrabold text-[15px]" style={{ color: z.color }}>
                {z.nom}
              </span>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {/* Compétences */}
              <div>
                <div className="text-[10px] font-syne font-bold uppercase tracking-widest text-muted mb-2">
                  Compétences
                </div>
                <div className="flex flex-col gap-2">
                  {z.competences.map((c) => (
                    <div key={c.titre} className="flex items-center gap-2.5 p-2.5 bg-surface2 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] text-text font-medium">{c.titre}</div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-[5px] mt-1 inline-block ${DIFF_STYLES[c.diff]}`}>
                          {c.diff}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-syne font-extrabold text-[15px] text-accent">{c.pts}</div>
                        <div className="text-[9px] text-muted">pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missions */}
              <div>
                <div className="text-[10px] font-syne font-bold uppercase tracking-widest text-muted mb-2">
                  Missions
                </div>
                <div className="flex flex-col gap-1.5">
                  {z.missions.map((m) => (
                    <div key={m.titre} className="flex items-center gap-2 py-1.5">
                      <span className="text-sm">{CAT_LABELS[m.cat]}</span>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        m.prio === 'vitale' ? 'bg-red' : m.prio === 'important' ? 'bg-yellow' : 'bg-muted'
                      }`} />
                      <span className="text-[12px] text-text">{m.titre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
