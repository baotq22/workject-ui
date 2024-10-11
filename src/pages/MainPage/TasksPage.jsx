import React, { useState } from 'react'

import { GridView, FormatListBulleted, Add } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { TASK_TYPE } from '../../utils';
import { Loading, Title, Tabs, TaskTitle, BoardView, TableView, AddTaskModal } from "../../components"
import { useGetAllTaskQuery } from '../../redux/slices/api/taskApiSlice';

const TABS = [
  { title: "Grid View", icon: <GridView /> },
  { title: "List View", icon: <FormatListBulleted /> },
]

export const TasksPage = () => {
  const params = useParams();

  const status = params?.status || ""

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: ""
  });

  console.log(data);

  return isLoading ? (
    <Box className='py-10'><Loading /></Box>
  ) : (
    <Box className="w-full">
      <Box className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "All Tasks"} />
        {
          !status && <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
            Create New Task
          </Button>
        }
      </Box>
      <Box>
        <Tabs tabs={TABS} setSelected={setSelected}>

          {selected !== 1 ? (
            <>
              {
                !status && (
                  <Box className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
                    <TaskTitle label="To Do" className={TASK_TYPE.todo} />
                    <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
                    <TaskTitle label="completed" className={TASK_TYPE.completed} />
                  </Box>
                )
              }
              <BoardView tasks={data?.tasks} />
            </>
          ) : (
            <div className='w-full mt-6'>
              <TableView tasks={data?.tasks} />
            </div>
          )}
        </Tabs>

        <AddTaskModal open={open} setOpen={setOpen}/>
      </Box>
    </Box>
  )
}