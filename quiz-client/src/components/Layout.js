import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import useStateContext from '../hooks/useStateContext'

export default function Layout() {
  const { resetContext } = useStateContext()
  const navigate = useNavigate()

  const logout = () => {
    resetContext()
    navigate("/")
  }

  return (
    <>
      <AppBar position="sticky" style={{ height: '10vh', display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'normal', backgroundColor: '#16252C' }}>
        <Toolbar >
          <Typography
            variant="h4"
            align="center"
            sx={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
              <img src="./atomo.png" alt="" style={{ height: '45px' }} />
              <span>FisicArena</span>
            </div>
          </Typography>
          <Button onClick={logout}>Salir</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Outlet />
      </Container>
    </>
  )
}
