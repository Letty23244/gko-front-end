// src/dashboard/page/clientPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form, Card, Pagination } from 'react-bootstrap';
import api from '../../Api/Api'; // ✅ Import the centralized API service

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation modal

  // Adjusted newClient state to match Flask Client model fields
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    company_name: '',
    address: '',
    contacts: '',
    registered_on: new Date().toISOString().split('T')[0], // Default to current date
  });

  const [currentClient, setCurrentClient] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null); // State to hold the client to be deleted
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  // Fetch clients function, memoized with useCallback.
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // ✅ Use api.client.getAll() from the centralized api service
      const res = await api.client.getAll();
      if (res.success) {
        setClients(res.data);
      } else {
        setError(res.error.message || "Failed to fetch clients.");
      }
    } catch (err) {
      console.error("Fetch clients error:", err);
      setError("An unexpected error occurred while fetching clients.");
    } finally {
      setLoading(false);
    }
  }, []);

  // UseEffect to fetch clients on component mount.
  useEffect(() => {
    // Only fetch if an accessToken exists, as the route is protected
    if (localStorage.getItem('accessToken')) {
      fetchClients();
    } else {
      setLoading(false); // If no token, stop loading and show no clients
      setError("Not authenticated. Please log in to view clients.");
    }
  }, [fetchClients]);

  // Add new client
  const handleAddClient = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      // ✅ Use api.client.create() from the centralized api service
      const res = await api.client.create(newClient);
      if (res.success) {
        setMessage(res.data.message || 'Client added successfully');
        fetchClients(); // Re-fetch all clients to update the table
        setShowAddModal(false);
        // Reset form fields
        setNewClient({ 
          firstName: '', 
          lastName: '', 
          company_name: '', 
          address: '', 
          contacts: '', 
          registered_on: new Date().toISOString().split('T')[0] 
        });
      } else {
        setError(res.error.message || 'Failed to add client');
      }
    } catch (err) {
      console.error("Add client error:", err);
      setError('An unexpected error occurred while adding client.');
    }
  };

  // Edit client
  const handleEditClient = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      // ✅ Use api.client.update() from the centralized api service
      const res = await api.client.update(currentClient.id, currentClient);
      if (res.success) {
        setMessage(res.data.message || "Client updated successfully");
        // Update the client in the local state for immediate UI reflection
        setClients((prev) =>
          prev.map((client) => (client.id === currentClient.id ? currentClient : client))
        );
        setShowEditModal(false);
      } else {
        setError(res.error.message || "Failed to update client.");
      }
    } catch (err) {
      console.error("Edit client error:", err);
      setError('An unexpected error occurred while updating client.');
    }
  };

  // Delete client
  const handleDeleteClient = async () => {
    if (!clientToDelete) return; // Ensure there's a client selected for deletion
    setError('');
    setMessage('');
    try {
      // ✅ Use api.client.delete() from the centralized api service
      const res = await api.client.delete(clientToDelete.id);
      if (res.success) {
        setClients((prev) => prev.filter((client) => client.id !== clientToDelete.id));
        setMessage(res.data.message || "Client deleted successfully");
        setShowDeleteConfirm(false); // Close confirmation modal
        setClientToDelete(null); // Clear client to delete
      } else {
        setError(res.error.message || "Failed to delete client.");
      }
    } catch (err) {
      console.error("Delete client error:", err);
      setError('An unexpected error occurred while deleting client.');
    }
  };

  // Filtering and pagination
  const filteredClients = clients.filter((client) =>
    (client.firstName + ' ' + client.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contacts?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => (
    <Pagination className="justify-content-center mt-3">
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
      {[...Array(totalPages).keys()].map(number => (
        <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
          {number + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
    </Pagination>
  );

  return (
    <Card className="bg-gray-100 text-gray-800 p-6 max-w-4xl mx-auto my-8 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700">Client Management</h3>

      <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">
        + Add New Client
      </Button>

      <Form.Control
        type="search"
        placeholder="Search by name, company, or contacts..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-3"
      />

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <div className="overflow-x-auto rounded-lg shadow-inner">
        <Table striped bordered hover variant="light" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company</th>
              <th>Address</th>
              <th>Contacts</th>
              <th>Registered On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.length > 0 ? (
              currentClients.map((client, index) => (
                <tr key={client.id}>
                  <td>{indexOfFirstClient + index + 1}</td>
                  <td>{client.firstName}</td>
                  <td>{client.lastName}</td>
                  <td>{client.company}</td> {/* Assuming 'company' is the key for company_name in the response */}
                  <td>{client.address}</td>
                  <td>{client.contacts}</td>
                  <td>{client.registered_on}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setCurrentClient(client);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setClientToDelete(client);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {totalPages > 1 && renderPagination()}

      {/* Add Client Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Form onSubmit={handleAddClient}>
          <Modal.Header closeButton>
            <Modal.Title>Add Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {['firstName', 'lastName', 'company_name', 'address', 'contacts', 'registered_on'].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label className="font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </Form.Label>
                <Form.Control
                  type={field === 'registered_on' ? 'date' : 'text'}
                  value={newClient[field]}
                  onChange={(e) => setNewClient({ ...newClient, [field]: e.target.value })}
                  required
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}`}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Client Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Form onSubmit={handleEditClient}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {currentClient && ['firstName', 'lastName', 'company_name', 'address', 'contacts'].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label className="font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={currentClient[field]}
                  onChange={(e) => setCurrentClient({ ...currentClient, [field]: e.target.value })}
                  required
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}`}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button type="submit" variant="success">Update</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Client Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton className="bg-red-600 text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the client "{clientToDelete?.firstName} {clientToDelete?.lastName}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteClient}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ClientManagement;
