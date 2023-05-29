import { useEffect, useState } from 'react'

import { getCandidates } from '@/service/candidates'

export default function useApplicants() {
  const [candidatesList, setCandidatesList] = useState([])

  useEffect(() => {
    const candidates = getCandidates()
    setCandidatesList(candidates)
  }, [])

  function getCandidatesById(id) {
    return candidatesList.find((candidate) => candidate.id === id)
  }

  return {
    getCandidatesById
  }
}
