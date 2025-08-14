import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function LoginModal({ show, handleClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // New: to select Admin or Client
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select a role.');
      return;
    }

    try {
      const endpoint =
        role === 'admin'
          ? 'http://127.0.0.1:5000/api/v1/auth/login'
          : 'http://127.0.0.1:5000/api/v1/client/login'; // Adjust client login URL as needed

      const res = await axios.post(endpoint, {
        emailAddress: email, // or 'email' if your backend expects that for clients
        password,
      });

      // Store tokens and role
      localStorage.setItem('accessToken', res.data.access_token);
      localStorage.setItem('refreshToken', res.data.refresh_token);
      localStorage.setItem('userRole', role);

      if (onLoginSuccess) {
        onLoginSuccess(); // Notify parent component (e.g., to refresh UI or redirect)
      }

      handleClose(); // Close the modal
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{role === 'admin' ? 'Admin Login' : role === 'client' ? 'Client Login' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleLogin}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="role" className="mb-3">
            <Form.Label>Login As</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default LoginModal;
