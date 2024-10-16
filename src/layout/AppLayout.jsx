import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/material";
import { Sidebar, Navbar, MobileSideBar } from "../components";
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const AppLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='w-full h-screen flex flex-col md:flex-row'>
        <Box className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
          <Sidebar />
        </Box>

        <MobileSideBar />

        <Box className='flex-1 overflow-y-auto'>
          <Navbar />
          <Box className='p-4 2xl:px-10'>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
