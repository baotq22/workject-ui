import React from 'react'

import { Box, TableCell, TableRow, Typography } from '@mui/material'
import clsx from 'clsx'
import moment from 'moment'

import { BGS, PRIORITY_STYLES, TASK_TYPE } from '../../../utils'
import { ICONS, UserInfo } from '../..'

export const TaskTableRowData = ({ task }) => {
  return (
    <TableRow className='border-b border-gray-300 text-gray-500 hover:bg-gray-300/10'>
      <TableCell className="py-2">
        <Box className="flex items-center gap-2">
          <Typography
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <Typography
          >{task.title}
          </Typography>
        </Box>
      </TableCell>
      <TableCell className='py-2'>
        <Box className="flex gap-1 items-center">
          <Typography
            className={clsx("text-lg", PRIORITY_STYLES[task.priority])}
          >
            {ICONS[task.priority]}
          </Typography>
          <Typography>
            {task.priority}
          </Typography>
        </Box>
      </TableCell>
      <TableCell className='py-2'>
        <Box className="flex">
          {task.team.map((u, index) => (
            <Box key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
              <UserInfo user={u} />
            </Box>
          ))}
        </Box>
      </TableCell>
      <TableCell className='py-2 hidden md:block'>
        <Typography
          className='text-base text-gray-600'
        >
          {moment(task?.date).fromNow()}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
