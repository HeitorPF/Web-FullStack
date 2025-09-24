import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css'

function App() {
  const artistName = "Nanase Aikawa";
  const trackName = "break out";
  const { t } = useTranslation();
  let [lyrics, setLyrics] = useState('')


  const url = `https://lrclib.net/api/search?track_name=${trackName}&artist_name=${artistName}`;

  fetch(url)
  .then(response => response.json()) // Converte a resposta para JSON
  .then(data => {
    console.log("Resultados encontrados:", data); // Exibe os resultados no console
    setLyrics(data[0].plainLyrics)
  })
  .catch(error => {
    console.error("Ocorreu um erro:", error); // Exibe um erro se algo der errado
  });

  return (
    <>
      <h1>{t('welcomeMessage')}</h1>
      <p>Buscando a letra de "${artistName}" - ${trackName}...</p>

      <h2>Resultado:</h2>
      <pre id="lyrics-container">{lyrics}</pre>
    </>
  )
}

export default App