import { useState } from 'react'

export default function useModal() {
  const [userInfo, setUserInfo] = useState({})
  const [open, setOpen] = useState(false)

  function showUserInfo(userInfo) {
    setUserInfo(userInfo)
    setOpen(true)
  }

  function onClose() {
    setOpen(false)
  }

  return { userInfo, open, onClose, showUserInfo }
}
