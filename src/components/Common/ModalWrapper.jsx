import { Fragment, useRef } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Box } from "@mui/material";

export const ModalWrapper = ({ open, setOpen, children }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10 w-full'
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Box className='fixed inset-0 bg-black bg-opacity-60 transition-opacity' />
        </Transition.Child>

        <Box className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <Box className='flex h-full items-center justify-center p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all pb-0 sm:my-8 sm:w-full sm:max-w-lg'>
                <Box className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <Box className='sm:flex sm:items-start'>
                    <Box className='w-full mt-3 sm:mt-0 sm:text-left'>
                      {children}
                    </Box>
                  </Box>
                </Box>
              </Dialog.Panel>
            </Transition.Child>
          </Box>
        </Box>
      </Dialog>
    </Transition.Root>
  );
};