import React, { useEffect } from "react";
import "./css_geral.css";

function NotificationToast({ titulo, hora, onClose, position = "bottom-right" }) {
  // Fecha a notificação automaticamente após 1 minuto (60.000 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Chama a função de fechamento após 1 minuto
    }, 60000);

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, [onClose]);

  const positions = {
    "bottom-right": { bottom: "20px", right: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "top-left": { top: "20px", left: "20px" },
  };

  return (
    <div style={{ ...styles.toast, ...positions[position] }}>
      <p><strong>Falta 1 minuto para o evento!</strong></p>
      <p>
        <strong>{titulo}</strong> - {hora}
      </p>
      <button style={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
}

// Estilos do componente
const styles = {
  toast: {
    position: "fixed",
    backgroundColor: "#007bff",
    color: "white",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    minWidth: "250px",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    position: "absolute",
    top: "5px",
    right: "10px",
    cursor: "pointer",
  },
};

export default NotificationToast;
