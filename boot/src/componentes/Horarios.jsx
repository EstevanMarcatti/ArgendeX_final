{/* 
    Horario Componente (calendario)
    Estevan
    18/10/2023 (ultima alteração)
    Descrição Detalhada :
     esse componente consiste em uma coluna 
     de horarios na lateral esquerda da pagina 
     principal
    Observações Pertinentes:
 */}

import './css_geral.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import TodayHeader from "./TodayHeader";
import Add from './Add'
{/*scrool lateral dos horários*/}
const horarios =[
    {
        hora00:"00:00",
        hora15:"00:15",
        hora30:"00:30",
        hora45:"00:45",
    },
    {
        hora00:"01:00",
        hora15:"01:15",
        hora30:"01:30",
        hora45:"01:45",
    },
    {
        hora00:"02:00",
        hora15:"02:15",
        hora30:"02:30",
        hora45:"02:45",
    },
    {
        hora00:"03:00",
        hora15:"03:15",
        hora30:"03:30",
        hora45:"03:45",
    },
    {
        hora00:"04:00",
        hora15:"04:15",
        hora30:"04:30",
        hora45:"04:45",
    },
    {
        hora00:"05:00",
        hora15:"05:15",
        hora30:"05:30",
        hora45:"05:45",
    },
    {
        hora00:"06:00",
        hora15:"06:15",
        hora30:"06:30",
        hora45:"06:45",
    },
    {
        hora00:"07:00",
        hora15:"07:15",
        hora30:"07:30",
        hora45:"07:45",
    },
    {
        hora00:"08:00",
        hora15:"08:15",
        hora30:"08:30",
        hora45:"08:45",
    },
    {
        hora00:"09:00",
        hora15:"09:15",
        hora30:"09:30",
        hora45:"09:45",
    },
    {
        hora00:"10:00",
        hora15:"10:15",
        hora30:"10:30",
        hora45:"10:45",
    },
    {
        hora00:"11:00",
        hora15:"11:15",
        hora30:"11:30",
        hora45:"11:45",
    },
    {
        hora00:"12:00",
        hora15:"12:15",
        hora30:"12:30",
        hora45:"12:45",
    },
    {
        hora00:"13:00",
        hora15:"13:15",
        hora30:"13:30",
        hora45:"13:45",
    },
    {
        hora00:"14:00",
        hora15:"14:15",
        hora30:"14:30",
        hora45:"14:45",
    },
    {
        hora00:"15:00",
        hora15:"15:15",
        hora30:"15:30",
        hora45:"15:45",
    },
    {
        hora00:"16:00",
        hora15:"16:15",
        hora30:"16:30",
        hora45:"16:45",
    },
    {
        hora00:"17:00",
        hora15:"17:15",
        hora30:"17:30",
        hora45:"17:45",
    },
    {
        hora00:"18:00",
        hora15:"18:15",
        hora30:"18:30",
        hora45:"18:45",
    },
    {
        hora00:"19:00",
        hora15:"19:15",
        hora30:"19:30",
        hora45:"19:45",
    },
    {
        hora00:"20:00",
        hora15:"20:15",
        hora30:"20:30",
        hora45:"20:45",
    },
    {
        hora00:"21:00",
        hora15:"21:15",
        hora30:"21:30",
        hora45:"21:45",
    },
    {
        hora00:"22:00",
        hora15:"22:15",
        hora30:"22:30",
        hora45:"22:45",
    },
    {
        hora00:"23:00",
        hora15:"23:15",
        hora30:"23:30",
        hora45:"23:45",
    },

]

export default function Horarios() {
    return (
        <div>
            <TodayHeader/>
            <div id='styleHorario'>
                
                <Navbar  id='sephora'>
                    <Container id='containerhora'>
                        <Navbar.Brand href="" id='horas'>
                            {horarios.map(function (item) {
                                return (

                                    <Add
                                    hora00={item.hora00}
                                    hora15={item.hora15}
                                    hora30={item.hora30}
                                    hora45={item.hora45}
                                    />
                                )
                            }
                            )}
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}