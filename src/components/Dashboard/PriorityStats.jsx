import React from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Typography } from "@mui/material";

export const PriorityStats = ({data}) => {
  return (
    <Box className='w-full bg-white dark:bg-slate-700 my-16 p-4 rounded shadow-sm'>
      <Typography variant="h5" className='text-xl text-gray-600 dark:text-gray-100' sx={{marginBottom: "1.5rem"}}>Priority Statistics</Typography>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar dataKey='total' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};