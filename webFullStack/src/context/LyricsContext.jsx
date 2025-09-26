import { createContext, useState } from 'react';

// 1. Crie o Contexto
export const LyricsContext = createContext();

// 2. Crie o Provedor do Contexto
export function LyricsProvider({ children }) {
    // O estado que você quer compartilhar
    const [lyrics, setLyrics] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Funções para manipular o modal
    const abrirModal = (message) => {
        setErrorMessage(message);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
    };

    // Funções para validar e buscar os dados
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

        const url = `https://lrclib.net/api/search?track_name=${nomeMusica}&artist_name=${nomeArtista}`;

        salvaHistorico(nomeArtista, nomeMusica);

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
                    return;
                }
                setLyrics(data[0].plainLyrics);
            })
            .catch(error => {
                console.error("Ocorreu um erro:", error);
                abrirModal(error.message || 'Ops! Ocorreu um erro ao buscar a letra. Tente novamente mais tarde.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const salvaHistorico = (artista, musica) => {
        // Pega o histórico atual do localStorage
        const historicoAtual = JSON.parse(localStorage.getItem('historicoPesquisa')) || [];

        // Cria um novo item de pesquisa
        const novaPesquisa = { artista, musica, timestamp: Date.now() };

        // Adiciona a nova pesquisa ao início da lista
        historicoAtual.unshift(novaPesquisa);

        // Limita o histórico a, por exemplo, 10 itens
        const historicoLimitado = historicoAtual.slice(0, 10);

        // Salva a lista atualizada no localStorage
        localStorage.setItem('historicoPesquisa', JSON.stringify(historicoLimitado));
    };

    const value = {
        lyrics,
        modalOpen,
        errorMessage,
        loading,
        buscaMusica,
        fecharModal,
    };

    return (
        <LyricsContext.Provider value={value}>
            {children}
        </LyricsContext.Provider>
    );
}