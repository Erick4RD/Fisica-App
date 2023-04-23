import React, { useEffect } from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Center from './Center'
import useForm from '../hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router'

import './stylesComponents.css'

const getFreshModel = () => ({
  name: '',
  email: ''
})

export default function Login() {

  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate()

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(getFreshModel);

  useEffect(() => {
    resetContext()
  }, [])


  const login = e => {
    e.preventDefault();
    if (validate())
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then(res => {
          setContext({ participantId: res.data.participantId })
          navigate('/quiz')
        })
        .catch(err => console.log(err))
  }

  const validate = () => {
    let temp = {}
    temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Correo no valido."
    temp.name = values.name != "" ? "" : "Campo requerido."
    setErrors(temp)
    return Object.values(temp).every(x => x == "")
  }

  {/* <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '100%'
            }
          }}>
            
          </Box>
        </CardContent>
      </Card>
    </Center> */}

  return (

    <section style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      padding: '20px'
    }}>
      <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px 3px #0000006e", color: "#000" }}>
        <header>
          <Typography variant="h3" sx={{ my: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
              <img src="./atomo.png" alt="" style={{ height: '75px' }} />
              <span>FisicArena</span>
            </div>
          </Typography>
        </header>
        <form noValidate autoComplete="off" onSubmit={login}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <TextField
              label="Correo"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors.email && { error: true, helperText: errors.email })} />
            <TextField
              label="Nombre"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors.name && { error: true, helperText: errors.name })} />
          </div>

          <Button
            className='btn-sumit'
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: '100%' }}
            style={{ backgroundColor: '#038C8C', color: '#fff', fontWeight: 'bold', marginBottom: '15px' }}>Comenzar</Button>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="/Estudiar">Estudiar</a>
          </div>
        </form>
      </div>
    </section>



  )
}
