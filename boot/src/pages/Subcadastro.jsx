import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';





const App = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha: '',
        confsenha: '',

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
            const resposta = await fetch('http://localhost:5000/receber-dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const resultado = await resposta.json();

            if (resultado.erro) {
                // Exibe mensagens de erro no console.log ou em algum local visível
                console.error('Erro no servidor:', resultado.mensagens);

                // Atualiza o estado com as mensagens de erro para exibição no formulário
                setMensagensErro(resultado.mensagens);
            } else {
                // Dados foram processados com sucesso
                console.log('Dados processados com sucesso!', resposta);

                navigate('/Appsite')
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (

        <div className="form-container">


            <div id='back-cadastro'>
                <div id="container-Cadastro">
                    <div className="inicio-cadastro">
                        <a id="inicial-cadastro" href="">ArgendeX</a >
                    </div>
                    <h2 id="text">
                        atuazelar sua conta no <b id="text1-cadastro">ArgendeX</b>
                    </h2>
                    {mensagensErro.length > 0 && (
                        <div style={{ color: 'red' }}>
                            <p>Erro ao processar os dados:</p>
                            <ul>
                                {mensagensErro.map((mensagem, index) => (
                                    <li key={index}>{mensagem.mensagem}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} id="register-form-cadastro">
                        <div className="form-box spacing-cadastro">
                            <label for="name">Nome Completo</label>
                            <input type="text" name="nome" id="name-cadastro" placeholder="Digite seu nome" value={formValues.nome} onChange={handleChange} />
                        </div>

                        <div className="email-form">
                            <label for="email">E-mail</label>
                            <input type="email" name="email" id="email-cadastro" placeholder="Digite seu e-mail" value={formValues.email} onChange={handleChange} data-min-length="8"
                                data-email-validate />
                        </div>

                        <div className="form-box spacing">
                            <label for="senha">Senha</label>
                            <input type="password" name="senha" id="password-cadastro" placeholder="Digite sua senha" value={formValues.senha} onChange={handleChange} />
                        </div>

                        <div className="form-box spacing">
                            <label for="senha">Confirmar Senha</label>
                            <input type="password" name="confsenha" id="password-cadastro" placeholder="Digite sua senha" value={formValues.senha} onChange={handleChange} />
                        </div>

                        <div className="button-form" id="box-button-cadastro">
                            <input id="btn-submit-cadastro" type="submit" value="Atualizar" />
                            <input id="button-cadastro" type="button" value="Cancelar" onclick="limpaForm()" />
                        </div>

                    </form>
                </div>
            </div>
            <p className="error-validation template"></p>
            <script src="../../js/jscadastro.js"></script>
        </div>
    )
};

export default App;
