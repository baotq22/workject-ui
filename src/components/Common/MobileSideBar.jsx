import React, { Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenSidebar } from '../../redux/slices/authSlice';
import { Transition } from '@headlessui/react';
import { Close } from '@mui/icons-material';
import clsx from 'clsx';
import { Sidebar } from '../../components';
import { Box, Button } from '@mui/material';

export const MobileSideBar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-700"
      enterFrom="opacity-x-10"
      enterTo="opacity-x-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-x-100"
      leaveTo="opacity-x-0"
    >
      {(ref) => (<Box ref={(node) => (mobileMenuRef.current = node)}
        className={clsx('md:hidden w-full h-full bg-black/40 transition-all duration-700 transform',
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={() => closeSidebar()}
      >
        <Box className="bg-white w-full h-full">
          <Box className="w-full flex justify-end px-5 mt-5">
            <Button
              onClick={() => closeSidebar()}
              className='flex justify-end items-end'
            >
              <Close size={25} />
            </Button>
          </Box>

          <Box className="-mt-10">
            <Sidebar />
          </Box>
        </Box>
      </Box>)}
    </Transition>
  )
}
