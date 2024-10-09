import { Box, Typography } from '@mui/material'
import React from 'react'

export const AssetsTask = ({ task }) => {
  return (
    <Box className="w-full md:w-1/2 space-y-8">
      <Typography className='text-lg font-semibold'>ASSETS</Typography>
      <Box className="w-full grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
        {task?.assets?.map((as, index) => (
          <img
            key={index}
            src={as}
            alt={task?.title}
            className='w-28 md:w-36 2xl:w-52 rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50'
          />
        ))}
      </Box>
    </Box>
  )
}