import React from 'react'

import { Box } from '@mui/material'

import { MainInfoTask, AssetsTask } from '../../components'

export const TaskDetailTab = ({ task }) => {
  return (
    <Box className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
      {/* LEFT */}
      <MainInfoTask task={task} />
      {/* RIGHT */}
      <AssetsTask task={task} />
    </Box>
  )
}