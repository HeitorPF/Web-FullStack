import { createContext, useState, useContext } from 'react';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [avisoMessage, setAvisoMessage] = useState('');
    const abrirModal = (message, isError = true) => {
        if (isError) {
            setErrorMessage(message);
            setAvisoMessage('');
        } else {
            setAvisoMessage(message);
            setErrorMessage('');
        }
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setErrorMessage('');
        setAvisoMessage('');
    };

    const value = {
        modalOpen,
        errorMessage,
        avisoMessage,
        abrirModal,
        fecharModal,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);