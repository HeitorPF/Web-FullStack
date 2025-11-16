import React, { useState, useEffect, useContext } from 'react';
import './HistoricoPesquisa.css';
import { useLyrics } from '../../context/LyricsContext';


function HistoricoPesquisa({ onBuscaHistorico, id }) {
    const {
        buscaMusicaHistorico,
        excluirHistorico,
        userEmail,
        userToken
    } = useLyrics();

    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarHistorico = async () => {
        if (!userToken || !userEmail) {
            setHistorico([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const lista = await buscaMusicaHistorico("placeholder", "placeholder", userToken, userEmail);

            setHistorico(lista);
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
            setHistorico([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarHistorico();

        const handleAtualizacao = () => carregarHistorico();
        window.addEventListener('historicoAtualizado', handleAtualizacao);

        return () => {
            window.removeEventListener('historicoAtualizado', handleAtualizacao);
        };
    }, [userToken, userEmail, buscaMusicaHistorico]);

    const handleExcluir = async (artista, musica) => {
        try {
            await excluirHistorico(musica, artista, userToken);

        } catch (error) {
            console.error("Falha ao deletar item:", error);
        }
    };


    if (loading) {
        return <div id={id} className="historico-container"><p>Carregando histórico...</p></div>;
    }


    return (
        <div id={id} className="historico-container">
            <h2>Histórico de Pesquisa</h2>
            {historico.length > 0 ? (
                <ul>
                    {historico.map((item, index) => (
                        <li key={index} onClick={() => onBuscaHistorico(item.artista, item.musica)}>
                            <strong>{item.artista}</strong> - {item.musica}
                            <button
                                className="btn-excluir"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleExcluir(item.artista, item.musica);
                                }}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma pesquisa recente.</p>
            )}
        </div>
    );
}

export default HistoricoPesquisa;