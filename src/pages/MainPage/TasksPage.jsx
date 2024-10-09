import React, { useState } from 'react'
import { GridView, FormatListBulleted, Add } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { TASK_TYPE } from '../../utils';
import { tasks } from '../../assets/data';
import { Box, Button } from '@mui/material';
import { Loading, Title, Tabs, TaskTitle, BoardView, TableView, AddTaskModal } from "../../components"

const TABS = [
  { title: "Grid View", icon: <GridView /> },
  { title: "List View", icon: <FormatListBulleted /> },
]

export const TasksPage = () => {
  const params = useParams();

  const status = params?.status || ""

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return loading ? (
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
          {
            !status && (
              <Box className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
                <TaskTitle label="To Do" className={TASK_TYPE.todo} />
                <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
                <TaskTitle label="completed" className={TASK_TYPE.completed} />
              </Box>
            )
          }
          {selected !== 1 ? (
            <BoardView tasks={tasks} />
          ) : (
            <div className='w-full'>
              <TableView tasks={tasks} />
            </div>
          )}
        </Tabs>

        <AddTaskModal open={open} setOpen={setOpen} />
      </Box>
    </Box>
  )
}