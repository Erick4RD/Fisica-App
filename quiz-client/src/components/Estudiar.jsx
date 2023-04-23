
import { CardMedia } from '@mui/material'
import './stylesComponents.css'

const arrTemas = [
  {
    titulo: "CARGA ELECTRICA - LEY DE COULOMB",
    imgName: 'tm6.png',
    page: 'tema1'
  },
  {
    titulo: "CAMPO ELECTRICO Y POTENCIAL ELECTRICO",
    imgName: 'tm5.png',
    page: 'tema2'
  },
  {
    titulo: "CAPACITANCIA - CONDENSADORES",
    imgName: 'tm8.png',
    page: 'tema3'
  },
  {
    titulo: "CORRIENTE ELECTRICA Y LA RESISTENCIA",
    imgName: 'tm3.png',
    page: 'tema4'
  },
  {
    titulo: "CAMPO MAGNETICO",
    imgName: 'tm1.png',
    page: 'tema5'
  },
  {
    titulo: "ECUACIONES DE MAXWELL Y ONDAS ELECTROMAGNETICAS",
    imgName: 'tm4.png',
    page: 'tema6'
  },
  {
    titulo: "CIRCUITOS DE CORRIENTE ALTERNA",
    imgName: 'tm2.png',
    page: 'tema7'
  },

]

export default function Estudiar() {
  return (
    <>
      <section className='section-estudiar' >

        {
          arrTemas.map(arrTema => {

            return (
              <div className='block-tema-estudio' >
                <div className='cardHead'>
                  <CardMedia
                    component="img"
                    sx={{ width: '85px', height: '85px', padding: '0' }}
                    image={`./${arrTema.imgName}`}
                  />
                  <h3>{arrTema.titulo}</h3>
                </div>
                <div className='block-btn-estudiar'>
                  <a href={`/Estudiar/${arrTema.page}`} className='btn-estudiar'>Estudiar</a>
                </div>
              </div>
            )
          })
        }


      </section>
      <div className='blockVolver'>
        <a className='btn-volver' href="/">Volver</a>
      </div>
    </>
  )
}
