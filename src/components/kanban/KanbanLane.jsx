import { useDroppable } from '@dnd-kit/core'

import KanbanCard from './KanbanCard'

import styles from './KanbanLane.module.css'

export default function KanbanLane({ laneTitle, items, laneId, showUserInfo }) {
  const { setNodeRef } = useDroppable({
    id: laneId
  })

  return (
    <div className={styles.lane} ref={setNodeRef}>
      <h2 className={styles.lane_title}>{laneTitle}</h2>
      <div>
        {items.size > 0 &&
          [...items.values()].map((item) => {
            const { key } = item
            return (
              <KanbanCard
                key={key}
                parentId={laneId}
                item={item}
                showUserInfo={showUserInfo}
              />
            )
          })}
      </div>
    </div>
  )
}
