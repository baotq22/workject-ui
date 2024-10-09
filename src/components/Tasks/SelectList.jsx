import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { UnfoldMore, Check } from '@mui/icons-material';
import { Box } from '@mui/material';

export const SelectList = ({label, lists, selected, setSelected}) => {
  return (
    <Box className='w-full'>
      {label && <p className='text-slate-900 dark:text-white'>{label}</p>}

      <Listbox value={selected} onChange={setSelected}>
        <Box className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded bg-white dark:bg-slate-700 dark:border-slate-800 pl-3 pr-10 text-left px-3 py-3.5 border border-gray-300 sm:text-sm'>
            <span className='block truncate dark:text-white'>{selected}</span>
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
            <Listbox.Options className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 dark:border-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {lists.map((list, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-cyan-100 text-cyan-900" : "text-gray-900 dark:text-white"
                    }`
                  }
                  value={list}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {list}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600'>
                          <Check className='h-5 w-5' aria-hidden='true' />
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