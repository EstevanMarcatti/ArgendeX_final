import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Suporte from "./Suporte";
import Configuracoes from "../componentes/Config/Configuracoes";
import Feriados from "./Feriados";
import "./css_geral.css";

function BrandExample() {
  const [showFeriados, setShowFeriados] = useState(false);

  const handleCloseFeriados = () => setShowFeriados(false);
  const handleShowFeriados = () => setShowFeriados(true);

  return (
    <>
      {/* Home */}
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              src="https://thumbs2.imgbox.com/80/af/gTu9QUqn_t.png"
              alt=""
              id="button_menu"
            />
            Home
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />

      {/* Feriados */}
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={handleShowFeriados} style={{ cursor: "pointer" }}>
            <img
              src="https://thumbs2.imgbox.com/6a/f3/WGsE3bgv_t.png"
              alt=""
              id="button_menu"
            />
            Feriados
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />

      {/* Configurações */}
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              src="https://thumbs2.imgbox.com/ef/a2/3oUEMBtk_t.png"
              alt=""
              id="button_menu"
            />
            <Configuracoes />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />

      {/* Suporte */}
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              src="https://thumbs2.imgbox.com/43/63/8S6MlC98_t.png"
              alt=""
              id="button_menu"
            />
            <Suporte />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Modal de Feriados */}
      <Modal
        show={showFeriados}
        onHide={handleCloseFeriados}
        centered
        className="custom-modal"
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "#ffff",
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            Calendário de Feriados
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#000000",
            color: "#00ff00",
            textAlign: "center",
          }}
        >
          <Feriados />
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#000000",
            justifyContent: "center",
          }}
        >
          <Button
            variant="success"
            onClick={handleCloseFeriados}
            style={{
              backgroundColor: "#00ff00",
              color: "#000000",
              border: "2px solid #00ff00",
              borderRadius: "25px",
              padding: "12px 30px",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 0 10px #00ff00",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#000000";
              e.target.style.color = "#00ff00";
              e.target.style.boxShadow = "0 0 15px #00ff00";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#00ff00";
              e.target.style.color = "#000000";
              e.target.style.boxShadow = "0 0 10px #00ff00";
            }}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BrandExample;
