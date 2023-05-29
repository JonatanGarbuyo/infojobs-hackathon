'use client'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter
} from '@dnd-kit/core'

import ModalUserInfo from '@/components/modal/ModalUserInfo'
import KanbanLane from '@/components/kanban/KanbanLane'

import useKanban from '@/hooks/useKanban'
import useModal from '@/hooks/useModal'

import styles from './KanbanBoard.module.css'

export default function KanbanBoard({ offerId }) {
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const { kanbanState, updateKanban } = useKanban({ offerId })
  const { open, userInfo, onClose, showUserInfo } = useModal()

  function handleOnDragEnd(e) {
    const destinationId = e.over?.id
    const candidateId = e.active.id
    const candidate = e.active.data.current
    if (!destinationId || destinationId === candidate.parentId) {
      return
    }
    updateKanban({ destinationId, candidateId, candidate })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleOnDragEnd}
    >
      <div className={styles.board}>
        <div className={styles.lanes__container}>
          {kanbanState.map(({ applicants, id, title }) => (
            <KanbanLane
              showUserInfo={showUserInfo}
              laneTitle={title}
              items={applicants}
              key={id}
              laneId={id}
            />
          ))}
        </div>
      </div>
      <ModalUserInfo open={open} userInfo={userInfo} onClose={onClose} />
    </DndContext>
  )
}
