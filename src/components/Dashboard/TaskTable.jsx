import { Bolt, Speed, SlowMotionVideo, Balance } from '@mui/icons-material';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import clsx from 'clsx';

import { UserInfo } from '../../components';
import { BGS, PRIORITY_STYLES, TASK_TYPE } from "../../utils"

export const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <Bolt />,
    medium: <Speed />,
    low: <SlowMotionVideo />,
    normal: <Balance />,
  };

  const TableHeader = () => {
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

  const TableRowData = ({ task }) => {
    return (
      <TableRow className='border-b border-gray-300 text-gray-500 hover:bg-gray-300/10'>
        <TableCell className="py-2">
          <Box className="flex items-center gap-2">
            <Typography
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <Typography
            >{task.title}
            </Typography>
          </Box>
        </TableCell>
        <TableCell className='py-2'>
          <Box className="flex gap-1 items-center">
            <Typography
              className={clsx("text-lg", PRIORITY_STYLES[task.priority])}
            >
              {ICONS[task.priority]}
            </Typography>
            <Typography>
              {task.priority}
            </Typography>
          </Box>
        </TableCell>
        <TableCell className='py-2'>
          <Box className="flex">
            {task.team.map((u, index) => (
              <Box key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
                <UserInfo user={u} />
              </Box>
            ))}
          </Box>
        </TableCell>
        <TableCell className='py-2 hidden md:block'>
          <Typography
            className='text-base text-gray-600'
          >
            {moment(task?.date).fromNow()}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <Box className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <Table>
        <TableHeader />
        <TableBody>
          {tasks.map((task, id) => (
            <TableRowData key={id} task={task} />
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}