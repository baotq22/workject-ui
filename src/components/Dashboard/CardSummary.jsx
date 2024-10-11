import clsx from "clsx"
import { Box, Typography } from "@mui/material"

export const CardSummary = ({ label, count, bg, icon }) => {
  return (
    <Box className='w-full h-32 bg-white dark:bg-slate-700 p-5 shadow-md rounded-md flex items-center justify-between'>
      <Box className='h-full flex flex-1 flex-col justify-between'>
        <Typography className='text-base text-gray-600 dark:text-gray-100'>{label}</Typography>
        <Typography className='text-2xl font-semibold dark:text-white' sx={{fontSize: "1.5rem"}}>{count}</Typography>
        <Typography className='text-sm text-gray-400 dark:text-neutral-100'>{"110 last month"}</Typography>
      </Box>

      <Box className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", bg)}>
        {icon}
      </Box>
    </Box>
  )
}