import React from 'react'

import { Typography } from '@mui/material'
import clsx from 'clsx'

export const Title = ({title, className}) => {
  return (
    <Typography variant='h3' className={clsx("text-2xl font-semibold capitalize", className)}>
      {title}
    </Typography>
  )
}
