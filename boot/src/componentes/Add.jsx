import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TodayHeader from './TodayHeader';
import './css_geral.css';

function Add(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Recupera o ID do usuário do localStorage assim que o componente é montado
  useEffect(() => {
    const id = localStorage.getItem('ID');
    if (id) {
      setUserId(Number(id)); // Converte para número, se necessário
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    if (!userId) {
      console.error('ID do usuário não encontrado.');
      return;
    }

    // Dados para enviar ao backend
    const data = {
      title,
      description,
      date: new Date().toISOString().split('T')[0], // Data de hoje
      time: props.hora15, // Horário selecionado (exemplo, pode ser adaptado)
      user_id: userId,
    };

    try {
      const response = await fetch('http://localhost:8085/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar a tarefa');
      }

      const result = await response.json();
      console.log('Tarefa salva:', result);

      // Mostrar a mensagem de confirmação
      setShowConfirmation(true);

      // Ocultar a mensagem de confirmação e atualizar a página após 2 segundos
      setTimeout(() => {
        setShowConfirmation(false);
        window.location.reload();
      }, 2000);

      // Fecha o modal após salvar
      setShow(false);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
      
    <>
      {/* Mensagem de confirmação */}
      {showConfirmation && (
        <div className="confirmation-container">
          <p className="confirmation-text">Tarefa adicionada com sucesso!</p>
        </div>
      )}

      {/* Interface de seleção de hora */}
      <div id='propshora'>
        <div id='duplahora'>
          <Button variant="primary" onClick={handleShow} id='butthora'>
            {props.hora00}
          </Button>
          <Button variant="primary" onClick={handleShow} id='butthora'>
            {props.hora15}
          </Button>
        </div>
        <div>
          <Button variant="primary" onClick={handleShow} id='butthora'>
            {props.hora30}
          </Button>
          <Button variant="primary" onClick={handleShow} id='butthora'>
            {props.hora45}
          </Button>
        </div>
      </div>

      {/* Modal para adicionar a tarefa */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title id='addtarefa'>Adicionar Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} id='bttcancelar'>
            Cancelar
          </Button>
          <Button variant="dark" onClick={handleSave} id='bttsalvar'>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
