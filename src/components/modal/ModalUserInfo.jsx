import { Button, Modal } from '@mui/material'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

import { dateFormater } from '@/utils/datetime'

import styles from './ModalUserInfo.module.css'

export default function ModalUserInfo({ open, userInfo, onClose }) {
  return (
    <>
      {userInfo && (
        <Modal open={open} onClose={onClose}>
          <div className={styles.modal}>
            <div className={styles.left}>
              <img
                className={styles.modal_image}
                src={userInfo.photo}
                alt='user photo'
              />
              <Button
                type='button'
                variant='contained'
                className={styles.modal_button}
              >
                Connect to Linkedin
              </Button>
            </div>
            <div className={styles.right}>
              <h2 className={styles.modal_title}>{userInfo.fullName}</h2>
              <ul className={styles.modal_info}>
                <li>
                  <EmailOutlinedIcon fontSize='small' />
                  <span>{userInfo.email}</span>
                </li>
                <li>
                  <PhoneIphoneOutlinedIcon fontSize='small' />
                  <span>{userInfo.phone}</span>
                </li>
                <li>
                  <LocationOnOutlinedIcon fontSize='small' />
                  <span>{userInfo.city}</span>
                </li>
              </ul>
              <p>
                Joined:{' '}
                {userInfo.accountCreation &&
                  dateFormater(userInfo.accountCreation)}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
