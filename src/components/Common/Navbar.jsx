import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Search, Menu } from '@mui/icons-material';
import { setOpenSidebar } from '../../redux/slices/authSlice';
import { Box, Button, TextField } from '@mui/material';
import { UserAvatar, Notification } from '../../components';

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <Box className='flex justify-between items-center bg-white dark:bg-slate-700 px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <Box className='flex gap-4'>
        <Box className="mt-4 block md:hidden">
          <Button onClick={() => dispatch(setOpenSidebar(true))} className='text-2xl text-gray-500 dark:text-white'>
            <Menu />
          </Button>
        </Box>
        <Box className="w-64 2xl:w-[25rem] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6 dark:bg-neutral-100">
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Search" variant="standard" />
          </Box>
        </Box>
      </Box>
      <Box className='flex gap-2 items-center'>
        <Notification />
        <UserAvatar />
      </Box>
    </Box>
  )
}
