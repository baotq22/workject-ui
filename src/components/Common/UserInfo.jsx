import React, { Fragment } from 'react'

import { Box, Typography } from '@mui/material'
import { Popover, Transition } from '@headlessui/react'

import { getInitials } from '../../utils'

export const UserInfo = ({ user }) => {
  return (
    <Box className="px-4">
      <Popover className='relative'>
        <Popover.Button className='group inline-flex items-center outline-none'>
          <Typography>{getInitials(user?.name)}</Typography>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-96 max-w-sm translate-x-1/2 transform px-4 sm:px-0">
            <Box className="flex items-center gap-4 rounded-lg shadow-lg bg-white p-4">
              <Box className="w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-4xl">
                <Typography>{getInitials(user?.name)}</Typography>
              </Box>
              <Box className="flex flex-col gap-y-1">
                <Typography className='text-black text-xl font-bold'>{user?.name}</Typography>
                <Typography className='text-base text-gray-700'>{user?.title}</Typography>
                <Typography className='text-slate-800'>{user?.email}</Typography>
              </Box>
            </Box>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Box>
  )
}
