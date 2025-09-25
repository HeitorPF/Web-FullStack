import { useState, useRef } from 'react';
import loadingImage from './assets/images/loading.gif'
import './App.css'

function App() {
  let [lyrics, setLyrics] = useState('')
  let [nomeArtista, setnomeArtista] = useState('')
  let [nomeMusica, setnomeMusica] = useState('')
  const resultado = useRef(null)

  async function buscaMusica() {
    setLyrics('')
    resultado.current.classList.remove('invi')
    const url = `https://lrclib.net/api/search?track_name=${nomeMusica}&artist_name=${nomeArtista}`;
    fetch(url)
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
      console.log("Resultados encontrados:", data); // Exibe os resultados no console
      setLyrics(data[0].plainLyrics)
    })
    .catch(error => {
      console.error("Ocorreu um erro:", error); // Exibe um erro se algo der errado
    });
  }
  
  

  return (
    <>
      <div className="header">
        <p>Lyrics On</p>
        <div>
          <label htmlFor="NpmeArtista">Nome do artista:</label>
          <input type="text" className="input-artista" value={nomeArtista} onChange={e => {setnomeArtista(e.target.value)}}/>
        </div>
        <div>
          <label htmlFor="NpmeArtista">Nome da música:</label>
          <input type="text" className="input-musica" value={nomeMusica} onChange={e => {setnomeMusica(e.target.value)}}/>
        </div>
        

        <button className='pesquisarMusica' onClick={() => {buscaMusica()}}> Pesquisar</button>
      </div>

      <div className='resultado invi' ref={resultado}>
        <p>Buscando a letra de "{nomeArtista}" - {nomeMusica}...</p>

        <h2>Resultado:</h2>
        <pre id="lyrics-container">{lyrics?lyrics:<img src={loadingImage} alt="loading" className='loading-image'/>}</pre>
      </div>
      
    </>
  )
}

export default App