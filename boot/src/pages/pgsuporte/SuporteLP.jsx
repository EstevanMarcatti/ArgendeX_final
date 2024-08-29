import React, { useState } from 'react';
import './suporte.css';

export default function Suporte() {
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    mensagem: '',
    arquivo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      arquivo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar o formulário
    console.log('Formulário enviado:', formValues);
  };

  return (
    <div className="form-container">
      <div id="back-cadastro">
        <div className='cadastro-box'>
          <div className='inicio-cadastro'>
            <h2 id='inicial-cadastro'>ArgendeX</h2>
          </div>
          <h2 id="text">
            Explique quais são os seus problemas?
          </h2>
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
              <textarea
                name="mensagem"
                id="suporte-cadastro"
                placeholder="Digite sua mensagem"
                value={formValues.mensagem}
                onChange={handleChange}
                maxLength={1250}
                rows="10"
                style={{ resize: 'none' }}
              ></textarea>
              <label htmlFor="suporte-cadastro">Fale conosco</label>
            </div>

            <div className="user-box file-upload-container">
              <input
                type="file"
                id="arquivo-cadastro"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Oculta o input de arquivo
              />
              <button
                type="button"
                className="custom-file-button"
                onClick={() => document.getElementById('arquivo-cadastro').click()}
              >
                Anexar um arquivo
              </button>
              <span className="file-name">
                {formValues.arquivo ? formValues.arquivo.name : 'Nenhum arquivo selecionado'}
              </span>
            </div>

            <div className="button-form" id="box-button-cadastro">
              <center>
                <button type="submit" className="btn" id='button-cadastro'>
                  Enviar
                </button>
              </center>
            </div>

            <div className="volta-cadastro">
              <br />
              <p id="volta1-cadastro">Já tem conta no ArgendeX? <br /><a id="text1-cadastro" href="/login"> Vá para a página de login</a></p>
              <p id="volta2-cadastro">Volte para a página inicial <br /><a id="text1-cadastro" href="/"> ---clique aqui---</a></p>
              <p id="volta2-cadastro">Não tem conta ainda? <br /><a id="text1-cadastro" href="/cadastro"> ---Crie agora!---</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
