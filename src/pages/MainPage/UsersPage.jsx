import { useState } from 'react'

import { toast } from 'react-toastify';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import clsx from 'clsx';

import { BGSU, getInitials } from '../../utils';
import { ConfirmationDialog, UserAction, AddUser, Title } from '../../components';
import { useDeleteUserMutation, useGetTeamListQuery, useUserActionMutation } from '../../redux/slices/api/userApiSlice';

import 'react-toastify/dist/ReactToastify.css';

export const UsersPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetTeamListQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();
  const getCurrentUserId = JSON.parse(localStorage.getItem("userInfo"))._id;

  console.log(JSON.parse(localStorage.getItem("userInfo"))._id);

  const deleteHandler = async () => {
    try {
      const result = await deleteUser(selected);

      refetch();

      toast.success("Delete Successfully!");
      setSelected(null);
      setTimeout(() => {
        setOpenDialog(false);
      }, 1500);
    } catch (error) {
      toast.error("Delete Failed!")
    }
  };
  const userActionHandler = async () => {
    try {
      const result = await userAction({
        isActive: !selected.isActive,
        id: selected?._id,
      });

      refetch();
      toast.success("Operation Successfully!");
      setTimeout(() => {
        setOpenAction(false);
      }, 1000);
    } catch (error) {
      toast.error("Operation Failed!")
    }
  };

  const handleModalClose = () => {
    setOpenDialog(false);
    setSelected(null);
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusOpen = (el) => {
    setSelected(el);
    setOpenAction(true);
  };

  const TableHeader = () => {
    return (
      <TableHead className="border-b border-gray-300">
        <TableRow className="text-left">
          <TableCell className="py-2">Full Name</TableCell>
          <TableCell className="py-2">Title</TableCell>
          <TableCell className="py-2">Email</TableCell>
          <TableCell className="py-2">Role</TableCell>
          <TableCell className="py-2">Active</TableCell>
          <TableCell className='py-2'>Action</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * BGSU.length);
    return BGSU[randomIndex];
  };

  const TableRowData = ({ user }) => {
    const randomBgColor = getRandomColor();
    return (
      <TableRow className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
        <TableCell className="py-2">
          <Box className="flex items-center gap-3">
            <Box
              className={`h-9 w-9 rounded-full text-white flex items-center justify-center text-sm ${randomBgColor}`}
            >
              <Typography className='text-center'>{getInitials(user?.name)}</Typography>
            </Box>
            <Typography className='text-center'>{user?.name}</Typography>

          </Box>
        </TableCell>
        <TableCell className="py-2">
          <Box className="flex items-center gap-3">
            <Typography className='text-center'>{user?.title}</Typography>
          </Box>
        </TableCell>
        <TableCell className="py-2">
          <Box className="flex items-center gap-3">
            <Typography className='text-center'>{user.email || "Not Available"}</Typography>
          </Box>
        </TableCell>
        <TableCell className="py-2">
          <Box className="flex items-center gap-3">
            <Typography className='text-center'>{user?.role}</Typography>
          </Box>
        </TableCell>
        <TableCell className="py-2">
          {getCurrentUserId === user?._id ? <>
            <Typography className='bg-green-600 py-3 px-4 text-white w-fit'>Active</Typography>
          </> : <Button
            onClick={() => userStatusOpen(user)}
            className={clsx(
              "w-fit px-4 py-1 rounded-full",
            )}
            variant='contained'
            color={user?.isActive ? "success" : "error"}
          >
            {user?.isActive ? "Active" : "Disabled"}
          </Button>
          }
        </TableCell>
        <TableCell className='py-2 flex gap-2 md:gap-4 justify-end'>
          <Button variant='contained' sx={{ margin: "0 0.25rem" }} onClick={() => editClick(user)}>Edit</Button>
          {getCurrentUserId === user?._id ? <></> :
            <Button
              variant='contained'
              color="error"
              sx={{ margin: "0 0.25rem" }}
              onClick={() => deleteClick(user?._id)}
            >Delete</Button>
          }
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      <Box className="w-full md:px-1 px-0 mb-6">
        <Box className="flex items-center justify-between mb-8">
          <Title title="All Users" />
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={() => {
              setSelected(null);
              setOpen(true);
            }}
          >Add New User</Button>
        </Box>
        <Box className="bg-white dark:bg-slate-500 px-2 md:px-4 py-4">
          <Box className="overflow-x-auto">
            <Table className='w-full mb-5'>
              <TableHeader />
              <TableBody>
                {data?.map((user, index) => (
                  <TableRowData key={index} user={user} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
        refetch={refetch}
      />
      <ConfirmationDialog
        open={openDialog}
        setOpen={handleModalClose}
        onClick={deleteHandler}
      />
      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  )
}