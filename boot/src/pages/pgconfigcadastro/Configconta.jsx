import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './configconta.css';

const Configconta = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    useEffect(() => {
        const ID = localStorage.getItem('ID'); // Alterado para 'ID'
        if (ID) {
            fetch(`http://localhost:5000/dados-usuario/${ID}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setFormValues(data);
                    } else {
                        console.error('Usuário não encontrado.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao obter dados do usuário:', error);
                });
        } else {
            console.error('ID do usuário não encontrado no localStorage.');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/atualizar-dados/${localStorage.getItem('ID')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });

            if (response.ok) {
                console.log('Dados atualizados com sucesso!');
                navigate('/Appsite');
            } else {
                console.error('Erro ao atualizar dados do usuário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <div>
            <div id='back-configconta'>
                <div id="container-configconta">
                    <div className="inicioconfigconta">
                        <h1 id='txtconta'>Configuração de Conta</h1>
                        <hr />
                    </div>
                    <h2 id="text-configconta">
                        Atualize sua conta no <b id="text1-configconta">ArgendeX</b>
                    </h2>
                    <form onSubmit={handleSubmit} id="register-form-configconta">
                        <div className="form-box spacing-configconta">
                            <label htmlFor="name">Nome de Usuário</label>
                            <input type="text" name="nome" id="name-configconta" placeholder="Digite seu nome de usuário" value={formValues.nome} onChange={handleChange} />
                        </div>
                        <br />
                        <div className="email-form">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email-configconta" placeholder="Digite seu email" value={formValues.email} onChange={handleChange} />
                        </div>
                        <br />
                        <div className="form-box spacing">
                            <label htmlFor="senha">Senha</label>
                            <input type="password" name="senha" id="password-configconta" placeholder="Digite sua senha"  value={formValues.senha} onChange={handleChange} />
                        </div>
                        <br />
                        <div className="button-form" id="box-button-configconta">
                            <input id="btn-submit-configconta" type="submit" value="Atualizar" />
                            <input id="button-configconta" type="button" value="Cancelar" onClick={() => {}} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Configconta;
