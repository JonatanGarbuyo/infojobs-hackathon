import { CSS } from '@dnd-kit/utilities'
import { useDraggable } from '@dnd-kit/core'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'

import styles from './KanbanCard.module.css'

export default function KanbanCard({ parentId, item, showUserInfo }) {
  const { attributes, listeners, transform, setNodeRef, isDragging } =
    useDraggable({
      id: item.id,
      data: {
        ...item,
        parentId
      }
    })

  function handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    showUserInfo(item)
  }

  function handleTouch(e) {
    e.stopPropagation()
  }

  return (
    <div
      style={{
        transform: CSS.Translate.toString(transform),
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      className={`${styles.card} ` + `${isDragging && styles.dragging}`}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <h3
        onMouseDown={handleClick}
        onTouchStart={handleTouch}
        className={styles.card_title}
      >
        {item.fullName}
      </h3>
      <p className={styles.card_email}>{item.email}</p>
      <div className={styles.card_phone}>
        <PhoneIphoneOutlinedIcon fontSize='small' />
        <span>{item.phone}</span>
      </div>
    </div>
  )
}
