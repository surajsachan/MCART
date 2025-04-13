import React, { useState, useContext } from 'react';
import authService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Form, Container, FloatingLabel, Button } from "react-bootstrap";

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true)
        try {
            await authService.register(email, password);
            await authService.login(email, password);
            login(await authService.getCurrentUser());
            navigate('/');
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container style={{ width: "400px" }}>
            <div className="p-4 box">
                <h2 className="mb-3">Signup</h2>
                <Form onSubmit={handleSubmit}>

                <FloatingLabel
                    controlId="formBasicName"
                    label="Name"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="formBasicEmail"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="formBasicPassword"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" />
                </FloatingLabel>

                <div className="d-grid gap-2">
                    <Button type='submit' disabled={loading}>{loading? "Registering..." : "Register"}</Button>
                    {message && <p>{message}</p>}
                </div>
                </Form>
            </div>
            <div className="p-4 box mt-3 text-center">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </Container>
    )
}

export default RegisterForm