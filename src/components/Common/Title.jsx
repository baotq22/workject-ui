import { Typography } from '@mui/material'
import clsx from 'clsx'
import React from 'react'

export const Title = ({title, className}) => {
  return (
    <Typography variant='h3' className={clsx("text-2xl font-semibold capitalize dark:text-white", className)}>
      {title}
    </Typography>
  )
}
