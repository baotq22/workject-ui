import React from 'react'

import { TableCell, TableHead, TableRow } from '@mui/material'

export const TaskTableHeader = () => {
  return (
    <TableHead className="border-b border-gray-300">
      <TableRow className="text-left">
        <TableCell className="py-2">Task Title</TableCell>
        <TableCell className="py-2">Priority</TableCell>
        <TableCell className="py-2">Team</TableCell>
        <TableCell className="py-2 hidden md:table-cell">Created At</TableCell>
      </TableRow>
    </TableHead>
  )
}
