import { useState } from 'react'

import { Bolt, Speed, SlowMotionVideo, Balance, Task, ViewList, Message, ThumbUp, Person, BugReport, DoneAll, Pending } from '@mui/icons-material';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { tasks } from '../../assets/data';
import { Tabs, TaskDetailTab,Loading } from '../../components';

const assets = [
  "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const ICONS = {
  high: <Bolt />,
  medium: <Speed />,
  low: <SlowMotionVideo />,
  normal: <Balance />,
};

const TABS = [
  { title: "Task Detail", icon: <Task /> },
  { title: "Activities/Timeline", icon: <ViewList /> },
];

const TASKTYPEICON = {
  commented: (
    <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
      <Message />,
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
      <ThumbUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
      <Person size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <BugReport size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <DoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
      <Pending size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const ActivitiesTab = ({ activity, id }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const isLoading = false;

  const handleSubmit = () => { };

  const Card = ({ item }) => {
    return (
      <Box className="flex space-x-4">
        <Box className="flex flex-col items-center flex-shrink-0">
          <Box className="w-10 h-10 flex items-center justify-center">
            {TASKTYPEICON[item?.type]}
          </Box>
          <Box className="w-full flex items-center">
            <Box className="w-0.5 bg-gray-300 h-full" />
          </Box>
        </Box>
        <Box className="flex flex-col gap-y-1 mb-8">
          <Typography className='font-semibold'>{item?.by?.name}</Typography>
          <Box className="text-gray-500 space-y-2">
            <span className='capitalize'>{item?.type}</span>
            <span className='text-sm'>{moment(item?.date).fromNow()}</span>
          </Box>
          <Box className="text-gray-700">{item?.activity}</Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      <Box className="w-full md:w-1/2">
        <Typography variant='h6' className='text-gray-600 font-semibold te-lg' sx={{ marginBottom: "1.25rem" }}>
          Activities
        </Typography>
        <Box className="w-full">
          {activity?.map((ac, index) => (
            <Card key={index} item={ac} isConnected={index < activity.length - 1} />
          ))}
        </Box>
      </Box>
      <div className='w-full md:w-1/3'>
        <Typography variant='h6' className='text-gray-600 font-semibold text-lg' sx={{ marginBottom: "1.25rem" }}>
          Add Activity
        </Typography>
        <Box className='w-full flex flex-wrap gap-5'>
          {act_types.map((item, index) => (
            <Box key={item} className='flex gap-2 items-center'>
              <Checkbox checked={selected === item ? true : false} onChange={(e) => setSelected(item)} />
              <Typography>{item}</Typography>
            </Box>
          ))}
          <TextField
            rows={10}
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
            label='Type ......'
            className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
          ></TextField>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              variant='contained'
              onClick={handleSubmit}
              className='bg-blue-600 text-white rounded'
            >Submit</Button>
          )}
        </Box>
      </div>
    </Box>
  )
}

export const TaskDetailsPage = () => {
  const { id } = useParams();

  const [selected, setSelected] = useState(0);
  const task = tasks[3];
  return (
    <Box className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <Typography variant='h5'>{task?.title}</Typography>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {
          selected === 0 ? <>
            <TaskDetailTab task={task} />
          </> : <>
            <ActivitiesTab activity={task?.activities} id={id} />
          </>
        }
      </Tabs>
    </Box>
  )
}