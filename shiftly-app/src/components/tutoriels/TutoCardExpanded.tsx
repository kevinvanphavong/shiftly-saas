import StepItem from './StepItem'
import TipBox   from './TipBox'
import type { TutoBlock } from '@/types/tutoriel'

interface TutoCardExpandedProps {
  contenu: TutoBlock[]
}

/** Contenu déroulé — intro · steps numérotés · tip box */
export default function TutoCardExpanded({ contenu }: TutoCardExpandedProps) {
  return (
    <div className="mt-3 pt-3 border-t border-border">
      {contenu.map((block, i) => {
        if (block.type === 'intro') {
          return (
            <p key={i} className="text-[12px] text-muted leading-relaxed mb-4">
              {block.text}
            </p>
          )
        }
        if (block.type === 'step') {
          return (
            <StepItem
              key={i}
              number={block.number}
              title={block.title}
              text={block.text}
            />
          )
        }
        if (block.type === 'tip') {
          return <TipBox key={i} text={block.text} />
        }
        return null
      })}
    </div>
  )
}
