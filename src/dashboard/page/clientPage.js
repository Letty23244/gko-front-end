// src/dashboard/page/clientPage.jsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form, Card, Pagination } from 'react-bootstrap';
import api from '../../Api/Api';

const ClientManagement = () => {
  // State management
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    company_name: '',
    address: '',
    contacts: '',
    registered_on: new Date().toISOString().split('T')[0],
  });

  const [currentClient, setCurrentClient] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  // Field configurations
  const clientFields = [
    { key: 'firstName', label: 'First Name', type: 'text', required: true },
    { key: 'lastName', label: 'Last Name', type: 'text', required: true },
    { key: 'company_name', label: 'Company Name', type: 'text', required: false },
    { key: 'address', label: 'Address', type: 'text', required: false },
    { key: 'contacts', label: 'Contacts', type: 'text', required: true },
    { key: 'registered_on', label: 'Registered On', type: 'date', required: false }
  ];

  const editClientFields = clientFields.filter(field => field.key !== 'registered_on');

  // Auto-clear messages
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  // Data fetching
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (!localStorage.getItem('accessToken')) {
        setError("Not authenticated. Please log in to view clients.");
        setLoading(false);
        return;
      }

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

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Form validation
  const validateClientForm = (client, isEdit = false) => {
    const requiredFields = clientFields.filter(field => field.required).map(field => field.key);
    
    for (const field of requiredFields) {
      if (!client[field]?.trim()) {
        return `${field.replace('_', ' ')} is required.`;
      }
    }

    // Additional validation for contacts
    if (client.contacts && !/^[\d\s+\-()]+$/.test(client.contacts)) {
      return 'Please enter a valid contact number.';
    }

    return null;
  };

  // CRUD operations
  const handleAddClient = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    const validationError = validateClientForm(newClient);
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await api.client.create(newClient);
      if (res.success) {
        setMessage(res.data.message || 'Client added successfully');
        fetchClients();
        handleCloseAddModal();
      } else {
        setError(res.error.message || 'Failed to add client');
      }
    } catch (err) {
      console.error("Add client error:", err);
      setError('An unexpected error occurred while adding client.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClient = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    if (!currentClient) {
      setIsSubmitting(false);
      return;
    }

    const validationError = validateClientForm(currentClient, true);
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await api.client.update(currentClient.id, currentClient);
      if (res.success) {
        setMessage(res.data.message || "Client updated successfully");
        setClients(prev => prev.map(client => 
          client.id === currentClient.id ? currentClient : client
        ));
        handleCloseEditModal();
      } else {
        setError(res.error.message || "Failed to update client.");
      }
    } catch (err) {
      console.error("Edit client error:", err);
      setError('An unexpected error occurred while updating client.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;
    
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const res = await api.client.delete(clientToDelete.id);
      if (res.success) {
        setClients(prev => prev.filter(client => client.id !== clientToDelete.id));
        setMessage(res.data.message || "Client deleted successfully");
        handleCloseDeleteModal();
      } else {
        setError(res.error.message || "Failed to delete client.");
      }
    } catch (err) {
      console.error("Delete client error:", err);
      setError('An unexpected error occurred while deleting client.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal handlers
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewClient({
      firstName: '',
      lastName: '',
      company_name: '',
      address: '',
      contacts: '',
      registered_on: new Date().toISOString().split('T')[0],
    });
    setError('');
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentClient(null);
    setError('');
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirm(false);
    setClientToDelete(null);
    setError('');
  };

  // Search and pagination
  const filteredClients = useMemo(() => 
    clients.filter(client =>
      (client.firstName + ' ' + client.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contacts?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [clients, searchTerm]
  );

  const currentClients = useMemo(() => {
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    return filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  }, [filteredClients, currentPage, clientsPerPage]);

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => (
    <Pagination className="justify-content-center mt-3">
      <Pagination.Prev 
        onClick={() => paginate(currentPage - 1)} 
        disabled={currentPage === 1} 
      />
      {[...Array(totalPages).keys()].map(number => (
        <Pagination.Item 
          key={number + 1} 
          active={number + 1 === currentPage} 
          onClick={() => paginate(number + 1)}
        >
          {number + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next 
        onClick={() => paginate(currentPage + 1)} 
        disabled={currentPage === totalPages} 
      />
    </Pagination>
  );

  // Render form fields helper
  const renderFormFields = (fields, client, onChange, disabled = false) => 
    fields.map(({ key, label, type, required }) => (
      <Form.Group key={key} className="mb-3">
        <Form.Label className="font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Form.Label>
        <Form.Control
          type={type}
          value={client[key] || ''}
          onChange={(e) => onChange({ ...client, [key]: e.target.value })}
          required={required}
          placeholder={`Enter ${label}`}
          className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          disabled={disabled}
        />
      </Form.Group>
    ));

  return (
    <Card className="bg-gray-100 text-gray-800 p-6 max-w-6xl mx-auto my-8 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700">Client Management</h3>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-3 sm:space-y-0">
        <Button 
          variant="primary" 
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto transition-transform duration-200 transform hover:scale-105 rounded-lg shadow-md"
          disabled={loading}
        >
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
          className="w-full sm:w-64 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {loading && (
        <div className="flex justify-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      
      {error && <Alert variant="danger" className="rounded-lg shadow-md">{error}</Alert>}
      {message && <Alert variant="success" className="rounded-lg shadow-md">{message}</Alert>}

      <div className="overflow-x-auto rounded-lg shadow-inner border border-gray-200">
        <Table striped bordered hover responsive className="min-w-full text-sm text-gray-600 rounded-lg">
          <thead className="bg-gray-200">
            <tr className="text-left text-gray-700 uppercase tracking-wider">
              <th className="p-3">#</th>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Company</th>
              <th className="p-3">Address</th>
              <th className="p-3">Contacts</th>
              <th className="p-3">Registered On</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.length > 0 ? (
              currentClients.map((client, index) => (
                <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{(currentPage - 1) * clientsPerPage + index + 1}</td>
                  <td className="p-3 font-medium">{client.firstName}</td>
                  <td className="p-3 font-medium">{client.lastName}</td>
                  <td className="p-3">{client.company_name || '-'}</td>
                  <td className="p-3">{client.address || '-'}</td>
                  <td className="p-3">{client.contacts}</td>
                  <td className="p-3">{client.registered_on || '-'}</td>
                  <td className="p-3 flex space-x-2">
                    <Button
                      variant="warning"
                      size="sm"
                      className="transition-transform duration-200 transform hover:scale-110 rounded-md shadow-sm"
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
                      className="transition-transform duration-200 transform hover:scale-110 rounded-md shadow-sm"
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
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  {searchTerm ? 'No clients match your search.' : 'No clients found.'}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      
      {totalPages > 1 && renderPagination()}

      {/* Add Client Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Form onSubmit={handleAddClient}>
          <Modal.Header closeButton className="bg-indigo-600 text-white rounded-t-lg">
            <Modal.Title>Add New Client</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            {error && <Alert variant="danger" className="rounded-lg">{error}</Alert>}
            {renderFormFields(clientFields, newClient, setNewClient, isSubmitting)}
          </Modal.Body>
          <Modal.Footer className="rounded-b-lg">
            <Button 
              variant="secondary" 
              onClick={handleCloseAddModal}
              className="rounded-md shadow-sm hover:scale-105"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              className="rounded-md shadow-sm hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Save Client'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Client Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Form onSubmit={handleEditClient}>
          <Modal.Header closeButton className="bg-yellow-500 text-white rounded-t-lg">
            <Modal.Title>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            {error && <Alert variant="danger" className="rounded-lg">{error}</Alert>}
            {currentClient && renderFormFields(editClientFields, currentClient, setCurrentClient, isSubmitting)}
          </Modal.Body>
          <Modal.Footer className="rounded-b-lg">
            <Button 
              variant="secondary" 
              onClick={handleCloseEditModal}
              className="rounded-md shadow-sm hover:scale-105"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              className="rounded-md shadow-sm hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Update Client'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton className="bg-red-600 text-white rounded-t-lg">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          Are you sure you want to delete the client "<span className="font-bold">{clientToDelete?.firstName} {clientToDelete?.lastName}</span>"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer className="rounded-b-lg">
          <Button 
            variant="secondary" 
            onClick={handleCloseDeleteModal}
            className="rounded-md shadow-sm hover:scale-105"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteClient}
            className="rounded-md shadow-sm hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ClientManagement;