import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useLoginMutation } from '../../redux/slices/api/authApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';

import 'react-toastify/dist/ReactToastify.css';

export const LoginPage = () => {
  const {user} = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();

  const actionSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
      toast.success("Login successfully!")
    } catch (error) {
      toast.error("Login failed! Try again.")
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <Box className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-gradient-to-tr from-slate-300 via-fuchsia-200 to-cyan-200'>
      <Box className='w-full md:w-auto flex gap-0 md:gap-52 flex-col md:flex-row items-center justify-center'>
        <Box className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <Box className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <Typography className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
              Make your project and tasks inside to be comfortable!
            </Typography>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center bg-gradient-to-tr from-green-300 via-rose-300 to-orange-100 bg-clip-text text-transparent'>
              <span>WorkJect</span>
              <span>Project Management System</span>
            </p>
            <Box className="cell">
              <Box className="circle rotate-in-up-left"></Box>
            </Box>
          </Box>
        </Box>
        <Box className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form onSubmit={handleSubmit(actionSubmit)} className='form-container w-full md:w-[25rem] flex flex-col gap-y-8 bg-gradient-to-r from-slate-200 to-slate-50 px-10 py-14'>
            <Box>
              <p className='bg-gradient-to-tr from-lime-600 via-gray-300 to-blue-600 bg-clip-text text-transparent text-3xl font-bold text-center'>
                Welcome Back!
              </p>
              <p className='text-center text-base text-gray-700'>Have a good performance of work!</p>
            </Box>
            <Box className="flex flex-col gap-y-5">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
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

              {apiError && (
                <Typography color="error">{apiError}</Typography>
              )}

              <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>Forgot Password?</span>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                startIcon={isLoading && <CircularProgress size={20} />}
                style={{ marginTop: '1rem' }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
