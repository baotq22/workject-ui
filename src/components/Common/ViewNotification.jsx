import React from 'react'

import { Box, Button, Typography } from '@mui/material'
import { Dialog } from '@headlessui/react'

import { ModalWrapper } from './ModalWrapper'

export const ViewNotification = ({open, setOpen, el}) => {
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <Box className="py-4 w-full flex flex-col gap-4 items-center justify-center">
          <Dialog.Title as="h3" className='font-semibold text-lg'>
            {el?.task?.title}
          </Dialog.Title>

          <Typography className='text-start text-gray-500 dark:text-white'>{el?.text}</Typography>

          <Button onClick={() => setOpen(false)} variant='contained' color='success'>
            OK
          </Button>
        </Box>
      </ModalWrapper>
    </>
  )
}