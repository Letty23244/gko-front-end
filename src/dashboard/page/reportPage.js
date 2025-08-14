import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ReportAnalytics = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No access token found. Please login.");

        const response = await axios.get("http://127.0.0.1:5000/api/v1/incidents/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIncidents(response.data);
        setSuccessMsg("Reports loaded successfully!");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Incident Report Summary</h2>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Date</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Guard ID</th>
            <th>Station ID</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.description}</td>
              <td>{new Date(report.incident_date).toLocaleDateString()}</td>
              <td>{report.severity}</td>
              <td>{report.status}</td>
              <td>{report.guard_id}</td>
              <td>{report.station_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportAnalytics;
