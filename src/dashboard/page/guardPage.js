import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GuardManagement = () => {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const token = localStorage.getItem("accessToken");  // ✅ Get token here
        if (!token) {
          throw new Error("No access token found. Please login again.");
        }

        const response = await axios.get('http://127.0.0.1:5000/api/v1/guards/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setGuards(response.data);
        setSuccessMsg('Guards loaded successfully!');
      } catch (err) {
        setError(err.message || "Error fetching guards");
      } finally {
        setLoading(false);
      }
    };

    fetchGuards();
  }, []);

  if (loading) return <p>Loading guards...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Guard Management</h2>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Contacts</th>
            <th>Email</th>
            <th>Rank</th>
            <th>Status</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {guards.map(guard => (
            <tr key={guard.id}>
              <td>{guard.id}</td>
              <td>{guard.firstName}</td>
              <td>{guard.lastName}</td>
              <td>{guard.gender}</td>
              <td>{guard.date_of_birth}</td>
              <td>{guard.contacts}</td>
              <td>{guard.email}</td>
              <td>{guard.rank}</td>
              <td>{guard.status}</td>
              <td>{guard.hire_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuardManagement;
