import { useContext, useRef, useEffect } from 'react';
import loadingImage from './assets/images/loading.gif'
import './App.css'
import Header from './components/Header.jsx';
import ErroModal from './components/ErroModal.jsx';
import { LyricsContext } from './context/LyricsContext.jsx';
import HistoricoPesquisa from './context/HistoryContext.jsx';

function App() {

  const { lyrics, modalOpen, errorMessage, loading, fecharModal, buscaMusica } = useContext(LyricsContext);


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

  return (
    <>

      <Header buscaMusica={buscaMusica} />

      <main>

        <div className='resultado invi ' ref={resultadoRef}>
          <pre id="lyrics-container">{lyrics ? lyrics : <img src={loadingImage} alt="loading" className='loading-image' />}</pre>
        </div>

      </main>

      <HistoricoPesquisa onBuscaHistorico={handleBuscaHistorico} />


      <ErroModal open={modalOpen} handleClose={fecharModal} message={errorMessage} />



    </>
  )
}

export default App