import React from 'react'

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';

import { Loading, ModalWrapper } from "../../components"
import { useRegisterMutation } from '../../redux/slices/api/authApiSlice';
import { useUpdateUserMutation } from '../../redux/slices/api/userApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';

import 'react-toastify/dist/ReactToastify.css';

export const AddUser = ({ open, setOpen, userData, refetch }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success("Update user successfully!");

        if (userData?._id === user._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        await addNewUser({ ...data, password: data.email }).unwrap();
        toast.success("Add new user successfully!");
      }

      refetch();

      setTimeout(() => {
        setOpen(false)
      }, 2000)
    } catch (error) {
      toast.error("Something went wrong!")
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
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <TextField
              label="Full name"
              name="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', {
                required: 'Full name is required',
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Enter a valid name',
                },
              })}
            />
            <TextField
              label="Title"
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
            <TextField
              label="Email Address"
              name="email"
              disabled={userData}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            <TextField
              label="Role"
              name="role"
              error={!!errors.role}
              helperText={errors.role?.message}
              {...register('role', {
                required: 'Role is required',
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/,
                  message: 'Enter a valid role',
                },
              })}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ margin: '1rem', padding: '0.75rem' }}
              >

                {userData ? "Update User" : "Add User"}
              </Button>

              <Button variant="contained" color="error" fullWidth style={{ margin: '1rem', padding: '0.75rem' }} onClick={() => setOpen(false)}>Close</Button>

            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  )
}
