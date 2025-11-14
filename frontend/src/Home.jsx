// src/Home.jsx (ou AppContent.jsx, seu conteúdo principal)
import { useRef, useEffect } from 'react';
import loadingImage from './assets/images/loading.gif';
import Header from './components/Header/Header.jsx';
import ErroModal from './components/ErroModal/ErroModal.jsx';
import HistoricoPesquisa from './components/HistoricoPesquisa/HistoricoPesquisa.jsx';
import { useLyrics } from './context/LyricsContext.jsx';
import './App.css'; // Mantenha a importação de CSS

function Home() {
    const { lyrics, modalOpen, errorMessage, loading, fecharModal, buscaMusica, excluirHistorico } = useLyrics();

    const resultadoRef = useRef(null);

    useEffect(() => {
        // Note: A classe 'invi' deve estar definida no seu CSS
        if (resultadoRef.current) {
            if (loading || lyrics) {
                resultadoRef.current.classList.remove('invi');
            } else {
                resultadoRef.current.classList.add('invi');
            }
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
            secao.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Header buscaMusica={buscaMusica} rolarParaSecao={rolarParaSecao} />
            <main>
                <div className='resultado invi' ref={resultadoRef} id="secao-resultado">
                    <pre id="lyrics-container">{lyrics ? lyrics : <img src={loadingImage} alt="loading" className='loading-image' />}</pre>
                </div>
            </main>

            <HistoricoPesquisa
                onBuscaHistorico={handleBuscaHistorico}
                onExcluirHistorico={handleExcluirHistorico}
                id="secao-historico"
            />

            <ErroModal open={modalOpen} handleClose={fecharModal} message={errorMessage} />
        </>
    );
}

export default Home;