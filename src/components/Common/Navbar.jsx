import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@mui/icons-material';
import { Box, Button} from '@mui/material';

import { setOpenSidebar } from '../../redux/slices/authSlice';
import { UserAvatar, Notification } from '../../components';

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <Box className='flex justify-between items-center bg-gray-200 px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <Box className='flex gap-4'>
        <Box className="mt-4 block md:hidden">
          <Button onClick={() => dispatch(setOpenSidebar(true))} className='text-2xl text-gray-500'>
            <Menu />
          </Button>
        </Box>
      </Box>
      <Box className='flex gap-2 items-center'>
        <Notification />
        <UserAvatar />
      </Box>
    </Box>
  )
}
