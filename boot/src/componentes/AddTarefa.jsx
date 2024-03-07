
{/* 
    Add Tarefa Componente
    Estevan
    08/11/2023 (ultima alteração)
    Descrição Detalhada :
        Componente onde contem uma função
        de nosso produto, onde adiciona tarefa 
        de acordo com o dia e hora
    Observações Pertinentes:
 */}



 import React, { useState } from 'react';
 import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form';
 import Modal from 'react-bootstrap/Modal';
 import { useTarefaContext } from './TarefaContext';
 import Impor from './Impor';
 import Alerta from './Alerta';
 import Data from './Data';
 import Bttcompartilhar from './Bttcompartilhar';
 
 function AddTarefa() {
   const { adicionarTarefa } = useTarefaContext();
   const [show, setShow] = useState(false);
 
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
 
   const handleSave = () => {
     // Lógica para obter os dados da tarefa
     const novaTarefa = { /* ...dados da tarefa */ };
 
     // Adiciona a tarefa ao contexto
     adicionarTarefa(novaTarefa);
 
     handleClose(); // Fecha o modal após salvar
   };
 
   return (
     <>
       <Button variant="primary" onClick={handleShow} id='buttonlembrete'>
         Adicionar <br /> Tarefa
       </Button>
 
       <Modal show={show} onHide={handleClose}>
         <Modal.Header id='headermodal'>
           <Modal.Title>Adicionar Tarefa</Modal.Title>
         </Modal.Header>
         <Modal.Body id='bodymodal'>
           <Form>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               {/* ... */}
             </Form.Group>
 
             <Data />
 
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Titulo</Form.Label>
               <Form.Control type="text" />
               <Bttcompartilhar />
             </Form.Group>
 
             <Alerta />
             <Impor />
 
             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>Descrição</Form.Label>
               <Form.Control as="textarea" rows={3} />
             </Form.Group>
           </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="" onClick={handleClose} id='bttcancelar'>
             Cancelar
           </Button>
           <Button variant="" onClick={handleSave} id='bttsalvar'>
             Salvar
           </Button>
         </Modal.Footer>
       </Modal>
     </>
   );
 }
 
 export default AddTarefa;
 