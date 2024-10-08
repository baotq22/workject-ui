import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Edit, Add, ContentCopy, MoreVert, Delete } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Menu, Transition } from '@headlessui/react';
import { AddTaskModal, AddSubTaskModal, ConfirmationDialog } from '../../components';

export const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const duplicateHandler = () => { };
  const deleteClicks = () => { };
  const deleteHandler = () => { };

  const items = [
    {
      label: "Open Task",
      icon: <FolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit",
      icon: <Edit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <Add className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <ContentCopy className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => duplicateHandler(),
    },
  ];

  return (
    <>
      <Box>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 '>
            <MoreVert />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black/5 z-50 focus:outline-none'>
              <Box className='py-1 px-1 space-y-2'>
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${active ? "bg-blue-500 text-white" : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Box>
              <Box className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => deleteClicks()}
                      className={`${active ? "bg-blue-500 text-white" : "text-red-900 dark:text-red-400"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Delete
                        className='mr-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </Box>
            </Menu.Items>
          </Transition>
        </Menu>
      </Box>
      <AddTaskModal open={openEdit} setOpen={setOpenEdit} task={task} key={new Date().getTime()} />
      <AddSubTaskModal open={open} setOpen={setOpen} />
      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} />
    </>
  )
}
