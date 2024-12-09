import React, { useEffect, useState } from "react";
import NotificationToast from "../NotificationToast";

function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [flutuantes, setFlutuantes] = useState([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const response = await fetch("http://localhost:8085/tasks/proximos");
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        const data = await response.json();
        console.log("Notificações recebidas:", data);

        if (data.length > 0) {
          setAlertas(data);
          setFlutuantes(data); // Atualiza notificações flutuantes
        } else {
          setAlertas([]);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos próximos:", error);
      }
    };

    const interval = setInterval(fetchAlertas, 60000); // Verificar a cada 60 segundos
    fetchAlertas(); // Busca inicial

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
          onClose={() => removeFlutuante(evento.id)}
          position="bottom-right"
        />
      ))}

      {/* Notificações no Modal */}
      <div>
        {alertas.length > 0 ? (
          alertas.map((evento) => (
            <div key={evento.id} style={{ marginBottom: "10px", color: "red" }}>
              <strong>{evento.titulo}</strong> - {evento.hora}
            </div>
          ))
        ) : (
          <p style={{ color: "#A0A0A0" }}>Nenhuma notificação no momento.</p> /* Cor cinza claro */
        )}
      </div>
    </>
  );
}

export default Alertas;
