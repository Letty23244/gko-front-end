// // dashboard/dashBoardLayout.jsx

// import Sidebar from "./component/Sidebar";
// import { Outlet } from "react-router-dom";

// function DashboardLayout() {
//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ flexGrow: 1, padding: '20px' }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;


// dashboard/DashboardLayout.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported if used in Sidebar

function DashboardLayout() {
  // Check for authentication by looking for the token in localStorage.
  // This is a simple, direct check that avoids a redundant API call.
  const isAuthenticated = !!localStorage.getItem("accessToken");

  // If the user is not authenticated, redirect to the login page immediately.
  if (!isAuthenticated) {
    console.log("No access token found. Redirecting to login page.");
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the dashboard layout
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;

