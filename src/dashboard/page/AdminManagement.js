// src/dashboard/page/AdminManagement.jsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form, Card, Pagination } from 'react-bootstrap';
import api from '../../Api/Api';

// Constants
const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin'
};

const AdminManagement = () => {
    // State management
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [newAdmin, setNewAdmin] = useState({
        userName: '',
        emailAddress: '',
        contacts: '',
        role: ROLES.ADMIN,
        password: '',
    });
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [adminToDelete, setAdminToDelete] = useState(null);

    // Search & pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const adminsPerPage = 5;

    // Auth
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState(null);

    // Authentication check
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const role = localStorage.getItem('userRole');
        setIsAuthenticated(!!token);
        setCurrentUserRole(role);
    }, []);

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

    // Permission helpers
    const isSuperAdmin = currentUserRole === ROLES.SUPER_ADMIN;
    const isAdmin = currentUserRole === ROLES.ADMIN;
    const hasAccess = isAuthenticated && (isSuperAdmin || isAdmin);

    const canEditAdmin = useCallback(() => isSuperAdmin, [isSuperAdmin]);
    const canDeleteAdmin = useCallback(() => isSuperAdmin, [isSuperAdmin]);

    // Fetch admins
    const fetchAdmins = useCallback(async () => {
        setLoading(true);
        setError('');

        if (!isAuthenticated || (!isSuperAdmin && !isAdmin)) {
            setError("You do not have permission to view admin data.");
            setLoading(false);
            return;
        }

        try {
            const res = await api.admin.getAll();
            if (res.success) {
                setAdmins(res.data || []);
            } else {
                setError(res.error?.message || "Failed to fetch admins.");
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred while fetching admins.");
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, isSuperAdmin, isAdmin]);

    useEffect(() => {
        if (isAuthenticated && currentUserRole) {
            fetchAdmins();
        }
    }, [fetchAdmins, isAuthenticated, currentUserRole]);

    // Form validation
    const validateAdminForm = (admin, isEdit = false) => {
        const requiredFields = ['userName', 'emailAddress', 'contacts'];
        if (!isEdit) requiredFields.push('password');

        for (const field of requiredFields) {
            if (!admin[field]?.trim()) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        }

        if (!isEdit) {
            const duplicate = admins.some(
                a => a.emailAddress?.toLowerCase() === admin.emailAddress?.toLowerCase() ||
                     a.userName?.toLowerCase() === admin.userName?.toLowerCase()
            );
            if (duplicate) return 'An admin with this email or username already exists.';
        }

        return null;
    };

    // Add admin
    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        const validationError = validateAdminForm(newAdmin);
        if (validationError) {
            setError(validationError);
            setIsSubmitting(false);
            return;
        }

        try {
            const roleToSet = isSuperAdmin ? newAdmin.role : ROLES.ADMIN;
            const res = await api.admin.create({ ...newAdmin, role: roleToSet });

            if (res.success) {
                setMessage(res.data?.message || `Admin '${newAdmin.userName}' added successfully.`);
                fetchAdmins();
                setShowAddModal(false);
                setNewAdmin({ userName: '', emailAddress: '', contacts: '', role: ROLES.ADMIN, password: '' });
            } else {
                setError(res.error?.message || 'Failed to add admin.');
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred while adding admin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Edit admin
    const handleEditAdmin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        if (!currentAdmin) return setIsSubmitting(false);

        const validationError = validateAdminForm(currentAdmin, true);
        if (validationError) {
            setError(validationError);
            setIsSubmitting(false);
            return;
        }

        if (!isSuperAdmin && currentAdmin.role === ROLES.SUPER_ADMIN) {
            setError("You do not have permission to edit Super Admin details.");
            setIsSubmitting(false);
            return;
        }

        try {
            const roleToSet = isSuperAdmin ? currentAdmin.role : ROLES.ADMIN;
            const res = await api.admin.update(currentAdmin.id, { ...currentAdmin, role: roleToSet });

            if (res.success) {
                setMessage(res.data?.message || "Admin updated successfully.");
                fetchAdmins();
                setShowEditModal(false);
            } else {
                setError(res.error?.message || "Failed to update admin.");
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred while updating admin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete admin
    const handleDelete = async () => {
        if (!adminToDelete) return;
        setError('');
        setMessage('');
        setIsSubmitting(true);

        if (!isSuperAdmin) {
            setError("You do not have permission to delete admins.");
            setShowDeleteConfirm(false);
            setAdminToDelete(null);
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await api.admin.delete(adminToDelete.id);
            if (res.success) {
                setAdmins(prev => prev.filter(a => a.id !== adminToDelete.id));
                setMessage(res.data?.message || "Admin deleted successfully");
                setShowDeleteConfirm(false);
                setAdminToDelete(null);
            } else {
                setError(res.error?.message || "Failed to delete admin.");
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred while deleting admin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Pagination
    const filteredAdmins = useMemo(() =>
        admins.filter(admin =>
            admin.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.contacts?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.role?.toLowerCase().includes(searchTerm.toLowerCase())
        ), [admins, searchTerm]
    );

    const currentAdmins = useMemo(() => {
        const start = (currentPage - 1) * adminsPerPage;
        return filteredAdmins.slice(start, start + adminsPerPage);
    }, [filteredAdmins, currentPage]);

    const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPagination = () => (
        <Pagination className="justify-content-center mt-3">
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages).keys()].map(n => (
                <Pagination.Item
                    key={n + 1}
                    active={n + 1 === currentPage}
                    onClick={() => paginate(n + 1)}
                >
                    {n + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
    );

    // Logout
    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setCurrentUserRole(null);
        setAdmins([]);
        window.location.reload();
    };

    // Early return if no access
    if (!hasAccess) {
        return (
            <Card className="bg-gray-100 text-gray-800 p-6 max-w-4xl mx-auto my-8 rounded-xl shadow-lg">
                <Alert variant="danger" className="text-center">
                    <p>Access Denied! 🚫 You must be logged in as Admin or Super Admin.</p>
                    <Button variant="primary" onClick={() => window.location.href = '/login'}>Go to Login</Button>
                </Alert>
            </Card>
        );
    }

    // --- Render UI ---
    return (
        <Card className="bg-gray-100 text-gray-800 p-6 max-w-4xl mx-auto my-8 rounded-xl shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-center text-indigo-700">Admin Management</h3>
            {/* Rest of UI: buttons, search, table, modals */}
            {/* You can reuse your existing JSX for table, modals, etc., just the logic above is fixed */}
        </Card>
    );
};

export default AdminManagement;
