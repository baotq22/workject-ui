import React, { useState } from 'react'

import { FolderOpen, Message, InsertDriveFile, FormatListBulleted, Add } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { BGS, formatDate, PRIORITY_STYLES, TASK_TYPE } from '../../utils';
import { TaskDialog, UserInfo, AddSubTaskModal, ICONS } from '../../components';

export const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Box className="w-full h-fit bg-white shadow-md p-4 rounded" sx={{ minHeight: "28rem" }}>
        <Box className="w-full flex justify-between">
          <Box className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIORITY_STYLES[task?.priority])}>
            <Typography className='text-lg'>{ICONS[task?.priority]}</Typography>
            <Typography className='uppercase'>Priority level: {task?.priority}</Typography>
          </Box>
          <Box className={clsx("w-28 h-8 text-white flex items-center text-center justify-center rounded-full mt-1", TASK_TYPE[task.stage])}>
            {task?.stage}
          </Box>
          <TaskDialog task={task} />
        </Box>
        <Box className="flex items-center gap-2">
          <Box className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}>
          </Box>
          <Typography variant='h6' className='line-clamp-1'>{task?.title}</Typography>
        </Box>
        <Typography className='text-sm text-gray-600'>{formatDate(new Date(task?.date))}</Typography>
        <Divider sx={{ margin: "1rem 0" }} />
        <Box className="flex items-center justify-between mb-2">
          <Box className="flex items-center gap-3">
            <Box className="flex gap-1 items-center text-sm text-gray-600">
              <Message />
              <Typography>{task?.activities?.length}</Typography>
            </Box>
            <Box className="flex gap-1 items-center text-sm text-gray-600">
              <InsertDriveFile />
              <Typography>{task?.assets?.length}</Typography>
            </Box>
            <Box className="flex gap-1 items-center text-sm text-gray-600">
              <FormatListBulleted />
              <Typography>{task?.subTasks?.length}</Typography>
            </Box>
          </Box>
          <Box className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <Box key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS?.length])}>
                <UserInfo user={m} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* subtasks */}
        {task?.subTasks.length > 0 ?
          <Box className="py-4 border-t border-gray-200" sx={{ minHeight: "11.25rem" }}>
            <Typography variant='h6' className='text-base line-clamp-1'>
              {task?.subTasks[0].title}
            </Typography>
            <Box className="py-4 space-x-8">
              <span className='text-sm text-gray-600'>Date: {formatDate(new Date(task?.subTasks[0]?.date))}</span>
            </Box>
            <Box className="py-4 space-x-8">
              <span className='bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium'>
                {task?.subTasks[0].tag}
              </span>
            </Box>
          </Box> : <Box className='py-4 border-t border-gray-200' sx={{ minHeight: "11.25rem" }}>
            <Typography variant='h6' className='text-red-500'>No Sub-Task Available</Typography>
          </Box>}

        <Box className="w-full pb-2">
          {user?.isAdmin ?
            <Button variant='contained' onClick={() => setOpen(true)} sx={{margin: "0.5rem"}}>
              <Add className='text-lg' />
              <Typography>Add New Sub-Task</Typography>
            </Button> : <></>
          }
          <Button variant='contained' color="secondary" onClick={() => navigate(`/task/${task._id}`)} sx={{margin: "0.5rem"}}>
            <FolderOpen className='text-lg' />
            <Typography>View Details</Typography>
          </Button>
        </Box>
      </Box>
      <AddSubTaskModal open={open} setOpen={setOpen} id={task._id} />
    </>
  )
}
