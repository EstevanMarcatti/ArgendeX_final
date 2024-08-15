import './login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://10.135.60.8:8085/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email, Senha }),
            });
            const data = await response.json();
            if (data.erro) {
                console.log('Erro!', data);
                setError(data.erro);
            } else {
                console.log('Dados processados com sucesso!', data);
                // Salvar informações no localStorage
                localStorage.setItem('Email', data.Email);
                localStorage.setItem('ID', data.ID);
                // Navegar para a página desejada
                navigate('/Appsite');
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
