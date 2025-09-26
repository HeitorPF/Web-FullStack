import { createContext, useState, useContext } from 'react';

async function fetchLyrics(nomeArtista, nomeMusica) {
    const url = `https://lrclib.net/api/search?track_name=${nomeMusica}&artist_name=${nomeArtista}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Erro na busca. Tente com outros termos.');
    }

    const data = await response.json();

    if (data.length === 0 || !data[0].plainLyrics) {
        throw new Error("Nenhuma letra encontrada para essa busca.");
    }

    return data[0].plainLyrics;
}


const salvaHistorico = (artista, musica) => {
    const historicoAtual = JSON.parse(localStorage.getItem('historicoPesquisa')) || [];
    const novaPesquisa = { artista, musica, timestamp: Date.now() };

    historicoAtual.unshift(novaPesquisa);

    const historicoLimitado = historicoAtual.slice(0, 10);

    localStorage.setItem('historicoPesquisa', JSON.stringify(historicoLimitado));

    const event = new Event('historicoAtualizado');
    window.dispatchEvent(event);
};

const excluirHistorico = (artista, musica) => {
    const historicoAtual = JSON.parse(localStorage.getItem('historicoPesquisa')) || [];

    const novoHistorico = historicoAtual.filter(item =>
        item.artista !== artista || item.musica !== musica
    );

    localStorage.setItem('historicoPesquisa', JSON.stringify(novoHistorico));



    const event = new Event('historicoAtualizado');
    window.dispatchEvent(event);

    console.log(`Item removido: ${artista} - ${musica}`);
};

export const LyricsContext = createContext();


export function LyricsProvider({ children }) {

    const [lyrics, setLyrics] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [avisoMessage, setAvisoMessage] = useState(''); // <-- CORRIGIDO

    const abrirModal = (message) => {
        setErrorMessage(message);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
    };

    function validacaoDados(nomeArtista, nomeMusica) {
        if (!nomeArtista || !nomeMusica) {
            const message = !nomeArtista ? "Por favor, preencha o nome do artista." : "Por favor, preencha o nome da música.";
            abrirModal(message);
            return false;
        }
        return true;
    }



    async function buscaMusica(nomeArtista, nomeMusica) {
        if (!validacaoDados(nomeArtista, nomeMusica)) {
            return;
        }

        setLyrics('');
        setLoading(true);

        try {
            const letraEncontrada = await fetchLyrics(nomeArtista, nomeMusica);

            salvaHistorico(nomeArtista, nomeMusica);
            setLyrics(letraEncontrada);

        } catch (error) {
            console.error("Ocorreu um erro:", error);
            abrirModal(error.message || 'Ops! Ocorreu um erro desconhecido.');

        } finally {
            setLoading(false);
        }
    }

    const value = {
        lyrics,
        modalOpen,
        errorMessage,
        loading,
        buscaMusica,
        fecharModal,
        excluirHistorico,

    };

    return (
        <LyricsContext.Provider value={value}>
            {children}
        </LyricsContext.Provider>
    );
}


export const useLyrics = () => useContext(LyricsContext);
