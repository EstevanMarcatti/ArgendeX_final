
{/* 
    Anotação Componente
    Estevan
    08/11/2023 (ultima alteração)
    Descrição Detalhada :
        Componente onde contem uma função
        de nosso produto, onde mostra os 
        principais do usuario
    Observações Pertinentes:
 */}



import NavPerfil from "./NavPerfil"
          {/*o perfil de usuario */}
const usuario = [
  {
    assunto: "Festa de aniversario!",
    data: "Dia: 24/08/2023",
  },
  {
    assunto: "Jantar com a familia!",
    data: "Dia: 04/10/2023",
  },
  {
    assunto: "Reuniao de Negocios!",
    data: "Dia: 17/10/2023",
  }
]

function Anotacoes() {
  return (
    <>
      <div id="princlembr">
        {usuario.map(function (item) {
          return (
            <NavPerfil
              assunto={item.assunto}
              data={item.data}
            />
          )
        })}
      </div>

    </>
  )
}

export default Anotacoes