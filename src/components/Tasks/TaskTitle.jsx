import React from 'react'

import { Box, Button, Typography } from '@mui/material'
import { Add } from '@mui/icons-material';
import clsx from 'clsx'

export const TaskTitle = ({ label, className }) => {
  return (
    <Box className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white dark:bg-slate-700 flex items-center justify-between'>
      <Box className="flex gap-2 items-center">
        <Box className={clsx("w-4 h-4 rounded-full", className)} />
        <Typography className='text-sm md:text-base text-gray-600 dark:text-white'>{label}</Typography>
      </Box>

      <Button className='hidden md:block'>
        <Add className='text-lg' />
      </Button>
    </Box>
  )
}
