'use client'
import { useRouter } from 'next/navigation'

import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'

import useJobOffers from '@/hooks/useJobOffers'
import KanbanBoard from '@/components/kanban/KanbanBoard'
import { dateFormater } from '@/utils/datetime'

import commonStyles from '@/styles/common.module.css'
import styles from './page.module.css'

export default function JobOffer({ params: { id } }) {
  const router = useRouter()
  const { getJobOfferById } = useJobOffers()
  const jobOffer = getJobOfferById(id)

  return (
    <div className={commonStyles.container}>
      <div>
        <button className={styles.back} onClick={() => router.back()}>
          <KeyboardBackspaceOutlinedIcon />
          <span>Back to jobs</span>
        </button>
      </div>
      {jobOffer && (
        <>
          <h1 className={styles.title}>{jobOffer.title}</h1>
          <div>
            <ul className={styles.description}>
              <li>
                <BusinessCenterOutlinedIcon fontSize='small' />
                <span>{jobOffer.contractType.value}</span>
              </li>
              <li>
                <LocationOnOutlinedIcon fontSize='small' />
                <span>{jobOffer.city}</span>
              </li>
              <li>{jobOffer.teleworking.value}</li>
              <li>{jobOffer.workDay.value}</li>
              <li>
                <ScheduleOutlinedIcon fontSize='small' />
                <span>{jobOffer && dateFormater(jobOffer.published)}</span>
              </li>
            </ul>
          </div>
          <KanbanBoard offerId={id} />
        </>
      )}
    </div>
  )
}
