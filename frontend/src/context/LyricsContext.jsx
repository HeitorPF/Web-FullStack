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


async function adicionarMusicaHistorico(nomeMusica, nomeArtista, token) {
    const url = 'https://localhost:8000/hist/adicionar';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nomeMusica, nomeArtista }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro ao adicionar música ao histórico.');
    }

    const event = new Event('historicoAtualizado');

    window.dispatchEvent(event);

    return data;


}

async function buscaMusicaHistorico(nomeMusica, nomeArtista, token) {
    const url = 'https://localhost:8000/hist/busca';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nomeMusica, nomeArtista }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro ao buscar música ao histórico.');
    }

    const event = new Event('historicoAtualizado');

    window.dispatchEvent(event);

    return data;


}

async function excluirHistorico(nomeMusica, nomeArtista, token) {

    const url = 'https://localhost:8000/hist/deletar';
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nomeMusica, nomeArtista }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro ao deletar música ao histórico.');
    }

    return data;

};

export const LyricsContext = createContext();


export function LyricsProvider({ children }) {

    const [lyrics, setLyrics] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);


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

            adicionarMusicaHistorico(nomeArtista, nomeMusica);
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
