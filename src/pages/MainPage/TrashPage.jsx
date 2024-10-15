import React, { useState } from 'react'

import { Bolt, Speed, SlowMotionVideo, Balance, Restore, Delete } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import { PRIORITY_STYLES, TASK_TYPE } from '../../utils';
import { ConfirmationDialog, Loading, Title } from '../../components';
import { useDeleteRestoreTaskMutation, useGetAllTaskQuery } from '../../redux/slices/api/taskApiSlice';

import 'react-toastify/dist/ReactToastify.css';

const ICONS = {
  high: <Bolt />,
  medium: <Speed />,
  low: <SlowMotionVideo />,
  normal: <Balance />,
};

export const TrashPage = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const { data, isLoading } = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "true",
    search: ""
  });

  const [deleteRestore] = useDeleteRestoreTaskMutation();

  const deleteRestoreHandler = async () => {
    try {
      let result;

      switch (type) {
        case "delete":
          result = await deleteRestore({
            id: selected,
            actionType: "delete"
          }).unwrap();
          break;
        case "deleteAll":
          result = await deleteRestore({
            id: selected,
            actionType: "deleteAll"
          }).unwrap();
          break;
        case "restore":
          result = await deleteRestore({
            id: selected,
            actionType: "restore"
          }).unwrap();
          break;
        case "restoreAll":
          result = await deleteRestore({
            id: selected,
            actionType: "restoreAll"
          }).unwrap();
          break;
      }

      toast.success(result?.message);

      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permenantly delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  if (isLoading) {
    return (
      <Box className="py-10">
        <Loading />
      </Box>
    )
  }

  const TableHeader = () => {
    return (
      <TableHead className="border-b border-gray-300">
        <TableRow className="text-left">
          <TableCell className="py-2">Task Title</TableCell>
          <TableCell className="py-2">Priority</TableCell>
          <TableCell className="py-2">Stage</TableCell>
          <TableCell className="py-2 line-clamp-1">Modified On</TableCell>
          <TableCell className="py-2">Action</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  const TableRowData = ({ item }) => {
    return (
      <TableRow className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
        <TableCell className="py-2">
          <Box className="flex items-center gap-3">
            <Box className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
            <Typography className='w-full line-clamp-2 text-base'>
              {item?.title}
            </Typography>
          </Box>
        </TableCell>
        <TableCell className="py-2 capitalize">
          <Box className="flex items-center gap-3">
            <Typography className={clsx("text-lg", PRIORITY_STYLES[item?.priority])}>{ICONS[item?.priority]}</Typography>
            <Typography>{item?.priority}</Typography>
          </Box>
        </TableCell>
        <TableCell className="py-2 capitalize text-center md:text-start">
          {item?.stage}
        </TableCell>
        <TableCell className="py-2 text-sm">
          {new Date(item?.date).toDateString()}
        </TableCell>
        <TableCell className="py-2 flex gap-2 justify-end">
          <Button
            variant='contained'
            startIcon={<Restore />}
            color='success'
            sx={{ margin: "0 0.25rem" }}
            onClick={() => restoreClick(item._id)}
          />
          <Button
            variant='contained'
            startIcon={<Delete />}
            color='error'
            sx={{ margin: "0 0.25rem" }}
            onClick={() => deleteClick(item._id)}
          />
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      <Box className="w-full md:px-1 px-0 mb-6">
        <Box className="flex items-center justify-between mb-8">
          <Title title="Deleted Item" />
          <Box className="flex gap-2 md:gap-4 items-center">
            <Button
              variant='contained'
              startIcon={<Restore />}
              color='success'
              onClick={() => restoreAllClick()}
            >Restore All</Button>
            <Button
              variant='contained'
              startIcon={<Delete />}
              color='error'
              onClick={() => deleteAllClick()}
            >Delete All</Button>
          </Box>
        </Box>
        <Box className="bg-white px-2 md:px-4 py-4">
          <Box className="overflow-x-auto">
            <Table className='w-full mb-5'>
              <TableHeader />
              <TableBody>
                {data?.tasks.map((task, index) => (
                  <TableRowData key={index} item={task} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={() => deleteRestoreHandler()}
      />
    </>
  )
}