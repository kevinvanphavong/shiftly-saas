import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Planning — Shiftly' }

const services = [
  { date: 'Lun 16 mars', statut: 'TERMINE',  taux: 100, staff: ['LD', 'TG'] },
  { date: 'Mar 17 mars', statut: 'TERMINE',  taux: 100, staff: ['MB', 'TG', 'LD'] },
  { date: 'Mer 18 mars', statut: 'EN_COURS', taux: 62,  staff: ['LD', 'TG', 'MB'] },
  { date: 'Jeu 19 mars', statut: 'PLANIFIE', taux: 0,   staff: [] },
  { date: 'Ven 20 mars', statut: 'PLANIFIE', taux: 0,   staff: [] },
  { date: 'Sam 21 mars', statut: 'PLANIFIE', taux: 0,   staff: [] },
]

const STATUT_STYLES: Record<string, string> = {
  TERMINE:  'bg-[rgba(34,197,94,0.12)] text-green border border-[rgba(34,197,94,0.2)]',
  EN_COURS: 'bg-[rgba(249,115,22,0.12)] text-accent border border-[rgba(249,115,22,0.2)]',
  PLANIFIE: 'bg-surface2 text-muted border border-border',
}

export default function ServicesPage() {
  return (
    <div className="max-w-[390px] mx-auto px-5 py-6 lg:max-w-2xl">
      <div className="mb-5">
        <h1 className="font-syne font-extrabold text-[20px] text-text">Planning</h1>
        <p className="text-[12px] text-muted mt-0.5">Services journaliers · Semaine du 16 mars</p>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((s) => (
          <div key={s.date} className={`bg-surface border rounded-[18px] p-4 transition-colors ${
            s.statut === 'EN_COURS' ? 'border-accent/30' : 'border-border'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="font-syne font-bold text-[14px] text-text">{s.date}</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[6px] ${STATUT_STYLES[s.statut]}`}>
                {s.statut === 'EN_COURS' ? '● EN COURS' : s.statut}
              </span>
            </div>

            {s.taux > 0 && (
              <div className="mb-2">
                <div className="h-[5px] bg-surface2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                       style={{ width: `${s.taux}%` }} />
                </div>
                <div className="text-[10px] text-muted mt-1">{s.taux}% complété</div>
              </div>
            )}

            {s.staff.length > 0 && (
              <div className="flex items-center gap-1">
                {s.staff.map((init, i) => (
                  <div key={i}
                       className="w-6 h-6 rounded-full bg-surface2 border-2 border-surface flex items-center justify-center text-[9px] font-extrabold text-muted"
                       style={{ marginLeft: i > 0 ? '-4px' : 0 }}>
                    {init}
                  </div>
                ))}
                <span className="text-[11px] text-muted ml-2">{s.staff.length} membres</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
