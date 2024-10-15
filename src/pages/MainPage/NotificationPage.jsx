import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'
import { NotificationsActive, Notifications, ChatBubble } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import clsx from 'clsx';

import { Title, ViewNotification } from '../../components'
import { useGetNotificationsQuery, useMarkNotiAsReadMutation } from '../../redux/slices/api/userApiSlice';

const ICONS = {
  alert: (
    <NotificationsActive className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
  message: (
    <ChatBubble className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  )
}

export const NotificationPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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
  return (
    <>
      <Box className="w-full md:px-1 px-0 mb-6">
        <Box className="flex items-center justify-between mb-8">
          <Title title="All Notifications" />
        </Box>
        <Box className="bg-white px-2 md:px-4 py-4">
          <Box className="overflow-x-auto">
            {data?.notice?.length > 0 ? (
              <Box className='p-4'>
                {data.notice.map((item, index) => (
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
          </Box>
        </Box>
      </Box>
      <ViewNotification open={open} setOpen={setOpen} el={selected} />
    </>
  )
}
