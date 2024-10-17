import { Box, Table, TableBody } from '@mui/material'

import { UserTableHeader, UserTableRowData } from "../../components"

export const UserTable = ({ users }) => {
  return (
    <Box className='w-full md:w-1/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <Table className='w-full mb-5'>
        <UserTableHeader />
        <TableBody>
          {users?.map((user, index) => (
            <UserTableRowData key={index + user?._id} user={user} />
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}