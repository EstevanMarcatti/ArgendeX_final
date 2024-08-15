import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cadastro.css';

const App = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        cidade: '',
        dataNascimento: '',
        senha: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const [mensagensErro, setMensagensErro] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch('http://10.135.60.8:8085/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const resultado = await resposta.json();

            if (resultado.erro) {
                // Exibe mensagens de erro
                console.error('Erro no servidor:', resultado.erro);
                setMensagensErro([resultado.erro]);
            } else {
                // Dados foram processados com sucesso
                console.log('Dados processados com sucesso!', resultado);
                navigate('/Appsite');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setMensagensErro(['Erro ao enviar dados']);
        }
    };

    // Estado para controlar a visibilidade da senha
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-container">
            <div id="back-cadastro">
                <div className='cadastro-box'>
                    <div className='inicio-cadastro'>
                        <h2 id='inicial-cadastro'>ArgendeX</h2>
                    </div>
                    <h2 id="text">
                        Crie sua conta e se organize melhor!
                    </h2>
                    {mensagensErro.length > 0 && (
                        <div style={{ color: 'red' }}>
                            <p>Erro ao processar os dados:</p>
                            <ul>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} id="register-form-cadastro">
                        <div className="user-box">
                            <input
                                type="text"
                                name="nome"
                                id="name-cadastro"
                                placeholder="Digite seu nome"
                                value={formValues.nome}
                                onChange={handleChange}
                            />
                            <label htmlFor="name">Nome Completo</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="email"
                                name="email"
                                id="email-cadastro"
                                placeholder="Digite seu E-mail"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">E-mail</label>
                        </div>

                        <div className="user-box">
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha"
                                    id="password-cadastro"
                                    placeholder="Digite sua senha"
                                    value={formValues.senha}
                                    onChange={handleChange}
                                />
                                <label htmlFor="senha">Senha</label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>

                        <div className="user-box">
                            <input
                                type="text"
                                name="cidade"
                                placeholder="Digite sua cidade"
                                value={formValues.cidade}
                                onChange={handleChange}
                            />
                            <label htmlFor="cidade">Cidade</label>
                        </div>

                        <div className="user-box">
                            <input
                                type="date"
                                name="dataNascimento"
                                value={formValues.dataNascimento}
                                onChange={handleChange}
                            />
                            <label>Data de Nascimento:</label>
                        </div>

                        <div>
                            <label className="checkbox-btn">
                                <input
                                    id="checkbox"
                                    type="checkbox"
                                    required
                                />
                                <span className="checkmark"></span>
                                <label htmlFor="checkbox">
                                    Eu li e aceito os <a href="#" id='termos-cadastro'>termos de uso</a>
                                </label>
                            </label>
                        </div>

                        <div className="button-form" id="box-button-cadastro">
                            <center>
                                <button type="submit" className="btn" id='button-cadastro'>
                                    Entrar
                                    <span></span>
                                </button>
                            </center>
                        </div>

                        <div className="volta-cadastro">
                            <br />
                            <p id="volta1-cadastro">
                                Já tem conta no ArgendeX?
                                <a id="text1-cadastro" href="Login">
                                    Vá para a página de login
                                </a>
                            </p>
                            <p id="volta2-cadastro">
                                Precisa de ajuda?
                                <a id="text1-cadastro" href="Suporte">
                                    Acesse nossa central de ajuda.
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;
