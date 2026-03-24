import type { Metadata } from 'next'
import Link from 'next/link'
import LogoutButton from '@/components/auth/LogoutButton'
import ProfileCard from '@/components/settings/ProfileCard'

export const metadata: Metadata = { title: 'Réglages — Shiftly' }

export default function ReglagesPage() {
  return (
    <div className="max-w-[390px] mx-auto px-5 py-6 lg:max-w-2xl">
      <div className="mb-5">
        <h1 className="font-syne font-extrabold text-[20px] text-text">Réglages</h1>
      </div>

      {/* Profile card */}
      <ProfileCard />

      {/* Settings groups */}
      {[
        {
          title: 'Notifications',
          items: [
            { label: 'Incidents critiques', sub: 'Alertes push immédiates', toggle: true },
            { label: 'Rappels ouverture', sub: '30 min avant le service', toggle: true },
            { label: 'Résumé quotidien', sub: 'Email chaque soir', toggle: false },
          ],
        },
        {
          title: 'Centre',
          items: [
            { label: "Horaires d'ouverture", sub: '10h00 — 02h00', action: 'Modifier' },
            { label: 'Zones actives', sub: '3 zones configurées', action: 'Gérer' },
            { label: 'Éditeur de contenu', sub: 'Missions et compétences', action: 'Ouvrir' },
          ],
        },
      ].map((group) => (
        <div key={group.title} className="mb-4">
          <div className="text-[9px] font-syne font-bold uppercase tracking-widest text-muted px-1 mb-2">
            {group.title}
          </div>
          <div className="bg-surface border border-border rounded-[18px] overflow-hidden divide-y divide-border">
            {group.items.map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-text font-medium">{item.label}</div>
                  <div className="text-[11px] text-muted">{item.sub}</div>
                </div>
                {item.toggle !== undefined ? (
                  <div className={`w-[44px] h-[24px] rounded-full relative flex-shrink-0 ${
                    item.toggle ? 'bg-green' : 'bg-surface2 border border-border'
                  }`}>
                    <div className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-all ${
                      item.toggle ? 'left-[23px]' : 'left-[3px]'
                    }`} />
                  </div>
                ) : item.action ? (
                  item.label === 'Éditeur de contenu' ? (
                    <Link href="/reglages/editeur" className="text-[11px] text-accent font-semibold">
                      {item.action} →
                    </Link>
                  ) : (
                    <span className="text-[11px] text-accent font-semibold">{item.action} →</span>
                  )
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Danger zone */}
      <div>
        <div className="text-[9px] font-syne font-bold uppercase tracking-widest text-muted px-1 mb-2">
          Danger
        </div>
        <div className="bg-surface border border-red/20 rounded-[18px] overflow-hidden">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
