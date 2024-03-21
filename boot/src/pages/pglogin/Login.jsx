import './login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginForm({ onLogin }) {
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
            if (response.ok) {
                // Salvar informações no localStorage
                localStorage.setItem('Email', data.Email)
                localStorage.setItem('ID', data.ID)
                // Chamar a função onLogin com o nome de usuário retornado
                onLogin(data.Email)
                console.log('Dados processados com sucesso!', response);
                navigate('/Appsite')
            } else {
                setError(data.error)
            }
        } catch (error) {
            setError('Erro ao realizar login')
        }
    }

    return (
        <div id='back-login'>
            <div id='container-login'>
                <div className='inicio-login'>
                    <a id='inicial-login' href=''>
                        ArgendeX
                    </a>
                </div>
                <h1>Conecte-se e organize sua agenda.</h1>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <div className='email-form-login'>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            type='email'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            name='email'
                            id='email-login'
                            placeholder='Digite seu e-mail'
                            data-min-length='8'
                            data-email-validate
                        />
                    </div>

                    <div className='form-box spacing-login'>
                        <label htmlFor='lastname'>Senha</label>
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
                    </div>

                    <div className='div-button'>
                        <button type='submit' id='button-login'>
                            Entrar
                        </button>
                    </div>

                    <div className='volta-login'>
                        <p id='volta1-login'>
                            Esqueceu sua senha?
                            <a id='text1-login' href='Esqsenha'>
                                {' '}
                                clique aqui
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
    )
}

export default LoginForm