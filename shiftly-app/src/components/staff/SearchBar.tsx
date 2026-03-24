'use client'

interface SearchBarProps {
  value:    string
  onChange: (v: string) => void
  placeholder?: string
}

/** Barre de recherche — filtre par nom en temps réel */
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Rechercher un membre…',
}: SearchBarProps) {
  return (
    <div className="relative">
      {/* Search icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        width="15" height="15" viewBox="0 0 15 15" fill="none"
      >
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" />
      </svg>

      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-border rounded-[12px] pl-9 pr-4 py-2.5
                   text-[13px] text-text placeholder:text-muted
                   outline-none focus:border-accent/50 transition-colors"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
          aria-label="Effacer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
