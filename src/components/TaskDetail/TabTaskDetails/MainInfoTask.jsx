import React from 'react'

import { Box, Divider, Typography } from '@mui/material'
import { Bolt, Speed, SlowMotionVideo, Balance, TaskAlt } from '@mui/icons-material';
import clsx from 'clsx';

import { bgColor, getInitials, PRIORITY_STYLES, TASK_TYPE } from '../../../utils'

const ICONS = {
  high: <Bolt />,
  medium: <Speed />,
  low: <SlowMotionVideo />,
  normal: <Balance />,
};

export const MainInfoTask = ({ task }) => {
  return (
    <Box className="w-full md:w-1/2 space-y-8">
      <Box className="flex items-center gap-5">
        <Box
          className={clsx("flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
            PRIORITY_STYLES[task?.priority],
            bgColor[task?.priority]
          )}
        >
          <Typography className='text-lg'>{ICONS[task?.priority]}</Typography>
          <Typography className='uppercase'>{task?.priority} priority level</Typography>
        </Box>
        <Box className={clsx("flex items-center gap-2")}>
          <Box className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task?.stage])} />
          <Typography className='uppercase'>{task?.stage}</Typography>
        </Box>
      </Box>
      <Typography className='text-gray-600'>
        Created At: {new Date(task?.date).toDateString()}
      </Typography>
      <Box className="flex items-center gap-8 p-4 border-y border-gray-200">
        <Box className="space-x-2">
          <Typography className='font-semibold'>Assets: </Typography>
          <Typography>{task?.assets?.length} asset(s)</Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box className="space-x-2">
          <Typography className='font-semibold'>Sub-Task: </Typography>
          <Typography>{task?.subTasks?.length} sub-task(s)</Typography>
        </Box>
      </Box>
      <Box className="space-y-4 py-6">
        <Typography variant='h6'>TASK TEAM MEMBER</Typography>
        <Box className="space-y-3">
          {task?.team?.map((m, index) => (
            <Box key={index} className="flex gap-4 py-2 items-center border-t border-gray-200">
              <Box className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600">
                <Typography className='text-center'>
                  {getInitials(m?.name)}
                </Typography>
              </Box>
              <Box>
                <Typography className='font-semibold text-lg'>{m?.name}</Typography>
                <Typography className='text-gray-600'>{m?.title}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="space-y-4 py-6">
        <Typography variant='h6'>SUB-TASKS</Typography>
        <Box className="space-y-8">
          {task?.subTasks?.map((st, index) => (
            <Box key={index} className="flex gap-3">
              <Box className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200">
                <TaskAlt className='text-violet-600' sx={{ fontSize: "2rem" }} />
              </Box>
              <Box className="space-y-1">
                <Box className="flex gap-2 items-center">
                  <Typography>{new Date(st?.date).toDateString()}</Typography>
                  <Typography className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-fuchsia-600 font-semibold'>{st?.tag}</Typography>
                </Box>
                <Typography className='text-gray-700'>{st?.title}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}