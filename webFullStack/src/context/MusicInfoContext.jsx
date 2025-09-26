import { createContext, useContext, useState } from 'react';
const MusicInfoContext = createContext();

export function MusicInfoProvider({ children }) {

  const [musicInfo, setMusicInfo] = useState('')

  const value = { musicInfo, setMusicInfo }
  return (
    <>
      <MusicInfoContext.Provider value={value}>
        {children}
      </MusicInfoContext.Provider>
    </>
  )
}

export const useMusicInfoContext = () => useContext(MusicInfoContext)