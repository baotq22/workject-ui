import { useState } from 'react'

import { Bolt, Speed, SlowMotionVideo, Balance, Task, ViewList, Message, ThumbUp, Person, BugReport, DoneAll, Pending } from '@mui/icons-material';
import { Box, Button, Checkbox, Radio, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import moment from 'moment'

import { Tabs, TaskDetailTab, Loading } from '../../components';
import { useGetSingleTaskQuery, usePostTasksActivityMutation } from '../../redux/slices/api/taskApiSlice';

import 'react-toastify/dist/ReactToastify.css';

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

  const [postActivity, { isLoading }] = usePostTasksActivityMutation();
  const handleSubmit = async () => {
    try {
      const activityData = {
        type: selected?.toLowerCase(),
        activity: text,
      }
      const result = await postActivity({
        data: activityData,
        id
      }).unwrap();

      setText("");
      toast.success(result?.message)
    } catch (error) {
      toast.error(error?.data?.message)
    }
  };

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
          <Typography className='font-semibold '>{item?.by?.name}</Typography>
          <Box className="text-gray-600 space-y-2">
            <span className='capitalize'>{item?.type}</span>
            <span> about </span>
            <span className='text-base'>{moment(item?.date).fromNow()}</span>
          </Box>
          <Box className="text-gray-600">
            <span style={{ whiteSpace: 'pre-wrap' }}>{item?.activity}</span>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto mt-6">
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
              <Radio checked={selected === item ? true : false} onChange={(e) => setSelected(item)} />
              <Typography className=''>{item}</Typography>
            </Box>
          ))}
          <TextField
            rows={10}
            multiline
            value={text}
            onChange={(e) => setText(e.target.value)}
            label='Comment for activity'
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
  const { data, isLoading } = useGetSingleTaskQuery(id);
  const [selected, setSelected] = useState(0);
  const task = data?.task;

  if (isLoading) {
    return (
      <Box className="py-10">
        <Loading />
      </Box>
    )
  }

  return (
    <Box className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <Typography variant='h4' className=''>{task?.title}</Typography>
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