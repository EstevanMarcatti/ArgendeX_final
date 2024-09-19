import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se os campos estão preenchidos
        if (!Email || !Senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8085/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email, Senha }),
            });
            const data = await response.json();

            console.log('Resposta do servidor:', data); // Verificar o que está sendo retornado

            if (data.erro) {
                setError(data.mensagem.error); // Atualizar a mensagem de erro
            } else {
                // Verificar se os dados retornados estão definidos
                if (data.mensagem.Email && data.mensagem.ID) {
                    localStorage.setItem('Email', data.mensagem.Email);
                    localStorage.setItem('ID', data.mensagem.ID);
                    navigate('/Appsite');
                } else {
                    setError('Dados de login inválidos.');
                }
            }
        } catch (error) {
            setError('Erro ao realizar login');
        }
    };

    return (
        <div id='back-login'>
            <div id='container-login'>
                <div className='login-box'>
                    <div className='inicio-login'>
                        <h2 id='inicial-login'>ArgendeX</h2>
                    </div>
                    <h1>Conecte-se e organize sua agenda.</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <p>{error}</p>}
                        <div className='user-box'>
                            <input
                                type='text'
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                id='email-login'
                                placeholder='Digite seu e-mail'
                            />
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className='user-box'>
                            <input
                                type='password'
                                value={Senha}
                                onChange={(e) => setSenha(e.target.value)}
                                name='password'
                                id='password-login'
                                placeholder='Digite sua senha'
                            />
                            <label htmlFor='password'>Senha</label>
                        </div>
                        <center>
                            <button type="submit" className='btn' id='button-login'>
                                Entrar
                                <span></span>
                            </button>
                        </center>
                        <div className='volta-login'>
                            <p id='volta1-login'>
                                Esqueceu sua senha?
                                <a id='text1-login' href='Esqsenha'>
                                    {' '}
                                   ----- clique aqui -----
                                </a>
                            </p>
                            <p id='volta2-login'>
                                Precisa de ajuda?
                                <a id='text1-login' href='Suporte'>
                                    {' '}
                                    Acesse nossa central de ajuda.
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
