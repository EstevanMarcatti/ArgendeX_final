import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './configconta.css';

const Configconta = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const ID = localStorage.getItem('ID');
        if (ID) {
            fetch(`http://localhost:8085/dados-usuario/${ID}`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        console.error('Erro ao obter dados do usuário:', data.erro);
                    } else {
                        setFormValues({
                            nome: data.nome || '',
                            email: data.email || '',
                            senha: data.senha || ''
                        });
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

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ID = localStorage.getItem('ID');

        try {
            const response = await fetch(`http://localhost:8085/atualizar-dados/${ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.mensagem);
                navigate('/Appsite');
            } else {
                const error = await response.json();
                console.error('Erro ao atualizar dados do usuário:', error.erro);
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
                            <label htmlFor="nome">Nome de Usuário</label>
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
                            <div style={{ position: 'relative' }}>
                                <input type={showPassword ? 'text' : 'password'} name="senha" id="password-configconta" placeholder="Digite sua senha" value={formValues.senha} onChange={handleChange} />
                                <span onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <br />
                        <div className="button-form" id="box-button-configconta">
                            <input id="btn-submit-configconta" type="submit" value="Atualizar" />
                            <input id="button-configconta" type="button" value="Cancelar" onClick={() => navigate('/Appsite')} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Configconta;
