import React, { useState, useEffect } from "react";

const IncidentReport = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Simulated data – you can replace this with a real API call later
    const dummyIncidents = [
      {
        id: 1,
        title: "Unauthorized Access",
        guard: "John Doe",
        location: "Main Gate",
        date: "2025-07-25",
        status: "Investigating"
      },
      {
        id: 2,
        title: "Broken Fence",
        guard: "Jane Smith",
        location: "Warehouse",
        date: "2025-07-24",
        status: "Resolved"
      }
    ];

    setIncidents(dummyIncidents);
  }, []);

  return (
    <div>
      <h2>Incident Reports</h2>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Guard</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident, index) => (
            <tr key={incident.id}>
              <td>{index + 1}</td>
              <td>{incident.title}</td>
              <td>{incident.guard}</td>
              <td>{incident.location}</td>
              <td>{incident.date}</td>
              <td>{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentReport;
