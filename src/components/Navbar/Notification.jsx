import React, { Fragment, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Notifications, ChatBubble } from '@mui/icons-material';
import { Popover, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useGetNotificationsQuery, useMarkNotiAsReadMutation } from '../../redux/slices/api/userApiSlice';
import { ViewNotification } from '../Common/ViewNotification';
import clsx from 'clsx';

const ICONS = {
  alert: (
    <Notifications className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
  message: (
    <ChatBubble className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  )
}

export const Notification = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Extract notice and unreadCount from the query response
  const { data, refetch } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotiAsReadMutation();

  const readHandler = async (type, id) => {
    await markAsRead({ type, id }).unwrap();
    refetch();
  };

  const viewHandler = async (el) => {
    setSelected(el);
    readHandler("one", el._id);
    setOpen(true);
  };

  const allNotify = () => {
    navigate("/notification");
  };

  const callsToAction = [
    {
      name: "Mark as Read",
      icon: "",
      onClick: () => readHandler("all", "")
    },
    {
      name: "View All Notifications",
      icon: "",
      onClick: () => allNotify()
    },
  ];

  return (
    <>
      <Popover className="relative">
        <Popover.Button className='inline-flex items-center outline-none'>
          <Box className="w-10 h-10 flex items-center justify-center text-gray-800 relative">
            <Notifications className='text-3xl' />
            {data?.unreadCount > 0 && (
              <Typography className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-5 h-5 rounded-full bg-red-600'>
                {data.unreadCount}
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
              <Box className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                {data?.notice?.length > 0 ? (
                  <Box className='p-4'>
                    {data.notice.slice(0, 5).map((item, index) => (
                      <Box
                        key={item._id + index}
                        className={clsx('group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50 hover:dark:bg-slate-900 my-2',
                          item.isRead.length > 0 ? '' : 'bg-gray-100'
                        )}
                      >
                        <Box className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 hover:dark:bg-slate-700'>
                          {ICONS[item.notiType]}
                        </Box>

                        <Box
                          className='cursor-pointer'
                          onClick={() => viewHandler(item)}
                        >
                          <Box className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                            <Typography> {item.notiType}</Typography>
                            <Typography className='text-xs font-normal lowercase'>
                              {moment(item.createdAt).fromNow()}
                            </Typography>
                          </Box>
                          <Typography className='line-clamp-1 mt-1 text-gray-600'>
                            {item.text}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : <Typography className='text-gray-500 text-center justify-center p-4' sx={{ fontSize: "1.25rem" }}>No Notifications Here</Typography>
                }
                <Box className='grid grid-cols-2 divide-x bg-gray-50'>
                  {callsToAction.map((item) => (
                    <Box
                      key={item.name}
                      onClick={
                        item?.onClick ? () => item.onClick() : () => close()
                      }
                      className='flex cursor-pointer items-center justify-center gap-x-2.5 p-3 font-semibold text-black hover:bg-gray-100 hover:dark:bg-slate-700'
                    >
                      {item.name}
                    </Box>
                  ))}
                </Box>
              </Box>
            }
          </Popover.Panel>
        </Transition>
      </Popover>
      <ViewNotification open={open} setOpen={setOpen} el={selected} />
    </>
  );
};
