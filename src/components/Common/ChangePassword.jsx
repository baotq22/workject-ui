import React, { useEffect } from 'react'

import { set, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { Box, Button, Dialog, TextField, CircularProgress, Typography } from '@mui/material';

import { useChangePasswordMutation } from '../../redux/slices/api/userApiSlice';
import { ModalWrapper } from './ModalWrapper';

import 'react-toastify/dist/ReactToastify.css';

export const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Password does't match. Try again!");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Change Password Successfully");

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Typography
            variant="h5"
            className="text-base font-bold leading-6 text-gray-900"
            sx={{marginBottom: "2rem"}}
          >
            Change Password
          </Typography>
          <Box className='mt-2 flex flex-col gap-6'>
            <TextField
              label="New Password"
              type="password"
              name="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
          </Box>
          <Box className='mt-2 flex flex-col gap-6'>
            <TextField
              label="Confirm Password"
              type="password"
              name="cpass"
              error={!!errors.cpass}
              helperText={errors.cpass?.message}
              {...register('cpass', {
                required: 'Confirm Password is required',
                minLength: {
                  value: 6,
                  message: 'Confirm Password must be at least 6 characters long',
                },
              })}
            />
          </Box>

          <Box className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} />}
              style={{ margin: '1rem', padding: '0.75rem' }}
            >
              {isLoading ? 'Please Wait...' : 'Submit'}
            </Button>
            <Button variant="contained" color="error" fullWidth style={{ margin: '1rem', padding: '0.75rem' }} onClick={() => setOpen(false)}>Close</Button>
          </Box>
        </form>
      </ModalWrapper>
    </>
  )
}
