import { createContext, useState, useContext, useEffect } from 'react';

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

async function adicionarMusicaHistorico(nomeArtista, nomeMusica, token) {
    // 1. Porta corrigida para 3001
    const url = 'https://localhost:8000/hist/adicionar';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nomeArtista, nomeMusica, token }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro ao adicionar música ao histórico.');
    }
    const event = new Event('historicoAtualizado');
    window.dispatchEvent(event);
    return data;
}

async function buscaMusicaHistorico(nomeArtista, nomeMusica, token) {
    console.log(`tokemzim: ${token}`)
    const url = 'https://localhost:8000/hist/buscar';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nomeArtista, nomeMusica, token }),

    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro ao buscar música ao histórico.');
    }

    return data;

};

async function excluirHistorico(nomeArtista, nomeMusica, token) {
    
    const url = 'https://localhost:8000/hist/deletar';
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nomeArtista, nomeMusica, token }),
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
    
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const abrirModal = (message) => {
        setErrorMessage(message);
        setModalOpen(true);
    };

    function validacaoDados(nomeArtista, nomeMusica) {
        if (!nomeArtista || !nomeMusica) {
            const message = !nomeArtista ? "Por favor, preencha o nome do artista." : "Por favor, preencha o nome da música.";
            abrirModal(message);
            return false;
        }
        return true;
    }

    const fecharModal = () => {
        setModalOpen(false);
    };

    async function buscaMusica(nomeArtista, nomeMusica) {
        if (!validacaoDados(nomeArtista, nomeMusica)) {
            return;
        }
        console.log(nomeArtista, nomeMusica)
        setLyrics('');
        setLoading(true);
        try {
            const letraEncontrada = await fetchLyrics(nomeArtista, nomeMusica);

            if (token) {
                await adicionarMusicaHistorico(nomeArtista, nomeMusica, token);
            }

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
        token,
        fecharModal,
        setToken,
        buscaMusica,
        adicionarMusicaHistorico: (musica, artista) => adicionarMusicaHistorico(musica, artista, token),
        buscaMusicaHistorico: (musica, artista) => buscaMusicaHistorico(musica, artista, token),
        excluirHistorico: (musica, artista) => excluirHistorico(musica, artista, token),
        //fetchLyrics: (musica, artista) => fetchLyrics(musica, artista)
    };

    return (
        <LyricsContext.Provider value={value}>
            {children}
        </LyricsContext.Provider>
    );
}

export const useLyrics = () => useContext(LyricsContext);