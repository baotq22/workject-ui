import React, { useState } from 'react'
import { ModalWrapper, UserList, SelectList, DateBox } from '../../components'
import { Dialog } from '@headlessui/react'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { LISTS, PRIORIRY } from '../../utils'
import { Image } from '@mui/icons-material';

const uploadedFileURLs = [];

export const AddTaskModal = ({ open, setOpen }) => {
  const task = "";
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [team, setTeam] = useState(task?.team || "");
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const submitHandler = () => {

  }

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 dark:text-white mb-4'
        >
          {task ? "UPDATE" : "ADD"} TASK
        </Dialog.Title>
        <Box className="mt-2 flex flex-col gap-6">
          <Box className="bg-white dark:bg-slate-700 flex flex-col">
            <TextField
              className='dark:text-white'
              label="Task Title"
              name="title"
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register('title', {
                required: 'Title is required',
                pattern: {
                  value: /^[a-zA-Z0-9]*$/,
                  message: 'Enter a valid title',
                },
              })}
            />
          </Box>
          <UserList
            setTeam={setTeam}
            team={team}
          />

          <Box className="flex gap-4">
            <SelectList
              label="List Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />

            <SelectList
              label='Priority Level'
              lists={PRIORIRY}
              selected={priority}
              setSelected={setPriority}
            />
          </Box>

          <Box className='flex gap-4'>
            <Box className="w-full">
              <DateBox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
            </Box>
          </Box>

          <Box className='flex gap-4'>
            <Box className='w-full flex items-center justify-center mt-4'>
              <label
                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4 dark:text-white'
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className='hidden'
                  id='imgUpload'
                  onChange={(e) => handleSelect(e)}
                  accept='.jpg, .png, .jpeg'
                  multiple={true}
                />
                <Image />
                <span>Add Assets</span>
              </label>
            </Box>
          </Box>
          <Box className="bg-gray-50 dark:bg-slate-700 dark:border-slate-800 py-6 sm:flex sm:flex-row-reverse gap-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={uploading}
              startIcon={uploading && <CircularProgress size={20} />}
              style={{ marginTop: '1rem' }}
            >
              {uploading ? 'Uploading assets...' : 'Submit'}
            </Button>
            <Button variant="outlined" color="error" fullWidth style={{ marginTop: '1rem' }} onClick={() => setOpen(false)}>Close</Button>
          </Box>
        </Box>
      </form>
    </ModalWrapper >
  )
}
