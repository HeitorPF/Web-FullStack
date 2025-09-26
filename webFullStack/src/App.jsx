import { useContext, useRef, useEffect } from 'react';
import loadingImage from './assets/images/loading.gif'
import './App.css'
import Header from './components/Header.jsx';
import ErroModal from './components/ErroModal.jsx';
import HistoricoPesquisa from './components/HistoricoPesquisa.jsx';
import { useLyrics } from './context/LyricsContext.jsx';
import { MusicInfoProvider } from './context/MusicInfoContext.jsx';


function App() {

  const { lyrics, modalOpen, errorMessage, avisoSim, loading, fecharModal, buscaMusica, excluirHistorico } = useLyrics();


  const resultadoRef = useRef(null);

  useEffect(() => {
    if (loading || lyrics) {
      resultadoRef.current.classList.remove('invi');
    } else {
      resultadoRef.current.classList.add('invi');
    }
  }, [loading, lyrics]);

  const handleBuscaHistorico = (artista, musica) => {
    buscaMusica(artista, musica);
  };

  const handleExcluirHistorico = (artista, musica) => {
    excluirHistorico(artista, musica);
  };

  const rolarParaSecao = (id) => {
    const secao = document.getElementById(id);
    if (secao) {
      secao.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente
    }
  };



  return (
    <>
      <MusicInfoProvider>
        <Header buscaMusica={buscaMusica} rolarParaSecao={rolarParaSecao} />
        <main>

          <div className='resultado invi ' ref={resultadoRef} id="secao-resultado">
            <pre id="lyrics-container">{lyrics ? lyrics : <img src={loadingImage} alt="loading" className='loading-image' />}</pre>
          </div>

        </main>

        <HistoricoPesquisa
          onBuscaHistorico={handleBuscaHistorico}
          onExcluirHistorico={handleExcluirHistorico}
          id="secao-historico"
        />



        <ErroModal open={modalOpen} handleClose={fecharModal} message={errorMessage} />
      </MusicInfoProvider>


    </>
  )
}

export default App