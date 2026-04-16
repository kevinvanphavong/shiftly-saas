'use client'

/** Vue employé du planning — 3 semaines glissantes (Phase B) */
export default function PlanningEmployeeView() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-3xl">📅</p>
      <p className="text-base font-semibold text-[var(--text)]">Planning</p>
      <p className="text-sm text-[var(--muted)]">
        La vue employé sera disponible en Phase B.
      </p>
    </div>
  )
}
