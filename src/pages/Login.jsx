import React, { useState, useContext } from 'react';
import authService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Form, Alert, Container, FloatingLabel, Button } from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(email, password);
            login(await authService.getCurrentUser());
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container style={{ width: "400px" }}>
            <div className="p-4 box" >
                <h2 className="mb-3">Login</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="formBasicEmail"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control required type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="formBasicPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control required type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" />
                    </FloatingLabel>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </div>
                </Form>
            </div>
            <Button
              variant="danger"
              className="w-100 mt-3"
              onClick={async () => {
                try {
                  const user = await authService.signInWithGoogle();
                  login(user);
                  navigate('/');
                } catch (err) {
                  setError(err.message);
                }
              }}
            >
              Sign in with Google
            </Button>
            <div className="p-4 box mt-3 text-center">
                Don't have an account? <Link to="/register">Sign up</Link>
            </div>
        </Container>
    );
}

export default Login;

