import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar, Navbar, MobileSideBar } from "../components";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const AppLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
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
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}
