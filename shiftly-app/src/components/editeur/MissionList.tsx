'use client'

import { useRef, useState } from 'react'
import type { EditorMission } from '@/types/editeur'
import MissionItem from './MissionItem'
import { CATEGORIES } from '@/lib/mock/editeur'

interface Props {
  missions:   EditorMission[]
  zoneName:   string
  zoneColor:  string
  onEdit:     (m: EditorMission) => void
  onMove:     (m: EditorMission) => void
  onReorder:  (missions: EditorMission[]) => void
  onAdd:      () => void
  onBack:     () => void
}

export default function MissionList({
  missions,
  zoneName,
  zoneColor,
  onEdit,
  onMove,
  onReorder,
  onAdd,
  onBack,
}: Props) {
  const [activeCat, setActiveCat] = useState('Ouverture')
  const dragIndex = useRef<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  // Unique categories present in this zone
  const cats = ['Toutes', ...CATEGORIES.filter((c) =>
    missions.some((m) => m.categorie === c)
  )]

  const filtered = activeCat === 'Toutes'
    ? missions
    : missions.filter((m) => m.categorie === activeCat)

  function handleDragStart(i: number) { dragIndex.current = i }
  function handleDragEnter(i: number) { setDragOverIndex(i) }
  function handleDrop(e: React.DragEvent, targetIndex: number) {
    e.preventDefault()
    if (dragIndex.current === null || dragIndex.current === targetIndex) return
    const next = [...filtered]
    const [moved] = next.splice(dragIndex.current, 1)
    next.splice(targetIndex, 0, moved)
    // Merge back into full list keeping other categories intact
    const others = missions.filter((m) =>
      activeCat === 'Toutes' ? false : m.categorie !== activeCat
    )
    onReorder([...others, ...next].map((m, idx) => ({ ...m, ordre: idx + 1 })))
    dragIndex.current = null
    setDragOverIndex(null)
  }
  function handleDragEnd() {
    dragIndex.current = null
    setDragOverIndex(null)
  }

  return (
    <div>
      {/* Back link + header */}
      <div className="py-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-accent text-[13px] font-semibold"
        >
          ← Zones
        </button>
        <button
          onClick={onAdd}
          className="w-7 h-7 rounded-[8px] border border-border bg-transparent flex items-center justify-center text-[13px] text-muted hover:border-accent hover:text-accent transition-all"
        >
          ＋
        </button>
      </div>

      <div className="flex items-center gap-2 mb-0.5">
        <span
          className="w-[14px] h-[14px] rounded-[5px] flex-shrink-0"
          style={{ background: zoneColor }}
        />
        <h2 className="font-syne font-extrabold text-[18px]">{zoneName} — Missions</h2>
      </div>
      <p className="text-[12px] text-muted mb-4">
        {missions.length} mission{missions.length > 1 ? 's' : ''} · glisser pour réordonner
      </p>

      {/* Category tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-2.5 scrollbar-none">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={`px-[10px] py-[5px] rounded-[8px] border text-[10px] font-bold uppercase tracking-[0.5px] whitespace-nowrap transition-all flex-shrink-0 ${
              activeCat === c
                ? 'bg-accent border-accent text-white'
                : 'bg-transparent border-border text-muted'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Mission items */}
      {filtered.length === 0 ? (
        <div className="text-center py-8 text-muted text-[13px]">Aucune mission dans cette catégorie</div>
      ) : (
        filtered.map((m, i) => (
          <MissionItem
            key={m.id}
            mission={m}
            isDragOver={dragOverIndex === i}
            onEdit={() => onEdit(m)}
            onMove={() => onMove(m)}
            onDragStart={() => handleDragStart(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
            onDragEnd={handleDragEnd}
          />
        ))
      )}

      <button
        onClick={onAdd}
        className="w-full py-[11px] rounded-[12px] border border-dashed border-border bg-transparent text-muted text-[13px] font-semibold flex items-center justify-center gap-1.5 hover:border-accent hover:text-accent transition-all mt-1"
      >
        + Ajouter une mission
      </button>
    </div>
  )
}
