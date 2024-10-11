import React from 'react'

import { LinearProgress, Stack } from '@mui/material'

export const Loading = () => {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Stack>
  )
}