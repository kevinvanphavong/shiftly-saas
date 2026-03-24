'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem('token')
    document.cookie = 'token=; path=/; max-age=0'
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-3 flex items-center justify-between"
    >
      <div>
        <div className="text-[13px] text-red font-medium">Se déconnecter</div>
        <div className="text-[11px] text-muted">Fermer la session en cours</div>
      </div>
      <span className="text-muted">→</span>
    </button>
  )
}
