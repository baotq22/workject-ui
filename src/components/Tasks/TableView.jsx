import React, { useState } from 'react'

import { Bolt, Speed, SlowMotionVideo, Balance, Message, InsertDriveFile, FormatListBulleted } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { BGS, formatDate, PRIORITY_STYLES, TASK_TYPE } from '../../utils';
import { UserInfo, ConfirmationDialog, AddTaskModal, ICONS } from '../../components';
import { useTrashTaskMutation } from '../../redux/slices/api/taskApiSlice';

import 'react-toastify/dist/ReactToastify.css';

export const TableView = ({ tasks }) => {
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteTask] = useTrashTaskMutation();
  const navigate = useNavigate();

  const DeleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editTaskHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  }

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: selected,
        isTrashed: "trash",
      }).unwrap();

      toast.success(res?.message);

      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (error) {
      toast.error(error);
    }
  };

  const TableHeader = () => {
    return (
      <TableHead className='w-full border-b border-gray-300'>
        <TableRow className='w-full text-left'>
          <TableCell className='py-2'>Task Title</TableCell>
          <TableCell className='py-2'>Priority</TableCell>
          <TableCell className='py-2'>Status</TableCell>
          <TableCell className='py-2 line-clamp-1'>Created At</TableCell>
          <TableCell className='py-2'>Assets</TableCell>
          <TableCell className='py-2'>Team</TableCell>
          <TableCell className='py-2'>Action</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  const TableRowData = ({ task }) => {
    return (
      <TableRow className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
        <TableCell className='py-2'>
          <Box className="flex items-center gap-2">
            <Typography className='w-full line-champ-2 text-base'>
              {task?.title}
            </Typography>
          </Box>
        </TableCell>
        <TableCell className='py-2'>
          <Box className="flex items-center gap-1">
            <Typography className={clsx("text-lg", PRIORITY_STYLES[task?.priority])}>
              {ICONS[task?.priority]}
            </Typography>
            <Typography className='capitalize line-clamp-1'>
              {task?.priority} Prioroty
            </Typography>
          </Box>
        </TableCell>
        <TableCell className='py-2'>
          <Box className="flex items-center gap-1">
            <Typography className={clsx("w-28 h-8 text-white text-center justify-center rounded-full mt-1 text-lg", TASK_TYPE[task.stage])}>
              {task?.stage}
            </Typography>
          </Box>
        </TableCell>
        <TableCell className='py-2'>
          <Typography className='text-sm text-gray-600'>
            {formatDate(new Date(task?.date))}
          </Typography>
        </TableCell>
        <TableCell className='py-2'>
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
        </TableCell>
        <TableCell className='py-2'>
          <Box className="flex">
            {task?.team?.map((m, index) => (
              <Box key={m._id} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS?.length])}>
                <UserInfo user={m} />
              </Box>
            ))}
          </Box>
        </TableCell>
        <TableCell className='py-2 flex gap-2 md:gap-4 justify-end'>
          <Button
            variant='contained'
            color='success'
            sx={{ margin: "0 0.25rem" }}
            onClick={() => navigate(`/task/${task._id}`)}
          >
            Details</Button>
          {user?.isAdmin ?
            <>
              <Button
                variant='contained'
                sx={{ margin: "0 0.25rem" }}
                onClick={() => editTaskHandler(task)}
              >
                Edit</Button>
              <Button
                variant='contained'
                color="error"
                sx={{ margin: "0 0.25rem" }}
                onClick={() => DeleteClicks(task._id)}
              >Delete</Button>
            </>
            : ""
          }
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      <Box className='bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <Box className="overflow-x-auto">
          <Table className='w-full'>
            <TableHeader />
            <TableBody>
              {tasks.map((task, index) => (
                <TableRowData key={index} task={task} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
      <AddTaskModal
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  )
}