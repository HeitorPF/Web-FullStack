import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './ErroModal.css';


export default function ErroModal({ open, handleClose, message }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className="erro-modal-conteudo"> {/* Adicione a classe aqui */}
                <Typography id="modal-title" variant="h6" component="h2">
                    Erro de Validação
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    {message}
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 3 }} variant="contained">
                    Fechar
                </Button>
            </Box>
        </Modal>
    );
}