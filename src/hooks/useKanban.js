import { useEffect, useState } from 'react'

import { replacer, reviver } from '@/utils/storage'
import useJobOffers from '@/hooks/useJobOffers'
import useApplicants from '@/hooks/useApplicants'

export default function useKanban({ offerId }) {
  const initialState = [
    { title: 'candidatos', id: 'candidatos', applicants: new Map() },
    { title: 'adecuado', id: 'adecuado', applicants: new Map() },
    { title: 'contacto telefonico', id: 'contacto', applicants: new Map() },
    { title: 'entrevista', id: 'entrevista', applicants: new Map() },
    { title: 'propuesta', id: 'propuesta', applicants: new Map() },
    { title: 'inadecuado', id: 'inadecuado', applicants: new Map() }
  ]
  const [kanbanState, setKanbanState] = useState(initialState)

  const { getJobOfferById } = useJobOffers()
  const { getCandidatesById } = useApplicants()
  const offer = getJobOfferById(offerId)

  useEffect(() => {
    if (offer) {
      let initialKanbanState = JSON.parse(
        localStorage.getItem(`${offerId}`),
        reviver
      )
      if (!initialKanbanState) {
        initialKanbanState = initialState
        offer.applicants?.forEach((applicant) => {
          const candidate = getCandidatesById(applicant.id)
          initialKanbanState[applicant.stage]?.applicants.set(
            applicant.id,
            candidate
          )
        })
      }
      setKanbanState(initialKanbanState)
    }
  }, [offer])

  function updateKanban({ destinationId, candidateId, candidate }) {
    const { parentId } = candidate

    setKanbanState((prev) => {
      const newState = [...prev]
      const originIndex = newState.findIndex((lane) => lane.id === parentId)
      const destinationIndex = newState.findIndex(
        (lane) => lane.id === destinationId
      )
      newState[originIndex].applicants.delete(candidateId)
      newState[destinationIndex].applicants.set(candidateId, candidate)
      localStorage.setItem(`${offerId}`, JSON.stringify(newState, replacer))
      return newState
    })
  }

  return { kanbanState, updateKanban }
}
