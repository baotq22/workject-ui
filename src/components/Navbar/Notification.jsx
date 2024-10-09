import React, { Fragment, useState } from 'react'
import { NotificationsActive, Notifications, ChatBubble } from '@mui/icons-material';
import { Popover, Transition } from '@headlessui/react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ICONS = {
  alert: (
    <NotificationsActive className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
  message: (
    <ChatBubble className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  )
}

const data = [
  {
    _id: "65c5bbf3787832cf99f28e6d",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c27a0e18c0a1b750ad5cad",
      "65c30b96e639681a13def0b5",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
    task: null,
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T05:45:23.353Z",
    updatedAt: "2024-02-09T05:45:23.353Z",
    __v: 0,
  },
  {
    _id: "65c5f12ab5204a81bde866ab",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
    task: {
      _id: "65c5f12ab5204a81bde866a9",
      title: "Test task",
    },
    notiType: "alert",
    isRead: [],
    createdAt: "2024-02-09T09:32:26.810Z",
    updatedAt: "2024-02-09T09:32:26.810Z",
    __v: 0,
  },
];

export const Notification = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // const {data, refetch} = useGetNotificationsQuery();
  // const [markAsRead] = useMarkAsReadMutation();

  const readHandler = () => { };
  const viewHandler = () => { };

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark as Read",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", "")
    }
  ]

  return (
    <Popover className="relative">
      <Popover.Button className='inline-flex items-center outline-none'>
        <Box className="w-10 h-10 flex items-center justify-center text-gray-800 dark:text-white relative">
          <Notifications className='text-3xl dark:text-white' />
          {data?.length > 0 && (
            <Typography className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-5 h-5 rounded-full bg-red-600'>
              {data?.length}
            </Typography>
          )}
        </Box>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4'>
          {({ close }) =>
            data?.length > 0 && (
              <Box className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-slate-700 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                <Box className='p-4'>
                  {data?.slice(0, 5).map((item, index) => (
                    <Box
                      key={item._id + index}
                      className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50 hover:dark:bg-slate-900'
                    >
                      <Box className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-slate-500 hover:dark:bg-slate-700'>
                        {ICONS[item.notiType]}
                      </Box>

                      <Box
                        className='cursor-pointer'
                        onClick={() => viewHandler(item)}
                      >
                        <Box className='flex items-center gap-3 font-semibold text-gray-900 dark:text-white capitalize'>
                          <Typography> {item.notiType}</Typography>
                          <Typography className='text-xs font-normal lowercase'>
                            {moment(item.createdAt).fromNow()}
                          </Typography>
                        </Box>
                        <Typography className='line-clamp-1 mt-1 text-gray-600 dark:text-gray-200'>
                          {item.text}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box className='grid grid-cols-2 divide-x bg-gray-50 dark:bg-slate-600'>
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      onClick={
                        item?.onClick ? () => item.onClick() : () => close()
                      }
                      className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-black dark:text-white hover:bg-gray-100 hover:dark:bg-slate-700'
                    >
                      {item.name}
                    </Link>
                  ))}
                </Box>
              </Box>
            )
          }
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
