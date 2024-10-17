import { Bolt, Speed, SlowMotionVideo, Balance } from '@mui/icons-material';
import { Box, Table, TableBody } from '@mui/material';

import { TaskTableHeader, TaskTableRowData } from '../../components';

export const ICONS = {
  high: <Bolt />,
  medium: <Speed />,
  low: <SlowMotionVideo />,
  normal: <Balance />,
};

export const TaskTable = ({ tasks }) => {
  return (
    <Box className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <Table>
        <TaskTableHeader />
        <TableBody>
          {tasks.map((task, id) => (
            <TaskTableRowData key={id} task={task} />
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}