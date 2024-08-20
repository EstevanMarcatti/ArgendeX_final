import React from 'react';
import { useNavigate } from 'react-router-dom';
import './delete_usuario.css'

function ExcluirConta() {
    const navigate = useNavigate();

    const excluirConta = () => {
        // Obter o ID do usuário do LocalStorage
        const userId = localStorage.getItem('ID');

        // Verificar se o ID do usuário existe
        if (userId) {
            // Enviar uma solicitação DELETE para excluir a conta
            fetch(`http://localhost:8085/delete_usuario/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (response.ok) {
                        alert('Conta excluída com sucesso');
                        navigate('/');
                    } else {
                        return response.json().then(errorData => {
                            throw new Error(errorData.erro || 'Erro ao excluir conta');
                        });
                    }
                })
                .catch(error => {
                    console.error('Erro ao excluir conta:', error);
                    alert('Erro ao excluir conta');
                });
        } else {
            alert('ID do usuário não encontrado no LocalStorage');
        }
    };

    return (
        <div id='back-delete'>
            <div id="container-delete">
                <div className="iniciodelete">
                    <h1 id='txtconta'>Apagar Conta</h1>
                    <hr />
                </div>
                <h2 id="text-delete">
                    Tem certeza que você quer Apagar sua conta, após clicar <br /> <b id="text1-delete">Não será possível recuperar sua Conta!</b>
                </h2>
                <button onClick={excluirConta} id="button-delete">Excluir Conta</button>
            </div>
        </div>
    );
}

export default ExcluirConta;
