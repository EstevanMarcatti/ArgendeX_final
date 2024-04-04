import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cadastro.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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

        navigate('/Appsite');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  // Estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-container">
      <div id="back-cadastro">
        <div id="container-Cadastro">
          <div className="inicio-cadastro">
            <a id="inicial-cadastro" href="">
              ArgendeX
            </a>
          </div>
          <h2 id="text">
            Crie sua conta no <b id="text1-cadastro">ArgendeX</b>
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
              <label htmlFor="name">Nome Completo</label>
              <input type="text" name="nome" id="name-cadastro" placeholder="Digite seu nome" value={formValues.nome} onChange={handleChange} />
            </div>

            <div className="email-form">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email-cadastro" placeholder="Digite seu e-mail" value={formValues.email} onChange={handleChange} data-min-length="8"
                data-email-validate />
            </div>

            <div className="form-box spacing">
              <label htmlFor="senha">Senha</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="senha"
                  id="password-cadastro"
                  placeholder="Digite sua senha"
                  value={formValues.senha}
                  onChange={handleChange}
                />
                {/* Botão para alternar a visibilidade da senha */}
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-box spacing">
              <label htmlFor="cidade">Cidade</label>
              <input type="text" name="cidade" value={formValues.cidade} onChange={handleChange} placeholder="Digite sua cidade" />
            </div>

            <div className="form-box spacing">
              <label>
                Data de Nascimento:
              </label>
              <input
                type="date"
                name="dataNascimento"
                value={formValues.dataNascimento}
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="checkbox" name="agreement" id="agreement-cadastro" required />
              <label htmlFor="agreement" id="agreement-label-cadastro">Eu li e aceito os <a href="#" id='termos-cadastro'>termos de uso</a></label>
            </div>

            <div className="button-form" id="box-button-cadastro">
              <input id="btn-submit-cadastro" type="submit" value="Registrar" />
              <input id="button-cadastro" type="button" value="Cancelar" onClick="limpaForm()" />
            </div>

            <div className="volta-cadastro">
              <br />
              <p id="volta1-cadastro">Já tem conta no ArgendeX?<a id="text1-cadastro" href="Login"> Vá para a página de login</a></p>
              <p id="volta2-cadastro">Precisa de ajuda?<a id="text1-cadastro" href="Suporte"> Acesse nossa central de ajuda.</a></p>
            </div>
          </form>
        </div>
      </div>
      <p className="error-validation template"></p>
      <script src="../../js/jscadastro.js"></script>

    </div>
  );
};

export default App;