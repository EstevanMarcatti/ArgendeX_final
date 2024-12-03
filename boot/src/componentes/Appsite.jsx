import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from './Calendar/Calendar';
import BarraNavegacao from './BarraNavegacao';
import Pesquisa from './Pesquisa';
import Perfil from './Perfil';
import Horarios from './Horarios';
import Notificacoes from './Calendar/Notificacoes';
import NotificationToast from "./NotificationToast";
import './Appsite.css';

function App() {
  const [flutuantes, setFlutuantes] = useState([]);

  // Lógica para buscar notificações e atualizá-las
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8085/tasks/proximos")
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setFlutuantes(data);
          } else {
            // Limpa as notificações quando não houver dados
            setFlutuantes([]);
          }
        })
        .catch((error) => console.error("Erro ao buscar eventos próximos:", error));
    }, 5000); // Verifica a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const removeFlutuante = (id) => {
    setFlutuantes((prevFlutuantes) => prevFlutuantes.filter((alerta) => alerta.id !== id));
  };

  return (
    <div>
      {/* Menu principal */}
      <header>
        <BarraNavegacao />
        <Pesquisa />
        <Notificacoes />
        <Perfil />
      </header>
      <hr />
      {/* Fim do menu */}
      {/* Calendário */}
      <body>
        <Horarios />
        <Calendar />

        {/* Renderiza as notificações flutuantes somente se houver notificações */}
        {flutuantes.length > 0 && flutuantes.map((evento) => (
          <NotificationToast
            key={evento.id}
            titulo={evento.titulo}
            hora={evento.hora}
            onClose={() => removeFlutuante(evento.id)}
            position="bottom-right" // Define a posição das notificações
          />
        ))}
      </body>
    </div>
  );
}

export default App;
