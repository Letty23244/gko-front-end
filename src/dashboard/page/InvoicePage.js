import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Button, Modal, Form, Card } from 'react-bootstrap';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
      invoice_date: '',
  amount_paid: '',
  amount_due: '',
  due_date: '',
  status: '',
  client_id: ''
  });

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/v1/invoices', {
          headers: { Authorization: `Bearer ${token}` },
        });
        axios.get("http://127.0.0.1:5000/api/v1/invoices", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true  // ✅ needed if you're using cookies
        });
        setInvoices(res.data.invoices || res.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch invoices.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [token]);

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/v1/invoices/register', newInvoice, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(prev => [...prev, res.data.invoice || newInvoice]);
      setShowAddModal(false);
      setNewInvoice({ clientName: '', amount: '', dueDate: '', status: '' });
    } catch (err) {
      setError('Failed to add invoice.');
    }
  };

  return (
  <Card style={{ padding: '1.5rem', maxWidth: '900px', margin: 'auto' }}>
    <h3>Invoices & Payments</h3>

    <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">
      + Add New Invoice
    </Button>

    {loading && <Spinner animation="border" />}
    {error && <Alert variant="danger">{error}</Alert>}

    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Invoice Date</th>
          <th>Amount Paid</th>
          <th>Amount Due</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Client ID</th>
        </tr>
      </thead>
      <tbody>
        {invoices.length ? (
          invoices.map((invoice, idx) => (
            <tr key={invoice.id || idx}>
              <td>{idx + 1}</td>
              <td>{invoice.invoice_date}</td>
              <td>{invoice.amount_paid}</td>
              <td>{invoice.amount_due}</td>
              <td>{invoice.due_date}</td>
              <td>{invoice.status}</td>
              <td>{invoice.client_id}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">No invoices found.</td>
          </tr>
        )}
      </tbody>
    </Table>

    {/* Add Invoice Modal */}
    <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
      <Form onSubmit={handleAddInvoice}>
        <Modal.Header closeButton>
          <Modal.Title>Add Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Invoice Date</Form.Label>
            <Form.Control
              type="date"
              value={newInvoice.invoice_date}
              onChange={e => setNewInvoice({ ...newInvoice, invoice_date: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="number"
              value={newInvoice.amount_paid}
              onChange={e => setNewInvoice({ ...newInvoice, amount_paid: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Amount Due</Form.Label>
            <Form.Control
              type="number"
              value={newInvoice.amount_due}
              onChange={e => setNewInvoice({ ...newInvoice, amount_due: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={newInvoice.due_date}
              onChange={e => setNewInvoice({ ...newInvoice, due_date: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={newInvoice.status}
              onChange={e => setNewInvoice({ ...newInvoice, status: e.target.value })}
              required
            >
              <option value="">Select status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Client ID</Form.Label>
            <Form.Control
              type="number"
              value={newInvoice.client_id}
              onChange={e => setNewInvoice({ ...newInvoice, client_id: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button type="submit" variant="primary">Save Invoice</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </Card>
);
}
export default Invoices;
