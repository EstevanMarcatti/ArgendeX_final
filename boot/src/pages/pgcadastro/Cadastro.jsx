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
                  <li key={index}>{mensagem.mensagem}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} id="register-form-cadastro">
            <div class="user-box">
              <input type="text" name="nome" id="name-cadastro" placeholder="Digite seu nome" value={formValues.nome} onChange={handleChange} />
              <label htmlFor="name">Nome Completo</label>
            </div>

            <div className="user-box">
              <input  name="email" id="email-cadastro" placeholder="Digite seu E-mail" value={formValues.email} onChange={handleChange} />
              <label htmlFor="email">Nome Completo</label>
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
                {/* Botão para alternar a visibilidade da senha */}


              </div>
            </div>

            <div className="user-box">
              <input type="text" name="cidade" value={formValues.cidade} onChange={handleChange} placeholder="Digite sua cidade" />
              <label htmlFor="cidade">Cidade</label>
            </div>

            <div className="user-box">

              <input
                type="date"
                name="dataNascimento"
                value={formValues.dataNascimento}
                onChange={handleChange}
              />
              <label>
                Data de Nascimento:
              </label>
            </div>
            <div>

              <label class="checkbox-btn" >
                <label for="checkbox" htmlFor="agreement">Eu li e aceito os <a href="#" id='termos-cadastro'>termos de uso</a></label>
                <input id="checkbox" type="checkbox" required></input>
                <span class="checkmark"></span>
              </label>


            </div>

            <div className="button-form" id="box-button-cadastro">
              <center>
                <a href="#">
                  <button type="submit" class="btn" id='button-cadastro'>
                    Entrar
                    <span></span>
                  </button>
                </a></center>
            </div>

            <div className="volta-cadastro">
              <br />
              <p id="volta1-cadastro">Já tem conta no ArgendeX?<a id="text1-cadastro" href="Login"> Vá para a página de login</a></p>
              <p id="volta2-cadastro">Precisa de ajuda?<a id="text1-cadastro" href="Suporte"> Acesse nossa central de ajuda.</a></p>
            </div>
          </form>
        </div>
      </div >
      <p className="error-validation template"></p>
      <script src="../../js/jscadastro.js"></script>

    </div >
  );
};

export default App;