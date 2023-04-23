import { useParams } from "react-router-dom"

import './stylesComponents.css'
import { CardMedia } from "@mui/material"

export default function ResultEstudiar() {
  const { Page } = useParams()

  const arrVideo = [
    {
      title: "CARGA ELECTRICA - LEY DE COULOMB",
      name: 'tema1',
      video: <iframe style={{ width: '100%' }}  height="530" src="https://www.youtube.com/embed/Xv8111_iUqQ" title="Carga eléctrica y ley de Coulomb" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    },
    {
      title: "CAMPO ELECTRICO Y POTENCIAL ELECTRICO",
      name: 'tema2',
      video: <iframe style={{ width: '100%' }} height="530" src="https://www.youtube.com/embed/zuK7s_Tucsk" title="Física: Energía Potencial Eléctrica y Potencial Eléctrico (cargas puntuales) - Traful Utemvirtual" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    },
    {
      title: "CAPACITANCIA - CONDENSADORES",
      name: 'tema3',
      video: <iframe style={{ width: '100%' }} height="530" src="https://www.youtube.com/embed/kIqJrpVZZeE" title="Capacitor - Capacitancia" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    },
    {
      title: "CORRIENTE ELECTRICA Y LA RESISTENCIA",
      name: 'tema4',
      video: <iframe style={{ width: '100%' }} height="530" src="https://www.youtube.com/embed/YWrxPTsWioA" title="Física: Corriente Eléctrica y Resistencia - Traful Utemvirtual" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    },
    {
      title: "CAMPO MAGNETICO",
      name: 'tema5',
      video: <iframe style={{ width: '100%' }} height="530" src="https://www.youtube.com/embed/IZsldf1-LJs" title="Campo Magnético y Magnetismo de Física 2 Bachillerato Resumen Completo Para Sacar el 10 | FísicaPRO" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    },
    {
      title: "ECUACIONES DE MAXWELL Y ONDAS ELECTROMAGNETICAS",
      name: 'tema6',
      video: <iframe style={{ width: '100%' }} height="530" src="https://www.youtube.com/embed/kx20kG6m-JA" title="Las Ecuaciones de Maxwell en 5 Minutos" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    },
    {
      title: "CIRCUITOS DE CORRIENTE ALTERNA",
      name: 'tema7',
      video: <iframe style={{ width: '100%' }} height="530" src="https://www.youtube.com/embed/TMC7gidYPy8" title="¿Qué es la corriente alterna?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    },
  ]

  return (
    <>
      <section className="sectionResult">
        <div className="pageTema">
          <a href="/Estudiar">
            <div className="goback">
              <i style={{ fontSize: '20px', color: '#fff' }} className="fa-solid fa-arrow-left"></i>
            </div>
          </a>

          <div>
            <h2>
              {
                arrVideo.find(x => x.name == Page).title
              }
            </h2>
          </div>
          <div className="pageBody">
            {
              arrVideo.find(x => x.name == Page).video
            }
          </div>
        </div>
      </section>
    </>
  )
}