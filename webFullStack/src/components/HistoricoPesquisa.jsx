// src/components/HistoricoPesquisa.jsx
import { useState, useEffect } from 'react';

function HistoricoPesquisa({ onBuscaHistorico, onExcluirHistorico, id }) {
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        const historicoSalvo = JSON.parse(localStorage.getItem('historicoPesquisa')) || [];
        setHistorico(historicoSalvo);

        window.addEventListener('storage', () => {
            const historicoAtualizado = JSON.parse(localStorage.getItem('historicoPesquisa')) || [];
            setHistorico(historicoAtualizado);
        });
    }, []);

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
                                    e.stopPropagation(); // Previne que o clique dispare a re-busca (onClick do <li>)
                                    onExcluirHistorico(item.artista, item.musica);
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