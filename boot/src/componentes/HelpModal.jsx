import React, { useState } from 'react';
import './css_geral.css' // Importar o arquivo CSS para os estilos do HelpModal

const HelpModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para abrir o modal
    const openModal = () => setIsModalOpen(true);

    // Função para fechar o modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Ícone de ajuda */}
            <div id="help-icon" className="help-icon" onClick={openModal}>
                <span>?</span>
            </div>

            {/* Modal de ajuda */}
            {isModalOpen && (
                <div id="help-modal" className="help-modal">
                    <div className="modal-content">
                        <span id="close-btn" className="close-btn" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Como usar a Agenda de Tarefas</h2>
                        <p>Bem-vindo à sua agenda de tarefas! Aqui você pode adicionar, editar e excluir tarefas com facilidade.</p>
                        <p>Para começar, clique em "Adicionar Tarefa" no menu e insira os detalhes da sua tarefa.</p>
                        <p>Você também pode marcar tarefas como concluídas ou deletá-las clicando nos ícones ao lado de cada tarefa.</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default HelpModal;
