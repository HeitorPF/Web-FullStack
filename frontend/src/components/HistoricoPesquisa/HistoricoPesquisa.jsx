import React, { useState, useEffect, useContext } from 'react';
import './HistoricoPesquisa.css';
import { useLyrics } from '../../context/LyricsContext';


function HistoricoPesquisa({ onBuscaHistorico, id }) {
    const {
        buscaMusicaHistorico,
        excluirHistorico,
        token,
        buscaMusica,
    } = useLyrics();

    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);



    const carregarHistorico = async () => {

        try {
            setLoading(true);

            console.log(token);

            const lista = await buscaMusicaHistorico("", "", token);

            const listaHistorico = lista.result;

            console.log("Histórico carregado:", listaHistorico);

            setHistorico(listaHistorico); //


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
    }, [token, buscaMusicaHistorico]);

    const handleExcluir = async (artista, musica) => {
        try {
            console.log('excluindo')
            await excluirHistorico(artista, musica, token);
            await carregarHistorico()

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
                        <li key={index} onClick={() => buscaMusica(item.nomeArtista, item.nomeMusica)}>
                            <strong>{item.nomeArtista}</strong> - {item.nomeMusica}
                            <button
                                className="btn-excluir"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleExcluir(item.nomeArtista, item.nomeMusica);
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