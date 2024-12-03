import React, { useEffect, useState } from "react";
import NotificationToast from "../NotificationToast";

function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [flutuantes, setFlutuantes] = useState([]);

  useEffect(() => {
    const fetchAlertas = () => {
      fetch("http://localhost:8085/tasks/proximos")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Notificações recebidas:", data); // Adicione logs para verificar os dados recebidos
          if (data.length > 0) {
            setAlertas(data);
            setFlutuantes(data); // Atualiza as notificações flutuantes
          } else {
            setAlertas([]);
          }
        })
        .catch((error) => console.error("Erro ao buscar eventos próximos:", error));
    };
  
    const interval = setInterval(fetchAlertas, 5000); // Verificar a cada 5 segundos
    fetchAlertas(); // Busca inicial imediata
  
    return () => clearInterval(interval);
  }, []);

  const removeFlutuante = (id) => {
    setFlutuantes((prevFlutuantes) => prevFlutuantes.filter((alerta) => alerta.id !== id));
  };

  return (
    <>
      {/* Notificações Flutuantes */}
      {flutuantes.map((evento) => (
        <NotificationToast
        key={evento.id}
        titulo={evento.titulo}
        hora={evento.hora}
        onClose={() => removeFlutuante(evento.id)} // Certifique-se de que essa função está definida no componente pai
        position="bottom-right"
      />
      ))}

      {/* Notificações no Modal */}
      <div>
        {alertas.length > 0 ? (
          alertas.map((evento) => (
            <div key={evento.id} style={{ marginBottom: "10px" }}>
              <strong>{evento.titulo}</strong> - {evento.hora}
            </div>
          ))
        ) : (
          <p>Nenhuma notificação no momento.</p>
        )}
      </div>
    </>
  );
}

export default Alertas;
