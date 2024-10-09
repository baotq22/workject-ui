import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, BusinessCenter, DoneOutline, Loop, Checklist, Groups2, Delete, Person, People, Settings, AssignmentTurnedIn } from '@mui/icons-material';
import { setOpenSidebar } from '../../redux/slices/authSlice';
import clsx from 'clsx';
import { Box, Button, Typography } from '@mui/material';

const linkData = [
  {
    name: "Home",
    icon: <Home />,
    link: "dashboard"
  },
  {
    name: "Tasks",
    icon: <BusinessCenter />,
    link: "tasks"
  },
  {
    name: "Completed",
    icon: <DoneOutline />,
    link: "completed/completed",
  },
  {
    name: "In Progress",
    icon: <Loop />,
    link: "in-progress/in progress",
  },
  {
    name: "To Do",
    icon: <Checklist />,
    link: "todo/todo",
  },
  {
    name: "Team",
    icon: <Groups2 />,
    link: "team",
  },
  {
    name: "Profile",
    icon: <Person />,
    link: "profile"
  },
  {
    name: "Users",
    icon: <People />,
    link: "users"
  },
  {
    name: "Trash",
    icon: <Delete />,
    link: "deleted",
  }
]

export const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  }

  const NavLinks = ({ value }) => {
    return (
      <Link to={value.link} onClick={closeSidebar}
        className={clsx("w-full flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d] dark:text-white", path === value.link.split("/")[0] ?
          "bg-gradient-to-r from-slate-500 to-slate-800 text-white dark:from-slate-800 dark:to-slate-500 dark:text-black" :
          "text-black")}
      >
        {value.icon}
        <Typography className="hover:text-[#2546ed]">{value.name}</Typography>
      </Link>
    )
  }
  return (
    <Box className='w-full h-full flex flex-col gap-6 p-5 dark:bg-slate-700'>
      <Typography variant="h1" className='flex gap-1 items-center'>
        <Typography className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-2 rounded-full'>
          <AssignmentTurnedIn sx={{ color: "white" }} />
        </Typography>
        <Typography variant="h4" className='mx-2 text-3xl font-bold bg-gradient-to-tr from-gray-600 via-teal-300 to-blue-600 bg-clip-text text-transparent'>WorkJect</Typography>
      </Typography>

      <Box className='flex-1 flex flex-col gap-y-5 py-8'>
        {
          sidebarLinks.map((links) => (
            <NavLinks value={links} key={links.name} />
          ))
        }
      </Box>
      <Box>
        <Button className='w-full flex gap-2 p-2 items-center text-lg'>
          <Settings />
          <Typography>Settings</Typography>
        </Button>
      </Box>
    </Box>
  )
}
