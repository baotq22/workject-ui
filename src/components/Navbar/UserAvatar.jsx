import React, { Fragment, useState } from 'react'

import { Menu, Transition } from '@headlessui/react';
import {
  Person,
  Lock,
  Logout,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { getInitials } from '../../utils';
import { useLogoutMutation } from '../../redux/slices/api/authApiSlice';
import { logout } from '../../redux/slices/authSlice';
import { AddUser } from '../Users/AddUser';
import { ChangePassword } from '../Common/ChangePassword';

import 'react-toastify/dist/ReactToastify.css';

export const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      toast.success("Logout successfully!");
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed! Try again");
    }
  }

  return (
    <>
      <Menu as="div" className='relative inline-block text-left'>
        <Box>
          <Menu.Button className='w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600'>
            <Typography className='text-white font-semibold'>
              {getInitials(user?.name)}
            </Typography>
          </Menu.Button>
        </Box>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
            <Box className="p-4">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setOpen(true)}
                    className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'
                  >
                    <Person className='mr-2' aria-hidden='true' />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setOpenPassword(true)}
                    className={`tetx-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                  >
                    <Lock className='mr-2' aria-hidden='true' />
                    Change Password
                  </button>
                )}
              </Menu.Item>
              <Divider sx={{ my: 2 }} />
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                  >
                    <Logout className='mr-2' aria-hidden='true' />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Box>
          </Menu.Items>
        </Transition>
      </Menu>

      <AddUser open={open} setOpen={setOpen} userData={user} />
      <ChangePassword open={openPassword} setOpen={setOpenPassword} />
    </>
  )
}
