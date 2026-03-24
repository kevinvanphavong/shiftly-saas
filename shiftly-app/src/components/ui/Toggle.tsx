'use client'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}

export default function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="relative w-[44px] h-[24px] rounded-full transition-colors focus:outline-none"
      style={{ background: checked ? 'var(--green)' : 'var(--surface2)', border: '1px solid var(--border)' }}
    >
      <span
        className="absolute top-[3px] w-[16px] h-[16px] bg-white rounded-full shadow transition-all duration-[0.25s]"
        style={{ left: checked ? '23px' : '3px' }}
      />
    </button>
  )
}
