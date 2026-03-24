'use client'

import { useRef, useState } from 'react'
import type { EditorZone, EditorMission, EditorCompetence } from '@/types/editeur'
import ZoneRow from './ZoneRow'

interface Props {
  zones:        EditorZone[]
  missions:     EditorMission[]
  competences:  EditorCompetence[]
  selectedId:   number | null
  onSelect:     (id: number) => void
  onEdit:       (zone: EditorZone) => void
  onDelete:     (zone: EditorZone) => void
  onReorder:    (zones: EditorZone[]) => void
  onAdd:        () => void
}

export default function ZoneList({
  zones,
  missions,
  competences,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onReorder,
  onAdd,
}: Props) {
  const dragIndex = useRef<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  function handleDragStart(i: number) {
    dragIndex.current = i
  }
  function handleDragEnter(i: number) {
    setDragOverIndex(i)
  }
  function handleDrop(targetIndex: number) {
    if (dragIndex.current === null || dragIndex.current === targetIndex) return
    const next = [...zones]
    const [moved] = next.splice(dragIndex.current, 1)
    next.splice(targetIndex, 0, moved)
    onReorder(next.map((z, idx) => ({ ...z, ordre: idx + 1 })))
    dragIndex.current = null
    setDragOverIndex(null)
  }
  function handleDragEnd() {
    dragIndex.current = null
    setDragOverIndex(null)
  }

  return (
    <div className="flex flex-col gap-2">
      {zones.map((zone, i) => (
        <ZoneRow
          key={zone.id}
          zone={zone}
          isActive={zone.id === selectedId}
          isDragOver={dragOverIndex === i}
          missionCount={missions.filter((m) => m.zoneId === zone.id).length}
          competenceCount={competences.filter((c) => c.zoneId === zone.id).length}
          onSelect={() => onSelect(zone.id)}
          onEdit={() => onEdit(zone)}
          onDelete={() => onDelete(zone)}
          onDragStart={() => handleDragStart(i)}
          onDragEnter={() => handleDragEnter(i)}
          onDrop={() => handleDrop(i)}
          onDragEnd={handleDragEnd}
        />
      ))}

      <button
        onClick={onAdd}
        className="w-full py-[11px] rounded-[12px] border border-dashed border-border bg-transparent text-muted text-[13px] font-semibold flex items-center justify-center gap-1.5 hover:border-accent hover:text-accent transition-all mt-1"
      >
        + Nouvelle zone
      </button>
    </div>
  )
}
