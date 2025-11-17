// src/Home.jsx (ou AppContent.jsx, seu conteúdo principal)
import { useRef, useEffect } from 'react';
import loadingImage from "../../assets/images/loading.gif"; import Header from '../Header/Header.jsx';
import ErroModal from '../ErroModal/ErroModal.jsx';
import HistoricoPesquisa from '../HistoricoPesquisa/HistoricoPesquisa.jsx';
import { useLyrics } from '../../context/LyricsContext.jsx'
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { lyrics, modalOpen, errorMessage, loading, fecharModal, buscaMusica, buscaMusicaHistorico, excluirHistorico, limparLyrics } = useLyrics();

    const resultadoRef = useRef(null);

    const navigate = useNavigate();
    const { setToken } = useLyrics();

    useEffect(() => {
        if (resultadoRef.current) {
            if (loading || lyrics) {
                resultadoRef.current.classList.remove('invi');
            } else {
                resultadoRef.current.classList.add('invi');
            }
        }
    }, [loading, lyrics]);



    const handleBusca = (artista, musica) => {
        buscaMusica(artista, musica);
    };

    const handleBuscaHistorico = (artista, musica) => {
        buscaMusicaHistorico(artista, musica);
    }

    const handleExcluirHistorico = (artista, musica) => {
        excluirHistorico(artista, musica);
    };

    const rolarParaSecao = (id) => {
        const secao = document.getElementById(id);
        if (secao) {
            secao.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sairHome = () => {

        setToken(null);

        localStorage.removeItem('token');

        limparLyrics();

        navigate('/login');
    };


    useEffect(() => {
        limparLyrics();
    }, []);


    return (
        <>
            <Header buscaMusica={buscaMusica} rolarParaSecao={rolarParaSecao} sairHome={sairHome} />
            <main>
                <div className='resultado invi' ref={resultadoRef} id="secao-resultado">
                    <pre id="lyrics-container">{lyrics ? lyrics : <img src={loadingImage} alt="loading" className='loading-image' />}</pre>
                </div>
            </main>

            <HistoricoPesquisa
                onBusca={handleBusca}
                onBuscaHistorico={handleBuscaHistorico}
                onExcluirHistorico={handleExcluirHistorico}
                id="secao-historico"
            />

            <ErroModal open={modalOpen} handleClose={fecharModal} message={errorMessage} />
        </>
    );
}

export default Home;