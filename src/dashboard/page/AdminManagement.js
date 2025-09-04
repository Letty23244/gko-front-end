// src/dashboard/page/AdminManagement.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form, Card, Pagination } from 'react-bootstrap';
import api from '../../Api/Api';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [newAdmin, setNewAdmin] = useState({
        userName: '',
        emailAddress: '',
        contacts: '',
        role: 'admin',
        password: '',
    });

    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const adminsPerPage = 5;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const role = localStorage.getItem('userRole');
        setIsAuthenticated(!!token);
        setCurrentUserRole(role);
    }, []);

    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                setMessage('');
                setError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, error]);

    const fetchAdmins = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            if (!isAuthenticated || (currentUserRole !== 'super_admin' && currentUserRole !== 'admin')) {
                setError("You do not have permission to view admin data.");
                setLoading(false);
                return;
            }
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
    }, [isAuthenticated, currentUserRole]);

    useEffect(() => {
        if (isAuthenticated !== false && currentUserRole !== null) {
            fetchAdmins();
        }
    }, [fetchAdmins, isAuthenticated, currentUserRole]);

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        if (!newAdmin.userName || !newAdmin.emailAddress || !newAdmin.contacts || !newAdmin.password) {
            setError('All fields are required.');
            setIsSubmitting(false);
            return;
        }

        const isDuplicate = admins.some(
            (admin) =>
                admin.emailAddress?.toLowerCase() === newAdmin.emailAddress?.toLowerCase() ||
                admin.userName?.toLowerCase() === newAdmin.userName?.toLowerCase()
        );
        if (isDuplicate) {
            setError('An admin with this email or username already exists.');
            setIsSubmitting(false);
            return;
        }

        try {
            const roleToSet = currentUserRole === 'super_admin' ? newAdmin.role : 'admin';
            const payload = { ...newAdmin, role: roleToSet };
            
            const res = await api.admin.create(payload);

            if (res.success) {
                setMessage(res.data.message || `Admin '${newAdmin.userName}' added successfully.`);
                fetchAdmins();
                setShowAddModal(false);
                setNewAdmin({ userName: '', emailAddress: '', contacts: '', role: 'admin', password: '' });
            } else {
                setError(res.error.message || 'Failed to add admin.');
            }
        } catch (err) {
            console.error("Add admin error:", err);
            setError('An unexpected error occurred while adding admin.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleEditAdmin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        if (!currentAdmin) {
            setIsSubmitting(false);
            return;
        }

        if (currentUserRole !== 'super_admin' && currentAdmin.role === 'super_admin') {
            setError("You do not have permission to edit Super Admin details.");
            setIsSubmitting(false);
            return;
        }

        try {
            const roleToSet = currentUserRole === 'super_admin' ? currentAdmin.role : 'admin';
            const payload = { ...currentAdmin, role: roleToSet };

            const res = await api.admin.update(currentAdmin.id, payload);
            if (res.success) {
                setMessage(res.data.message || "Admin updated successfully");
                fetchAdmins();
                setShowEditModal(false);
            } else {
                setError(res.error.message || "Failed to update admin.");
            }
        } catch (err) {
            console.error("Edit admin error:", err);
            setError('An unexpected error occurred while updating admin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!adminToDelete) return; 
        setError('');
        setMessage('');
        setIsSubmitting(true);

        if (currentUserRole !== 'super_admin') {
            setError("You do not have permission to delete admins.");
            setShowDeleteConfirm(false); 
            setAdminToDelete(null);
            setIsSubmitting(false);
            return;
        }

        try {
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
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredAdmins = admins.filter((admin) =>
        admin.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.contacts?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        setCurrentUserRole(null);
        setAdmins([]);
        setMessage('Logged out successfully.');
        window.location.reload();
    };

    const canEditAdmin = (targetAdmin) => currentUserRole === 'super_admin';
    const canDeleteAdmin = (targetAdmin) => currentUserRole === 'super_admin';

    return (
        <Card className="bg-gray-100 text-gray-800 p-6 max-w-4xl mx-auto my-8 rounded-xl shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700">Admin Management</h3>

            {!isAuthenticated || (currentUserRole !== 'super_admin' && currentUserRole !== 'admin') ? (
                <Alert variant="danger" className="text-center rounded-lg shadow-md animate-fade-in">
                    <p className="font-semibold text-lg">Access Denied! 🚫</p>
                    <p className="text-md">You must be logged in as an <span className="font-bold text-indigo-700">Admin</span> or <span className="font-bold text-indigo-700">Super Admin</span> to view this page. Please log in with appropriate credentials.</p>
                    <Button variant="primary" onClick={() => window.location.href = '/login'} className="mt-4 px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">Go to Login</Button>
                </Alert>
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-3 sm:space-y-0">
                        {currentUserRole === 'super_admin' && (
                            <Button
                                variant="success"
                                onClick={() => setShowAddModal(true)}
                                className="w-full sm:w-auto transition-transform duration-200 transform hover:scale-105 rounded-lg shadow-md"
                                disabled={loading}
                            >
                                + Add New Admin
                            </Button>
                        )}
                        <Form.Control
                            type="search"
                            placeholder="Search by name, email, contacts or role..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full sm:w-64 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <Button variant="outline-danger" onClick={handleLogout} className="transition-transform duration-200 transform hover:scale-105 rounded-lg shadow-md">
                            Logout
                        </Button>
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
                                    <th className="p-3">User Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Contacts</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAdmins.length > 0 ? (
                                    currentAdmins.map((admin, index) => (
                                        <tr key={admin.id || index} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="p-3">{indexOfFirstAdmin + index + 1}</td>
                                            <td className="p-3">{admin.userName}</td>
                                            <td className="p-3">{admin.emailAddress}</td>
                                            <td className="p-3">{admin.contacts}</td>
                                            <td className="p-3">{admin.role}</td>
                                            <td className="p-3 flex space-x-2">
                                                {canEditAdmin(admin) && (
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        className="transition-transform duration-200 transform hover:scale-110 rounded-md shadow-sm"
                                                        onClick={() => {
                                                            setCurrentAdmin(admin);
                                                            setShowEditModal(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )}
                                                {canDeleteAdmin(admin) && (
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        className="transition-transform duration-200 transform hover:scale-110 rounded-md shadow-sm"
                                                        onClick={() => {
                                                            setAdminToDelete(admin);
                                                            setShowDeleteConfirm(true);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                                {!canEditAdmin(admin) && !canDeleteAdmin(admin) && (
                                                    <span className="text-gray-500 italic">No actions available</span>
                                                )}
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

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Form onSubmit={handleAddAdmin}>
                    <Modal.Header closeButton className="bg-indigo-600 text-white rounded-t-lg">
                        <Modal.Title>Add New Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        {error && <Alert variant="danger" className="rounded-lg">{error}</Alert>}
                        {['userName', 'emailAddress', 'contacts', 'password'].map((field) => (
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
                                    className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                        ))}
                        {currentUserRole === 'super_admin' && (
                            <Form.Group className="mb-3">
                                <Form.Label className="font-medium text-gray-700">Role</Form.Label>
                                <Form.Select
                                    value={newAdmin.role}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                                    required
                                    className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={isSubmitting}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </Form.Select>
                            </Form.Group>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="rounded-b-lg">
                        <Button variant="secondary" onClick={() => setShowAddModal(false)} className="rounded-md shadow-sm hover:scale-105" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" className="rounded-md shadow-sm hover:scale-105" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Save Admin'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Form onSubmit={handleEditAdmin}>
                    <Modal.Header closeButton className="bg-yellow-500 text-white rounded-t-lg">
                        <Modal.Title>Edit Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        {error && <Alert variant="danger" className="rounded-lg">{error}</Alert>}
                        {currentAdmin && ['userName', 'emailAddress', 'contacts'].map((field) => (
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
                                    className="rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                                    disabled={!canEditAdmin(currentAdmin) || isSubmitting}
                                />
                            </Form.Group>
                        ))}
                        {currentAdmin && (currentUserRole === 'super_admin') && (
                            <Form.Group className="mb-3">
                                <Form.Label className="font-medium text-gray-700">Role</Form.Label>
                                <Form.Select
                                    value={currentAdmin.role}
                                    onChange={(e) => setCurrentAdmin({ ...currentAdmin, role: e.target.value })}
                                    required
                                    className="rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                                    disabled={!canEditAdmin(currentAdmin) || isSubmitting}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </Form.Select>
                            </Form.Group>
                        )}
                        {currentAdmin && (currentUserRole !== 'super_admin') && (
                            <Form.Group className="mb-3">
                                <Form.Label className="font-medium text-gray-700">Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentAdmin.role}
                                    disabled
                                    className="rounded-md shadow-sm"
                                />
                            </Form.Group>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="rounded-b-lg">
                        <Button variant="secondary" onClick={() => setShowEditModal(false)} className="rounded-md shadow-sm hover:scale-105" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="rounded-md shadow-sm hover:scale-105"
                            disabled={!canEditAdmin(currentAdmin) || isSubmitting}
                        >
                            {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Update Admin'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
                <Modal.Header closeButton className="bg-red-600 text-white rounded-t-lg">
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    Are you sure you want to delete the admin user "<span className="font-bold">{adminToDelete?.userName}</span>"? This action cannot be undone.

                    {adminToDelete?.role === 'super_admin' && currentUserRole !== 'super_admin' && (
                        <Alert variant="danger" className="mt-3 rounded-lg">
                            <p className="font-semibold">Warning:</p>
                            <p>You are not authorized to delete a Super Admin.</p>
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer className="rounded-b-lg">
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)} className="rounded-md shadow-sm hover:scale-105" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        className="rounded-md shadow-sm hover:scale-105"
                        disabled={!canDeleteAdmin(adminToDelete) || isSubmitting}
                    >
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default AdminManagement;