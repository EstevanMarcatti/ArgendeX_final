{/* 
    Importancia Componente (calendario)
    Joao Gabriel
    08/11/2023 (ultima alteração)
    Descrição Detalhada :
        Parte de nivel de importancia de
        cada tarefa adicionada
    Observações Pertinentes:
 */}



import './css_geral.css'

function Impor() {
  return (
    <>
  <div>

<select class="select-estiloso">
    <option> Nível de Importancia </option>
    <option> Pouca Importancia </option>
    <hr />
    <option> Razoávelmente Importante</option>
    <hr />
    <option> Muito Importante </option>
</select>

  </div>
  </>
  )
}

export default Impor;
