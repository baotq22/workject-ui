import React from 'react'

import { Box, TableCell, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import clsx from 'clsx';

import { BGSU, getInitials } from '../../../utils';

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * BGSU.length);
  return BGSU[randomIndex];
};

export const UserTableRowData = ({ user }) => {
  const randomBgColor = getRandomColor();
  return (
    <TableRow className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <TableCell className="py-2">
        <Box className="flex items-center gap-3">
          <Box
            className={`h-9 w-9 rounded-full text-white flex items-center justify-center text-sm ${randomBgColor}`} // Dynamically apply the background color
          >
            <Typography className='text-center'>{getInitials(user?.name)}</Typography>
          </Box>
          <Box>
            <Typography>{user.name}</Typography>
            <Typography className='text-xs text-gray-400'>{user?.role}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography className={clsx("w-fit px-3 py-1 rounded-full text-sm", user?.isActive ? "bg-blue-200" : "bg-yellow-100")}>
          {user?.isActive ? "Active" : "Disabled"}
        </Typography>
      </TableCell>
      <TableCell className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</TableCell>
    </TableRow>
  )
}