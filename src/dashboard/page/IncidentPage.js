import React, { useState } from 'react';
import axios from 'axios';

const IncidentPage = () => {
  const [formData, setFormData] = useState({
    description: '',
    guard_id: '',
    incident_date: '',
    severity: 'Low',
    station_id: '',
    status: 'Open'
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("No access token found. Please login again.");
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/v1/incidents/register',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setSuccessMsg('Incident created successfully!');
        setError('');
        setFormData({
          description: '',
          guard_id: '',
          incident_date: '',
          severity: 'Low',
          station_id: '',
          status: 'Open'
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create incident');
      setSuccessMsg('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Report New Incident</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <textarea
          name="description"
          placeholder="Incident description"
          className="form-control mb-2"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="guard_id"
          placeholder="Guard ID"
          className="form-control mb-2"
          value={formData.guard_id}
          onChange={handleInputChange}
          required
        />

        <input
          type="date"
          name="incident_date"
          className="form-control mb-2"
          value={formData.incident_date}
          onChange={handleInputChange}
          required
        />

        <select
          name="severity"
          className="form-control mb-2"
          value={formData.severity}
          onChange={handleInputChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="number"
          name="station_id"
          placeholder="Station ID"
          className="form-control mb-2"
          value={formData.station_id}
          onChange={handleInputChange}
          required
        />

        <select
          name="status"
          className="form-control mb-3"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option>Open</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>

        <button type="submit" className="btn btn-primary">Submit Incident</button>
      </form>
    </div>
  );
};

export default IncidentPage;
