import { createContext, useContext } from 'react';
// 1. Crie o Contexto
const TesteContext = createContext();

export function TesteProvider({children}) {
  const numero = 3
  const letra = 'a'
  
  const valor = { numero, letra}


  return(
    <>
      <TesteContext.Provider value={valor}>
        {children}
      </TesteContext.Provider>
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTestContext = () => useContext(TesteContext)