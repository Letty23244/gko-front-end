// src/dashboard/page/AdminManagement.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form, Card, Pagination } from 'react-bootstrap';
import api from '../../Api/Api'; // ✅ Import the centralized API service

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    userName: '',
    emailAddress: '',
    contacts: '',
    role: '',
    password: '',
  });

  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 5;

  // isAuthenticated state is derived from localStorage, not managed here directly
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

  // Fetch admins function, memoized with useCallback.
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // ✅ Use api.admin.getAll() which uses axiosInstance with interceptors
      const res = await api.admin.getAll();
      if (res.success) {
        setAdmins(res.data);
      } else {
        setError(res.error.message || "Failed to fetch admins.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An unexpected error occurred while fetching admins.");
    } finally {
      setLoading(false);
    }
  }, []);

  // UseEffect to fetch admins on component mount if authenticated.
  useEffect(() => {
    if (isAuthenticated) {
      fetchAdmins();
    } else {
      setLoading(false); // If not authenticated, stop loading and show no data
      setError("Not authenticated. Please log in to view admin data.");
    }
  }, [fetchAdmins, isAuthenticated]);

  // handleLogin is removed from here as AuthPage handles it.
  // This component assumes authentication is done externally.

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      // ✅ Use api.admin.create() which uses axiosInstance with interceptors
      const res = await api.admin.create(newAdmin);
      if (res.success) {
        setMessage(res.data.message || 'Admin added successfully');
        fetchAdmins();
        setShowAddModal(false);
        setNewAdmin({ userName: '', emailAddress: '', contacts: '', role: '', password: '' });
      } else {
        setError(res.error.message || 'Failed to add admin');
      }
    } catch (err) {
      console.error("Add admin error:", err);
      setError('An unexpected error occurred while adding admin.');
    }
  };

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      // ✅ Use api.admin.update() which uses axiosInstance with interceptors
      const res = await api.admin.update(currentAdmin.id, currentAdmin);
      if (res.success) {
        setMessage(res.data.message || "Admin updated successfully");
        setAdmins((prev) => prev.map((admin) => (admin.id === currentAdmin.id ? currentAdmin : admin)));
        setShowEditModal(false);
      } else {
        setError(res.error.message || "Failed to update admin.");
      }
    } catch (err) {
      console.error("Edit admin error:", err);
      setError('An unexpected error occurred while updating admin.');
    }
  };

  const handleDelete = async () => {
    if (!adminToDelete) return;
    setError('');
    setMessage('');
    try {
      // ✅ Use api.admin.delete() which uses axiosInstance with interceptors
      const res = await api.admin.delete(adminToDelete.id);
      if (res.success) {
        setAdmins((prev) => prev.filter((admin) => admin.id !== adminToDelete.id));
        setMessage(res.data.message || "Admin deleted successfully");
        setShowDeleteConfirm(false);
        setAdminToDelete(null);
      } else {
        setError(res.error.message || "Failed to delete admin.");
      }
    } catch (err) {
      console.error("Delete admin error:", err);
      setError('An unexpected error occurred while deleting admin.');
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

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

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setAdmins([]);
    setMessage('Logged out successfully.');
    // Optionally, force a full page reload to ensure all state is reset
    window.location.reload(); 
  };

  return (
    <Card className="bg-gray-100 text-gray-800 p-6 max-w-4xl mx-auto my-8 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700">Admin Management</h3>

      {/* Removed the internal login form. Authentication is handled by AuthPage and DashboardLayout. */}
      {!isAuthenticated ? (
        <Alert variant="info" className="text-center">
          Please log in to manage admins. Redirecting to login page...
          {/* A small delay or a direct Navigate component can be added here if needed */}
        </Alert>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <Button
              variant="success"
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto mb-3 sm:mb-0 transition-transform duration-200 transform hover:scale-105"
            >
              + Add New Admin
            </Button>
            <Form.Control
              type="search"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64"
            />
            <Button variant="outline-danger" onClick={handleLogout} className="mt-3 sm:mt-0 transition-transform duration-200 transform hover:scale-105">
              Logout
            </Button>
          </div>

          {loading && (
            <div className="flex justify-center my-4">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <div className="overflow-x-auto rounded-lg shadow-inner">
            <Table striped bordered hover responsive className="min-w-full text-sm text-gray-600">
              <thead className="bg-gray-200">
                <tr className="text-left text-gray-700 uppercase tracking-wider">
                  <th>#</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Contacts</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.length > 0 ? (
                  currentAdmins.map((admin, index) => (
                    <tr key={admin.id || index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td>{indexOfFirstAdmin + index + 1}</td>
                      <td>{admin.userName}</td>
                      <td>{admin.emailAddress}</td>
                      <td>{admin.contacts}</td>
                      <td>{admin.role}</td>
                      <td className="flex space-x-2">
                        <Button
                          variant="warning"
                          size="sm"
                          className="transition-transform duration-200 transform hover:scale-110"
                          onClick={() => {
                            setCurrentAdmin(admin);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="transition-transform duration-200 transform hover:scale-110"
                          onClick={() => {
                            setAdminToDelete(admin);
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
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No admins found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {totalPages > 1 && renderPagination()}
        </>
      )}

      {/* Add Admin Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Form onSubmit={handleAddAdmin}>
          <Modal.Header closeButton className="bg-indigo-600 text-white">
            <Modal.Title>Add New Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {['userName', 'emailAddress', 'contacts', 'role', 'password'].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label className="font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </Form.Label>
                <Form.Control
                  type={field === 'password' ? 'password' : 'text'}
                  value={newAdmin[field]}
                  onChange={(e) => setNewAdmin({ ...newAdmin, [field]: e.target.value })}
                  required
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}`}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Admin
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Admin Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Form onSubmit={handleEditAdmin}>
          <Modal.Header closeButton className="bg-yellow-500 text-white">
            <Modal.Title>Edit Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {currentAdmin && ['userName', 'emailAddress', 'contacts', 'role'].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label className="font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={currentAdmin[field]}
                  onChange={(e) => setCurrentAdmin({ ...currentAdmin, [field]: e.target.value })}
                  required
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}`}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Admin
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Admin Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton className="bg-red-600 text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the admin user "{adminToDelete?.userName}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default AdminManagement;
