import React from 'react'

import { TableCell, TableHead, TableRow } from '@mui/material'

export const UserTableHeader = () => {
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
