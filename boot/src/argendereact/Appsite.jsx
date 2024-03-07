import 'bootstrap/dist/css/bootstrap.min.css'
import Calendar from './Calendar/Calendar'
import BarraNavegacao from './BarraNavegacao'
import Pesquisa from './Pesquisa'
import Perfil from './Perfil'
import Horarios from './Horarios'
import AddTarefa from './Calendar/AddTarefa'



import './Appsite.css'

function App() {

  return (

    <div>
      {/*menu principal */}
      <header>
      <BarraNavegacao/>
      <Pesquisa/>
      <AddTarefa />
      <Perfil />
      </header>
      <hr />
      {/*fim do menu */}
      {/*calendario */}
      <body>
        <Horarios />
        <Calendar/>
      </body>
    
    </div>
    
  )
}

export default App
