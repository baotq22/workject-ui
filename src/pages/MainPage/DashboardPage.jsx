import React from 'react'
import { Assignment, AssignmentTurnedIn, Autorenew, PendingActions } from '@mui/icons-material';
import { summary } from "../../assets/data"
import { PriorityStats, TaskTable, CardSummary, UserTable } from '../../components';

export const DashboardPage = () => {

  const totals = summary.tasks

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <Assignment />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <AssignmentTurnedIn />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <Autorenew />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS TASK",
      total: totals["todo"],
      icon: <PendingActions />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {
          stats.map(({ icon, bg, label, total }, index) => (
            <CardSummary key={index} icon={icon} bg={bg} label={label} count={total} />
          ))
        }
      </div>

      <div className='w-full bg-white dark:bg-slate-700 my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 dark:text-gray-100 font-semibold'>Priority Statistics</h4>
        <PriorityStats />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        { /* left */}
        <TaskTable tasks={summary.last10Task} />
        { /* right */}
        <UserTable users={summary.users} />
      </div>
    </div>
  )
}