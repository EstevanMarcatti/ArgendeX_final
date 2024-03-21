import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './configconta.css'




const Configconta = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
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

        <div>


            <div id='back-configconta'>
                <div id="container-configconta">
                    <div className="inicioconfigconta">
                        <h1 id='txtconta'>Configuraçao de Conta</h1>
                        <hr />
                    </div>
                    <h2 id="text-configconta">
                        Atualize sua conta no <b id="text1-configconta">ArgendeX</b>
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
                    <form onSubmit={handleSubmit} id="register-form-configconta">
                        <div className="form-box spacing-configconta">
                            <label for="name">Atualizar Nome de Usuario</label>
                            <input type="text" name="nome" id="name-configconta" placeholder="Digite seu novo nome de usuario"
                             value={formValues.nome} onChange={handleChange} />
                        </div>
                        <br />
                        <div className="email-form">
                            <label for="email">Atualizar E-mail</label>
                            <input type="email" name="email" id="email-configconta" placeholder="Digite seu novo e-mail"
                             value={formValues.email} onChange={handleChange} data-min-length="8"
                                data-email-validate />
                        </div>
                        <br />
                        <div className="form-box spacing">
                            <label for="senha">Atualizar Senha</label>
                            <input type="password" name="senha" id="password-configconta" placeholder="Digite sua nova senha"
                             value={formValues.senha} onChange={handleChange} />
                        </div>
                        <br />
                        <div className="button-form" id="box-button-configconta">
                            <input id="btn-submit-configconta" type="submit" value="Atualizar" />
                            <input id="button-configconta" type="button" value="Cancelar" onclick="limpaForm()" />
                        </div>

                    </form>
                </div>
            </div>
            <p className="error-validation template"></p>
            <script src="../../js/jscadastro.js"></script>
        </div>
    )
};

export default Configconta;
