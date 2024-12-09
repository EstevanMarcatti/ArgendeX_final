import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alertas from "./Alertas"; // Importar o componente Alertas
import "../css_geral.css";

function AddTarefa() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} id="buttonlembrete" className="notification-button">
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32" // Tamanho reduzido
            height="32" // Tamanho reduzido
            fill="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
          </svg>
        </div>
        <div className="text-container">Notificações</div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="headermodal">
          <Modal.Title>Notificações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Exibindo as notificações */}
          <Alertas />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddTarefa;
