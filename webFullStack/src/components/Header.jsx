import React, { useState } from 'react';
import lupa from '../assets/images/lupa.png'

function Header({ buscaMusica }) {
    const [nomeArtista, setnomeArtista] = useState('');
    const [nomeMusica, setnomeMusica] = useState('');

    return (
        <header>
            <div className='value'>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-artista"
                        placeholder="Nome do artista:"
                        value={nomeArtista}
                        onChange={e => setnomeArtista(e.target.value)}
                    />
                    <img src={lupa} alt="lupa" className="lupa-icon" />
                </div>
            </div>

            <div className='value'>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-musica"
                        placeholder="Nome da música:"
                        value={nomeMusica}
                        onChange={e => setnomeMusica(e.target.value)}
                    />
                    <img src={lupa} alt="lupa" className="lupa-icon" />
                </div>
            </div>

            <button className='pesquisarMusica' onClick={() => buscaMusica(nomeArtista, nomeMusica)}>
                Pesquisar
            </button>
        </header>
    );
}

export default Header;