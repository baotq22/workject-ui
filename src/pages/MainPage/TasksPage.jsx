import React, { useState } from 'react'

import { GridView, FormatListBulleted, Add } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

import { TASK_TYPE } from '../../utils';
import { Loading, Title, Tabs, BoardView, TableView, AddTaskModal } from "../../components"
import { useGetAllTaskQuery } from '../../redux/slices/api/taskApiSlice';
import { useSelector } from 'react-redux';

const TABS = [
  { title: "Grid View", icon: <GridView /> },
  { title: "List View", icon: <FormatListBulleted /> },
]

export const TasksPage = () => {
  const params = useParams();

  const { user } = useSelector((state) => state.auth);

  const status = params?.status || ""

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: searchValue
  });

  return isLoading ? (
    <Box className='py-10'><Loading /></Box>
  ) : (
    <>
      <Box className="w-full">
        <Box className="flex items-center justify-between mb-4">
          <Title title={status ? `${status} Tasks` : "All Tasks"} />
          {
            user?.isAdmin && !status && <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
              Create New Task
            </Button>
          }
          <Box className="w-64 flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Search"
                variant="standard"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {selected !== 1 ? (
            <>
              <BoardView tasks={data?.tasks} />
            </>
          ) : (
            <div className='w-full mt-6'>
              <TableView tasks={data?.tasks} />
            </div>
          )}
        </Tabs>
      </Box>
      <AddTaskModal open={open} setOpen={setOpen} />
    </>
  )
}