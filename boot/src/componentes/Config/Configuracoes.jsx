import '../css_geral.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cards_config from './Cards_config';


function Configuracoes() {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      {values.map((v, idx) => (
        <Button key={idx} id='bttsup' onClick={() => handleShow(v)}>
          <p id='psup'>Configuracao</p>
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton data-bs-theme="dark" >
        <img src="https://thumbs2.imgbox.com/8f/f7/O2W2p42o_t.jpg" alt="" id='imgsup'/><Modal.Title id='titlesup'> Configuraçoes</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div id='cards_sup'>
          
        <Cards_config />

        </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Configuracoes;