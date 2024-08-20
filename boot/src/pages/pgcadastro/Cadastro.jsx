import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cadastro.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Cadastro = () => {
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
      const resposta = await fetch('http://localhost:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!resposta.ok) {
        const errorData = await resposta.json();
        throw new Error(errorData.erro || 'Erro desconhecido');
      }

      const resultado = await resposta.json();

      if (resultado.erro) {
        console.error('Erro no servidor:', resultado.erro);
        setMensagensErro([resultado.erro]);
      } else {
        console.log('Dados processados com sucesso!', resultado);
        navigate('/Appsite');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setMensagensErro([error.message || 'Erro desconhecido']);
    }
  };

  // Estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };

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
              <label htmlFor="name-cadastro">Nome Completo</label>
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
              <label htmlFor="email-cadastro">E-mail</label>
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
                <label htmlFor="password-cadastro">Senha</label>
                <div className="switch">
                  <input
                    type="checkbox"
                    id="toggle"
                    checked={showPassword}
                    onChange={handleCheckboxChange}
                  />
                  <label className="toggle" htmlFor="toggle">
                    <i></i>
                  </label>
                </div>
              </div>
            </div>

            <div className="user-box">
              <input
                type="text"
                name="cidade"
                id="cidade-cadastro"
                value={formValues.cidade}
                onChange={handleChange}
                placeholder="Digite sua cidade"
              />
              <label htmlFor="cidade-cadastro">Cidade</label>
            </div>

            <div className="user-box">
              <input
                type="date"
                name="dataNascimento"
                id="dataNascimento-cadastro"
                value={formValues.dataNascimento}
                onChange={handleChange}
              />
              <label htmlFor="dataNascimento-cadastro">Data de Nascimento</label>
            </div>

            <div>
              <label className="checkbox-btn">
                <input id="checkbox" type="checkbox" required />
                <label htmlFor="checkbox">Eu li e aceito os <a href="#" id='termos-cadastro'>termos de uso</a></label>
                <span className="checkmark"></span>
              </label>
            </div>

            <div className="button-form" id="box-button-cadastro">
              <center>
                <button type="submit" className="btn" id='button-cadastro'>
                  Criar Conta
                </button>
              </center>
            </div>

            <div className="volta-cadastro">
              <br />
              <p id="volta1-cadastro">Já tem conta no ArgendeX?<a id="text1-cadastro" href="/login"> Vá para a página de login</a></p>
              <p id="volta2-cadastro">Precisa de ajuda?<a id="text1-cadastro" href="/suporte"> Acesse nossa central de ajuda.</a></p>
            </div>
          </form>
        </div>
      </div>
      <p className="error-validation template"></p>
    </div>
  );
};

export default Cadastro;
