
{/* 
    Alerta Componente
    Joao Gabriel
    08/11/2023 (ultima alteração)
    Descrição Detalhada :
        Componente onde contem uma função
        de nosso produto, onde adiciona um alerta 
        em cada lembrete
    Observações Pertinentes:
 */}


 

import './css_geral.css'

function Alerta() {
  return (
    <>
  <div>

<select class="select-estiloso">
<option>selecione um tempo para o alarme</option>
<option>5 minutos antes do compromisso </option>
<option>10 minutos antes do compromisso </option>
<option>15 minutos antes do compromisso </option>
<option>20 minutos antes do compromisso </option>
<option>30 minutos antes do compromisso </option>
<option>45 minutos antes do compromisso </option>
<option>60 minutos antes do compromisso</option>
</select>

  </div>
  </>
  )
}

export default Alerta;
