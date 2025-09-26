import { useState, useRef } from 'react';
import loadingImage from './assets/images/loading.gif'
import './App.css'
import Header from './components/Header.jsx';
import ErroModal from './components/ErroModal.jsx';


function App() {
  let [lyrics, setLyrics] = useState('')

  const resultado = useRef(null)


  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const abrirModal = (message) => {
    setErrorMessage(message);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
  };

  function validacaoDados(nomeArtista, nomeMusica) {
    if (!nomeArtista) {
      abrirModal("Por favor, preencha o nome do artista.");
      return false;
    }

    if (!nomeMusica) {
      abrirModal("Por favor, preencha o nome da música.");
      return false;
    }


    return true;
  }


  async function buscaMusica(nomeArtista, nomeMusica) {

    if (!validacaoDados(nomeArtista, nomeMusica)) {
      return;
    }
    setLyrics('')
    resultado.current.classList.remove('invi')


    const url = `https://lrclib.net/api/search?track_name=${nomeMusica}&artist_name=${nomeArtista}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na busca. Tente com outros termos.');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          abrirModal("Nenhuma letra encontrada para essa busca.");
          setLyrics('');
          return;
        }
        console.log("Resultados encontrados:", data);
        setLyrics(data[0].plainLyrics);
      })
      .catch(error => {
        console.error("Ocorreu um erro:", error);
        abrirModal(error.message || 'Ops! Ocorreu um erro ao buscar a letra. Tente novamente mais tarde.');
        setLyrics('');
      });
  }



  return (
    <>


      <Header buscaMusica={buscaMusica} />



      <main>

        <div className='resultado invi ' ref={resultado}>
          <pre id="lyrics-container">{lyrics ? lyrics : <img src={loadingImage} alt="loading" className='loading-image' />}</pre>
        </div>

      </main>

      <ErroModal open={modalOpen} handleClose={fecharModal} message={errorMessage} />



    </>
  )
}

export default App