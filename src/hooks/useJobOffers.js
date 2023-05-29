import { useEffect, useState } from 'react'

import { getJobOffers } from '@/service/jobOffers'

export default function useJobOffers() {
  const [jobOfferList, setJobOfferList] = useState([])

  useEffect(() => {
    if (!jobOfferList.length > 0) {
      const { offers } = getJobOffers()
      setJobOfferList(offers)
    }
  }, [])

  function getJobOfferList() {
    return jobOfferList
  }

  function getJobOfferById(id) {
    return jobOfferList.find((offer) => offer.id === id)
  }

  return { getJobOfferList, getJobOfferById }
}
