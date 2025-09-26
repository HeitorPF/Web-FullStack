import { createContext, useContext, useState } from 'react';
// 1. Crie o Contexto
const MusicInfoContext = createContext();

export function MusicInfoProvider({children}) {

  const [musicInfo, setMusicInfo] = useState('')

  const value = {musicInfo, setMusicInfo}
  return(
    <>
      <MusicInfoContext.Provider value={value}>
        {children}
      </MusicInfoContext.Provider>
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMusicInfoContext = () => useContext(MusicInfoContext)