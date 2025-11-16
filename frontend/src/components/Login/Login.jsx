import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = 'https://localhost:8000/user/login';

async function loginUsuario(email, senha) {
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
            const errorMessage = data.message || data.error || 'Erro desconhecido ao login usuário.';
            throw new Error(errorMessage);
        }

        return data;

    } catch (error) {
        console.error('Falha no login de usuário:', error);
        throw error;
    }
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            // Chame a função de serviço com os valores do estado:
            const resultado = await loginUsuario(email, password); // Note que `password` é o seu estado.

            // Se o login for bem-sucedido, redirecione o usuário
            alert(`Login realizado com sucesso: ${resultado.result.token}`);
            localStorage.setItem('token', resultado.result.token);


            // Exemplo de redirecionamento:
            // navigate('/');
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <Card.Title className="login-title">
                    <h2>Login</h2>
                </Card.Title>
                <Form onSubmit={handleLogin}>
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
                            Entrar
                        </Button>
                    </div>

                    <div style={{ marginTop: "20px" }} className="text-center">
                        <Link to="/register" className="login-link">
                            Criar nova conta
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
}