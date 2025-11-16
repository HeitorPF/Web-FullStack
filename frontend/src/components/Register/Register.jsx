import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const API_URL = 'http://localhost:3001/user/register';

async function cadastrarUsuario(email, senha) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || data.error || 'Erro desconhecido ao cadastrar usuário.';
            throw new Error(errorMessage);
        }

        return data;

    } catch (error) {
        console.error('Falha no cadastro de usuário:', error);
        throw error;
    }
}




export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();


    const handleCadastro = async (e) => {
        e.preventDefault();


        try {
            const resultado = await cadastrarUsuario(email, senha);
            alert(`Cadastro realizado com sucesso: ${resultado.message}`);
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <Card.Title className="login-title">
                    <h2>Cadastro</h2>
                </Card.Title>
                <Form onSubmit={handleCadastro}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="login-label">E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="login-label">Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="login-button-container">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!email || !password}
                            className="login-button"
                        >
                            Registrar usuário
                        </Button>
                    </div>


                </Form>
            </Card>
        </div>
    );
}
