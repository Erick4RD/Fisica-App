import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import useStateContext from '../hooks/useStateContext'
import { Card, CardContent, CardMedia, CardHeader, List, ListItemButton, Typography, Box, LinearProgress } from '@mui/material'
import { getFormatedTime } from '../helper'
import { useNavigate } from 'react-router'

import './stylesComponents.css'

export default function Quiz() {

  const [qns, setQns] = useState([])
  const [qnIndex, setQnIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const { context, setContext } = useStateContext()
  const navigate = useNavigate()

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken(prev => prev + 1)
    }, [1000])
  }

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("idsTema"))

    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then(res => {
        let preguntas = []
        ids.forEach((id) => {
          const newArr = res.data.filter(da => da.idTema === id)
          newArr.forEach(x => preguntas.push(x))
        })

        const randomPreguntas = [];

        const indices = []
        for (let i = 0; i < 10;) {
          const randomIndex = Math.floor(Math.random() * preguntas.length)
          if (indices.findIndex((indice) => indice === randomIndex) === -1) {
            indices.push(randomIndex)
            const randomElement = preguntas[randomIndex]
            randomPreguntas.push(randomElement)
            i++
          }

        }

        console.log({ randomPreguntas })
        setQns(randomPreguntas)
        startTimer()
      })
      .catch(err => { console.log(err); })

    return () => { clearInterval(timer) }
  }, [])

  const updateAnswer = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions]
    console.log(context.selectedOptions)
    temp.push({
      qnId,
      selected: optionIdx
    })
    if (qnIndex < 9) {
      setContext({ selectedOptions: [...temp] })
      setQnIndex(qnIndex + 1)
    }
    else {
      setContext({ selectedOptions: [...temp], timeTaken })
      navigate("/result")
    }
  }

  const flitrar = () => {

  }

  return (
    qns.length != 0
      ? <Card
        style={{ width: '80vw' }}
        sx={{
          '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
        }}>
        <CardHeader
          title={'Pregunta ' + (qnIndex + 1) + ' de 10'}
          action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />
        <Box>
          <LinearProgress variant="determinate" value={(qnIndex + 1) * 100 / 10} />
        </Box>
        {qns[qnIndex]?.imageName != null
          ? <CardMedia
            component="img"
            image={ './' + qns[qnIndex]?.imageName}
            sx={{ width: 'auto', m: '10px auto' }} />
          : null}
        <CardContent>
          <Typography variant="h6">
            {qns[qnIndex].qnInWords}
          </Typography>
          <List>
            {qns[qnIndex].options.map((item, idx) =>
              <ListItemButton disableRipple key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}>
                <div>
                  <b>{String.fromCharCode(65 + idx) + " . "}</b>{item}
                </div>

              </ListItemButton>
            )}

          </List>
        </CardContent>
      </Card>
      : null
  )
}
