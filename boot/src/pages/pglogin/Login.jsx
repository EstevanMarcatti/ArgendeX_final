
import './login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('')
    const [Senha, setSenha] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email, Senha }),
            })
            const data = await response.json()
            if (data.erro) {

                console.log('Erro!', data);
                setError(data.error)


            } else {
                console.log('Dados processados com sucesso!', data);
                // Salvar informações no localStorage
                localStorage.setItem('Email', data.mensagem.Email)
                localStorage.setItem('ID', data.mensagem.ID)
                // Chamar a função onLogin com o nome de usuário retornado

                navigate('/Appsite')
            }
        } catch (error) {
            setError('Erro ao realizar login')

        }
    }

    return (
        <div id='back-login'>
            <div id='container-login'>
                <div class="login-box">

                    <div className='inicio-login'>

                        <h2 id='inicial-login'>ArgendeX</h2>
                    </div>
                    <h1>Conecte-se e organize sua agenda.</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <p>{error}</p>}
                        <div class="user-box">
                            <input
                                type='text'
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                id='email-login'
                                placeholder='Digite seu e-mail'
                                data-min-length='8'
                                data-email-validate
                            />
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div class="user-box">
                            <input
                                type='password'
                                value={Senha}
                                onChange={(e) => setSenha(e.target.value)}
                                name='password'
                                id='password-login'
                                placeholder='Digite sua senha'
                                data-password-validate
                                data-required
                            />
                            <label htmlFor='lastname'>Senha</label>
                        </div><center>

                            <a href="#">
                                <button type="submit" class="btn" id='button-login'>
                                    Entrar
                                    <span></span>
                                </button>

                            </a></center>
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
    )
}

export default LoginForm