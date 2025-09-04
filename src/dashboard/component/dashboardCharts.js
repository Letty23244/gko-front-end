import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const DashboardChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/dashboard/home-stats")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h4>Monthly Security Overview</h4>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="incidents" stroke="#8884d8" />
          <Line type="monotone" dataKey="patrols" stroke="#82ca9d" />
          <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
          <Line type="monotone" dataKey="services" stroke="#ff7300" />
          <Line type="monotone" dataKey="guards" stroke="#a83232" />
          <Line type="monotone" dataKey="clients" stroke="#328aa8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;



// import React from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from "recharts";

// // Example dummy data
// const data = [
//   { name: "Jan", incidents: 4, patrols: 20 },
//   { name: "Feb", incidents: 2, patrols: 22 },
//   { name: "Mar", incidents: 5, patrols: 18 },
//   { name: "Apr", incidents: 3, patrols: 25 },
//   { name: "May", incidents: 1, patrols: 30 },
// ];

// const DashboardChart = () => {
//   return (
//     <div>
//       <h4>Monthly Security Overview</h4>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}
//           margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="incidents" stroke="#8884d8" />
//           <Line type="monotone" dataKey="patrols" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DashboardChart;
