import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'
import { Dialog } from '@headlessui/react';
import { Box, Button, TextField } from '@mui/material';

import { ModalWrapper } from '../../components';
import { DateBox } from './DateBox';
import { useCreateSubTaskMutation } from '../../redux/slices/api/taskApiSlice';

import 'react-toastify/dist/ReactToastify.css';

export const AddSubTaskModal = ({ open, setOpen, id }) => {
  const todayDate = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addSbTask] = useCreateSubTaskMutation();

  const handleOnSubmit = async (data) => {
    try {
      const res = await addSbTask({ data, id }).unwrap();
      toast.success(res.message);
      
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            ADD SUB-TASK
          </Dialog.Title>
          <Box className='mt-2 flex flex-col gap-6'>
            <Box className="bg-white flex flex-col">
              <TextField
                label="Sub-Task Title"
                name="title"
                error={!!errors.title}
                helperText={errors.title?.message}
                {...register('title', {
                  required: 'Title is required',
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message: 'Enter a valid title',
                  },
                })}
              />
            </Box>

            <Box className='flex items-center gap-4'>
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

            <Box className='mt-2 flex flex-col gap-6'>
              <Box className="bg-white flex flex-col">
                <TextField
                  label="Tag"
                  name="tag"
                  error={!!errors.tag}
                  helperText={errors.tag?.message}
                  {...register('tag', {
                    required: 'tag is required',
                    pattern: {
                      value: /^[a-zA-Z0-9]*$/,
                      message: 'Enter a valid tag',
                    },
                  })}
                />
              </Box>
            </Box>
          </Box>
          <Box className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '1rem' }}
            >
              Add Task
            </Button>
            <Button variant="outlined" color="error" fullWidth style={{ marginTop: '1rem' }} onClick={() => setOpen(false)}>Close</Button>
          </Box>
        </form>
      </ModalWrapper>
    </>
  );
}
