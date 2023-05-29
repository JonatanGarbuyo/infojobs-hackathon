'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import useJobOffers from '@/hooks/useJobOffers'

import styles from '@/components/OffersGrid.module.css'

const columns = [
  { field: 'order', headerName: 'N°', flex: 0.1 },
  {
    field: 'image',
    headerName: '',
    flex: 0.1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => (
      <Image
        src={params.value}
        height={48}
        width={48}
        alt='Logo'
        className={styles.companylogo}
      />
    )
  },
  {
    field: 'title',
    headerName: 'Oferta',
    flex: 0.1,
    flex: 1
  },
  {
    field: 'location',
    headerName: 'Ciudad',
    flex: 0.2
  },
  {
    field: 'applications',
    headerName: 'Postulados',
    flex: 0.1,
    type: 'number'
  },
  {
    field: 'published',
    headerName: 'Publicado',
    flex: 0.15,
    type: 'dateTime',
    valueGetter: ({ value }) => value && new Date(value),
    valueFormatter: ({ value }) =>
      value == null ? '' : new Intl.DateTimeFormat('es-ES').format(value)
  },
  {
    field: 'manage',
    headerName: 'Seleccion',
    flex: 0.2,
    renderCell: (params) => (
      <Link href={`/job-offer/${params.value}`}>
        <Button
          variant='outlined'
          sx={{
            ':hover': {
              borderColor: 'var(--color-secondary)',
              color: 'var(--color-secondary)'
            }
          }}
        >
          Seleccion
        </Button>
      </Link>
    )
  }
]

export default function OffersGrid() {
  const { getJobOfferList } = useJobOffers()

  const rows = getJobOfferList().map((offer, i) => ({
    id: offer.id,
    order: ++i,
    image: offer.author.logoUrl,
    title: offer.title,
    location: offer.city,
    applications: offer.applications,
    published: offer.published,
    manage: offer.id
  }))

  return <DataGrid rows={rows} columns={columns} autoPageSize={true} />
}
