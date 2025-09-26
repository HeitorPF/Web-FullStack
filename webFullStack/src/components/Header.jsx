import { useState } from 'react';
import lupa from '../assets/images/lupa.png'

// Receba 'rolarParaSecao' como uma prop
function Header({ buscaMusica, rolarParaSecao }) {
    const [nomeArtista, setnomeArtista] = useState('');
    const [nomeMusica, setnomeMusica] = useState('');

    return (
        <header>

            <div className='search-conteiner'>

                <div className='search-component'>

                    <h1>Lyrics On</h1>

                </div>



                <div className='search-component'>

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

                </div>

                <div className='search-component'>

                    <button className='pesquisarMusica' onClick={() => buscaMusica(nomeArtista, nomeMusica)}>
                        Pesquisar
                    </button>

                </div>

                { }
                <div className='search-component menu-spa'>
                    <button
                        className='btn-historico'
                        onClick={() => rolarParaSecao('secao-historico')}>
                        Ver histórico
                    </button>
                </div>
                { }

            </div>

        </header>
    );
}

export default Header;