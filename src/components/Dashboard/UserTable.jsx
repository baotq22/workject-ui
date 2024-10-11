import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import clsx from 'clsx'
import moment from 'moment'

import { BGSU, getInitials } from '../../utils'

export const UserTable = ({ users }) => {
  const TableHeader = () => {
    return (
      <TableHead className="border-b border-gray-300">
        <TableRow className="text-left">
          <TableCell className="py-2">Full Name</TableCell>
          <TableCell className="py-2">Status</TableCell>
          <TableCell className="py-2">Created At</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * BGSU.length);
    return BGSU[randomIndex];
  };

  const TableRowData = ({ user }) => {
    console.log(user);
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

  return (
    <Box className='w-full md:w-1/3 bg-white dark:bg-slate-500 px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <Table className='w-full mb-5'>
        <TableHeader />
        <TableBody>
          {users?.map((user, index) => (
            <TableRowData key={index + user?._id} user={user} />
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}