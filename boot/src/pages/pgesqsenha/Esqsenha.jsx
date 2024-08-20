import './esqsenha.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecuperarSenha() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://10.135.60.8:8085/recuperarsenha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email }),
            });
            const data = await response.json();
            if (data.erro) {
                setError(data.erro);
            } else {
                navigate('/ConfirmacaoRecuperacao');
            }
        } catch (error) {
            setError('Erro ao tentar recuperar senha');
        }
    };

    return (
        <div id='back-recuperarsenha'>
            <div id='container-recuperarsenha'>
                <div className='recuperarsenha-box'>
                    <div className='inicio-recuperarsenha'>
                        <h2 id='inicial-recuperarsenha'>ArgendeX</h2>
                    </div>
                    <h1>Recupere sua senha</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <p>{error}</p>}
                        <div className='user-box'>
                            <input
                                type='text'
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                id='email-recuperarsenha'
                                placeholder='Digite seu e-mail'
                            />
                            <label htmlFor='email'>Email</label>
                        </div>
                        <center>
                            <button type="submit" className='btn' id='button-recuperarsenha'>
                                Enviar
                                <span></span>
                            </button>
                        </center>
                        <div className='volta-recuperarsenha'>
                            <p id='volta1-recuperarsenha'>
                                Lembrou sua senha?
                            </p>
                            <a id='text1-recuperarsenha' href='Login'>
                               ----- volte para o login -----
                               <span></span><span></span><span></span><span></span>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecuperarSenha;
