import React, { useState } from 'react'

import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux';

import { AddUser, Title } from '../../components'
import { getInitials } from '../../utils';
import { ChangePassword } from '../../components/Common/ChangePassword';

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  return (
    <>
      <Box className="w-full">
        <Box className="flex items-center justify-between mb-4">
          <Title title={"Profile User"} />
        </Box>
        <Box className="h-screen">
          <Container>
            <Grid container justifyContent="center">
              <Grid item xs={15} md={12} lg={10} xl={8}>
                <Card sx={{ borderRadius: '15px', mt: 5 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" textAlign="left">
                      <Box flexShrink={0}>
                        <Box className='relative inline-block text-left'>
                          <Box className='w-60 h-60 flex items-center justify-center rounded-full bg-blue-600'>
                            <Typography className='text-white font-semibold' sx={{ fontSize: "3.5rem" }}>
                              {getInitials(user?.name)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box flexGrow={1} ml={3}>
                        <Typography variant="h5" gutterBottom>
                          {user?.name}
                          {user?.isAdmin ?
                            <Chip label="Admin" color="primary" className='ml-3' /> : ""
                          }
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {user?.email}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {user?.role}
                        </Typography>

                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#efefef', borderRadius: '8px', p: 2, my: 2 }}>
                          <Typography variant="body2">
                            {user?.title}
                          </Typography>
                        </Box>

                        <Box display="flex" pt={1}>
                          <Button variant="outlined" fullWidth sx={{ mr: 1 }} onClick={() => setOpenPassword(true)}>
                            Change Password
                          </Button>
                          <Button variant="contained" fullWidth onClick={() => setOpen(true)}>
                            Edit Information
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <AddUser open={open} setOpen={setOpen} userData={user} />
      <ChangePassword open={openPassword} setOpen={setOpenPassword} />
    </>
  )
}