import React, { Fragment, useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material';
import { Listbox, Transition } from '@headlessui/react';
import { UnfoldMore, Check } from '@mui/icons-material';
import clsx from 'clsx';

import { getInitials } from '../../utils';
import { useGetTeamListQuery } from '../../redux/slices/api/userApiSlice';

export const UserList = ({ team, setTeam }) => {
  const { data, isLoading } = useGetTeamListQuery();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (su) => {
    setSelectedUsers(su);
    setTeam(su?.map((s) => s._id));
  };

  useEffect(() => {
    if (team?.length < 1) {
      data && setSelectedUsers([data[0]]);
    } else {
      setSelectedUsers(team);
      console.log(selectedUsers);
    }
  }, [isLoading])

  return (
    <Box>
      <Typography className='text-gray-700'>Assign Task To: </Typography>
      <Listbox
        value={selectedUsers}
        onChange={(el) => handleChange(el)}
        multiple
      >
        <Box className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'>
            <span className='block truncate'>
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>

            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <UnfoldMore
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {data?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4. ${active ? "bg-cyan-100 text-cyan-900" : "text-gray-900"
                    } `
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <Box className={clsx("flex items-center gap-2 truncate", selected ? "font-medium" : "font-normal")}>
                        <Box className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-fuchsia-600">
                          <span className='text-center text-[0.75rem]'>
                            {getInitials(user.name)}
                          </span>
                        </Box>
                        <span>{user.name}</span>
                      </Box>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600'>
                          <Check className='w-5 h-5' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Box>
      </Listbox>
    </Box>
  )
}
