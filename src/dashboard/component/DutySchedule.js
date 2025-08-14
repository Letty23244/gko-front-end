
import React, { useEffect, useState } from "react";

const DutySchedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // Simulated fetch for now
    const dummyData = [
      { id: 1, guardName: "John Doe", location: "Mall", date: "2025-07-27", shiftTime: "Night", status: "Scheduled" },
      { id: 2, guardName: "Jane Smith", location: "Office", date: "2025-07-28", shiftTime: "Day", status: "Completed" }
    ];
    setSchedules(dummyData);
  }, []);

  return (
    <div>
      <h2>Duty Schedule</h2>
      <table className="table table-bordered table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Guard</th>
            <th>Location</th>
            <th>Date</th>
            <th>Shift</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.guardName}</td>
              <td>{item.location}</td>
              <td>{item.date}</td>
              <td>{item.shiftTime}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DutySchedule;
