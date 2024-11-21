import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './css_geral.css'

function Perfil() {
  const [smShow, setSmShow] = useState(false);  // Controle para abrir/fechar o modal
  const [fotoPerfil, setFotoPerfil] = useState("https://thumbs2.imgbox.com/67/4f/St9N6SJO_t.png");  // Foto atual
  const [novaFoto, setNovaFoto] = useState(null);  // Para armazenar a nova foto
  const [loading, setLoading] = useState(false);  // Controle de carregamento para exibir enquanto o upload está em andamento

  // Função para buscar a foto de perfil ao carregar o componente
  const fetchFotoPerfil = async () => {
    const userID = localStorage.getItem('ID'); // A chave correta é 'ID'

    if (!userID) {
      console.error('Erro: Usuário não autenticado ou ID não encontrado no localStorage.');
      alert('Usuário não autenticado!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8085/foto-perfil/${userID}`);
      if (response.ok) {
        const data = await response.json();
        if (data.foto_perfil) {
          // Converte a foto de perfil em Base64 para ser exibida
          setFotoPerfil(`data:image/png;base64,${data.foto_perfil}`);
        } else {
          console.error('Foto de perfil não encontrada.');
          setFotoPerfil("https://thumbs2.imgbox.com/67/4f/St9N6SJO_t.png"); // Foto padrão
        }
      } else {
        console.error('Erro ao buscar a foto de perfil.');
      }
    } catch (error) {
      console.error('Erro ao buscar a foto de perfil:', error);
      setFotoPerfil("https://thumbs2.imgbox.com/67/4f/St9N6SJO_t.png"); // Foto padrão
    }
  };

  // Função que será chamada quando o usuário clicar em "Confirmar Alteração"
  const handleSubmit = async () => {
    const userID = localStorage.getItem('ID'); // A chave correta é 'ID'

    if (!userID) {
      console.error('Erro: Usuário não autenticado ou ID não encontrado no localStorage.');
      alert('Usuário não autenticado!');
      return;
    }

    if (!novaFoto) {
      console.error('Erro: Nenhuma foto foi selecionada para upload.');
      alert('Por favor, selecione uma foto.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('foto', novaFoto);

    try {
      const response = await fetch(`http://localhost:8085/atualizar-foto-perfil/${userID}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFotoPerfil(URL.createObjectURL(novaFoto)); // Atualiza a foto de perfil localmente
        alert(data.message || 'Foto de perfil atualizada com sucesso!');
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar foto no backend:', errorData);
        alert(errorData.erro || 'Erro ao atualizar foto de perfil.');
      }
    } catch (error) {
      console.error('Erro ao enviar a foto:', error);
      alert('Erro ao enviar a foto de perfil.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFotoPerfil(); // Chama a função ao carregar a página
  }, []);

  return (
    <>
      <Button onClick={() => setSmShow(true)} className="me-2" id='button_perfil'>
        <img src={fotoPerfil} alt="Foto de Perfil" id='fotoperfil' />
      </Button>

      <Modal
        size="lg"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <div>
            <h2>Alterar Foto de Perfil</h2>
            <div>
              <img
                src={novaFoto ? URL.createObjectURL(novaFoto) : fotoPerfil}
                alt="Foto de Perfil"
                id="fotoperfil2"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
            </div>
            <input
              type="file"
              onChange={(e) => setNovaFoto(e.target.files[0])}
              accept="image/*"
              style={{ marginTop: '10px' }}
            />
            <Button
              style={{ marginTop: '10px' }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Confirmar Alteração'}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Perfil;
