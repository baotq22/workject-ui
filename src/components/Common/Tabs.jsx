import { Tab } from '@headlessui/react';
import { Box, Typography } from '@mui/material';
import React from 'react'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
}

export const Tabs = ({ tabs, setSelected, children }) => {
  return (
    <Box classNames="w-full px-1 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-6 rounded-xl p-1">
          {
            tabs.map((tab, index) => (
              <Tab key={tab.title}
                onClick={() => setSelected(index)}
                className={({ selected }) => classNames("w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white dark:bg-slate-700", selected ? "text-blue-700 dark:text-blue-500 border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-800 dark:text-white hover:text-blue-700 dark:hover:text-blue-500")}
              >
                {tab.icon}
                <Typography>{tab.title}</Typography>
              </Tab>
            ))
          }
        </Tab.List>
        <Tab.Panels className="w-full mt-2">
          {children}
        </Tab.Panels>
      </Tab.Group>
    </Box>
  )
}
