
import { useState } from 'react'
import './stylesComponents.css'
import { useNavigate } from 'react-router-dom'


export default function QuizTematicas() {
  const navigate = useNavigate()

  const arrTemas = [
    {
      titulo: 'CARGA ELECTRICA - LEY DE COULOMB',
      id: '1',
      isChecked: false
    },
    {
      titulo: 'CAMPO ELECTRICO Y POTENCIAL ELECTRICO',
      id: '2',
      isChecked: true
    },
    {
      titulo: 'CAPACITANCIA - CONDENSADORES',
      id: '3',
      isChecked: false
    },
    {
      titulo: 'CORRIENTE ELECTRICA Y LA RESISTENCIA',
      id: '4',
      isChecked: false
    },
    {
      titulo: 'CAMPO MAGNETICO',
      id: '5',
      isChecked: false
    },
    {
      titulo: 'ECUACIONES DE MAXWELL Y ONDAS ELECTROMAGNETICAS',
      id: '6',
      isChecked: false
    },
    {
      titulo: 'CIRCUITOS DE CORRIENTE ALTERNA',
      id: '7',
      isChecked: false
    },
  ]

  // const { temasSele, setTemasSele } = useState([])

  let temasSele = []

  return (
    <>
      <section className='sectionQuizTematicas'>
        <div className='blockTitle'>
          <h3 style={{ margin: 0 }}>Temas Disponibles</h3>
        </div>
        <div>
          <button
            className='btn btn-iniciar'
            onClick={() => {
              temasSele.length = 0
              const checks = document.querySelectorAll('.opcionCheck')
              checks.forEach(check => {
                check.checked = true
                temasSele.push(parseInt(check.id))
              })

              console.log(temasSele)
            }}
          >Marcar Todos</button>
        </div>

        <div className="pageQuizTematicas">
          <div>
            {
              arrTemas.map(tema => {
                return (
                  <div className='opcionTema' key={tema.id}>
                    <input
                      className='opcionCheck'
                      type="checkbox"
                      id={tema.id}
                      onChange={(e) => {
                        const rest = temasSele.findIndex(sele => parseInt(sele) === parseInt(e.target.id))

                        if (rest !== -1) {
                          const newArr = temasSele.filter(sel => parseInt(sel) !== parseInt(e.target.id))
                          temasSele = [...newArr]
                        } else {
                          temasSele.push(parseInt(e.target.id))
                        }

                        console.log(temasSele)
                      }}
                    />
                    <label htmlFor={tema.id} className='label-tema'>{tema.titulo}</label>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className='block-btn-iniciar'>
          <a className='btn-iniciar' onClick={() => {
            localStorage.setItem("idsTema", JSON.stringify(temasSele))
            navigate('/quiz')
          }}>Iniciar</a>
        </div>
      </section>
    </>
  )
}
