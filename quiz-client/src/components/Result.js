import { Alert, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { getFormatedTime } from '../helper';
import useStateContext from '../hooks/useStateContext'
import { green } from '@mui/material/colors';
import Answer from './Answer';

export default function Result() {
  const { context, setContext } = useStateContext()
  const [score, setScore] = useState(0)
  const [qnAnswers, setQnAnswers] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qnId)
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then(res => {
        const qna = context.selectedOptions
          .map(x => ({
            ...x,
            ...(res.data.find(y => y.qnId == x.qnId))
          }))
        setQnAnswers(qna)
        calculateScore(qna)

      })
      .catch(err => console.log(err))
  }, [])

  const calculateScore = qna => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0)
    setScore(tempScore)
  }

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    navigate("/quiz")
  }

  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken
      })
      .then(res => {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 4000);
      })
      .catch(err => { console.log(err) })
  }

  return (
    <>
      <Card sx={{ display: 'flex', width: '100%', height: '25vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ display: 'flex', flex: '1 0 auto', textAlign: 'center', justifyContent: 'center', position: 'relative', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h4">Fin del cuentionario!</Typography>
            <Typography variant="h6">
              TU PUNTUACIÓN
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>/10
            </Typography>
            <Typography variant="h6">
              Tiempo {getFormatedTime(context.timeTaken) + ' mins'}
            </Typography>

            <div style={{marginTop: '10px'}}>
              <Button variant="contained"
                sx={{ mx: 1, backgroundColor: '#038C8C', color: '#fff', height: '2.5rem' }}
                size="small"
                onClick={submitScore}>
                Entregar
              </Button>
              <Button variant="contained"
                sx={{ mx: 1, backgroundColor: '#038C8C', color: '#fff', height: '2.5rem' }}
                size="small"
                onClick={restart}>
                Intentar de nuevo
              </Button>
            </div>


            <Alert
              severity="success"
              variant="string"
              sx={{

                m: 'auto',
                visibility: showAlert ? 'visible' : 'hidden',
                position: 'absolute',
                bottom: '10px',
                left: 0
              }}>
              Puntuación actualizada.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 220 }}
          image="./result.png"
        />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  )
}
