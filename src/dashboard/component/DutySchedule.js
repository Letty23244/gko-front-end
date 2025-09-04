// src/dashboard/page/DutySchedulePage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Spinner, Alert, Modal, Form, Card, Pagination } from 'react-bootstrap';
import api from '../../Api/Api';

const DutyScheduleManagement = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [newSchedule, setNewSchedule] = useState({
    guard_id: '',
    station_id: '',
    shift_date: new Date().toISOString().split('T')[0],
    start_time: '',
    end_time: '',
    shift_type: '',
  });

  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const schedulesPerPage = 5;

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.duty_schedules.getAll();
      if (res.success) setSchedules(res.data);
      else setError(res.error.message || 'Failed to fetch schedules');
    } catch (err) {
      console.error('Fetch schedules error:', err);
      setError('An unexpected error occurred while fetching schedules.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Add schedule
  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await api.duty_schedules.create(newSchedule);
      if (res.success) {
        setMessage('Duty schedule added successfully');
        fetchSchedules();
        setShowAddModal(false);
        setNewSchedule({
          guard_id: '',
          station_id: '',
          shift_date: new Date().toISOString().split('T')[0],
          start_time: '',
          end_time: '',
          shift_type: '',
        });
      } else setError(res.error.message || 'Failed to add schedule');
    } catch (err) {
      console.error('Add schedule error:', err);
      setError('Unexpected error occurred while adding schedule.');
    }
  };

  // Edit schedule
  const handleEdit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await api.duty_schedules.update(currentSchedule.id, currentSchedule);
      if (res.success) {
        setMessage('Schedule updated successfully');
        setSchedules((prev) =>
          prev.map((s) => (s.id === currentSchedule.id ? currentSchedule : s))
        );
        setShowEditModal(false);
      } else setError(res.error.message || 'Failed to update schedule');
    } catch (err) {
      console.error('Edit schedule error:', err);
      setError('Unexpected error occurred while updating schedule.');
    }
  };

  // Delete schedule
  const handleDelete = async () => {
    if (!scheduleToDelete) return;
    setError('');
    setMessage('');
    try {
      const res = await api.duty_schedules.delete(scheduleToDelete.id);
      if (res.success) {
        setSchedules((prev) => prev.filter((s) => s.id !== scheduleToDelete.id));
        setMessage('Schedule deleted successfully');
        setShowDeleteConfirm(false);
        setScheduleToDelete(null);
      } else setError(res.error.message || 'Failed to delete schedule');
    } catch (err) {
      console.error('Delete schedule error:', err);
      setError('Unexpected error occurred while deleting schedule.');
    }
  };

  // Filter and paginate
  const filteredSchedules = schedules.filter(
    (s) =>
      s.guard_id?.toString().includes(searchTerm) ||
      s.station_id?.toString().includes(searchTerm) ||
      s.shift_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * schedulesPerPage;
  const indexOfFirst = indexOfLast - schedulesPerPage;
  const currentSchedules = filteredSchedules.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSchedules.length / schedulesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => (
    <Pagination className="justify-content-center mt-3">
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
      {[...Array(totalPages).keys()].map((num) => (
        <Pagination.Item
          key={num + 1}
          active={num + 1 === currentPage}
          onClick={() => paginate(num + 1)}
        >
          {num + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
    </Pagination>
  );

  return (
    <Card className="p-4 max-w-5xl mx-auto my-6 shadow-lg rounded-lg">
      <h3 className="text-center text-2xl font-bold text-indigo-700 mb-4">
        Duty Schedule Management
      </h3>

      <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">
        + Add Schedule
      </Button>

      <Form.Control
        type="search"
        placeholder="Search by Guard ID, Station ID, or Shift..."
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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Guard ID</th>
              <th>Station ID</th>
              <th>Shift Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Shift Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSchedules.length > 0 ? (
              currentSchedules.map((s, index) => (
                <tr key={s.id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{s.guard_id}</td>
                  <td>{s.station_id}</td>
                  <td>{s.shift_date}</td>
                  <td>{s.start_time}</td>
                  <td>{s.end_time}</td>
                  <td>{s.shift_type}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setCurrentSchedule(s);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setScheduleToDelete(s);
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
                  No schedules found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {totalPages > 1 && renderPagination()}

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Form onSubmit={handleAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Duty Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {['guard_id', 'station_id', 'shift_date', 'start_time', 'end_time', 'shift_type'].map((field) => (
              <Form.Group key={field} className="mb-2">
                <Form.Label>{field.replace(/_/g, ' ').toUpperCase()}</Form.Label>
                <Form.Control
                  type={field.includes('time') ? 'time' : field === 'shift_date' ? 'date' : 'text'}
                  value={newSchedule[field]}
                  onChange={(e) => setNewSchedule({ ...newSchedule, [field]: e.target.value })}
                  required
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

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Form onSubmit={handleEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Duty Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentSchedule &&
              ['guard_id', 'station_id', 'shift_date', 'start_time', 'end_time', 'shift_type'].map((field) => (
                <Form.Group key={field} className="mb-2">
                  <Form.Label>{field.replace(/_/g, ' ').toUpperCase()}</Form.Label>
                  <Form.Control
                    type={field.includes('time') ? 'time' : field === 'shift_date' ? 'date' : 'text'}
                    value={currentSchedule[field]}
                    onChange={(e) => setCurrentSchedule({ ...currentSchedule, [field]: e.target.value })}
                    required
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

      {/* Delete Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton className="bg-red-600 text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete schedule for Guard ID "{scheduleToDelete?.guard_id}" on "{scheduleToDelete?.shift_date}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default DutyScheduleManagement;
