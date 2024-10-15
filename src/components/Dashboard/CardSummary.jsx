import clsx from "clsx"
import { Box, Typography } from "@mui/material"

export const CardSummary = ({ label, count, bg, icon }) => {
  return (
    <Box className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
      <Box className='h-full flex flex-1 flex-col justify-between'>
        <Typography className='text-base text-gray-600'>{label}</Typography>
        <Typography className='text-2xl font-semibold' sx={{ fontSize: "1.5rem" }}>{count}</Typography>
      </Box>

      <Box className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", bg)}>
        {icon}
      </Box>
    </Box>
  )
}