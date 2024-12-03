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
      <Button variant="primary" onClick={handleShow} id="buttonlembrete">
        Notificações
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
