// src/components/HistoricoPesquisa.jsx
import React, { useState, useEffect } from 'react';

function HistoricoPesquisa({ onBuscaHistorico }) {
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        // Carrega o histórico do localStorage quando o componente é montado
        const historicoSalvo = JSON.parse(localStorage.getItem('historicoPesquisa')) || [];
        setHistorico(historicoSalvo);

        // Adiciona um listener para atualizar o histórico se ele mudar em outra aba
        window.addEventListener('storage', () => {
            const historicoAtualizado = JSON.parse(localStorage.getItem('historicoPesquisa')) || [];
            setHistorico(historicoAtualizado);
        });
    }, []);

    return (
        <div className="historico-container">
            <h2>Histórico de Pesquisa</h2>
            {historico.length > 0 ? (
                <ul>
                    {historico.map((item, index) => (
                        <li key={index} onClick={() => onBuscaHistorico(item.artista, item.musica)}>
                            <strong>{item.artista}</strong> - {item.musica}
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