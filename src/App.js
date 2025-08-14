// import React, { useEffect } from 'react';
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/navbar";
// import Hero from "./components/HeroSection";
// import Footer from "./components/footer";
// import AboutPage from "./pages/about_us";
// import ServicesPage from "./pages/services";
// import ContactUs from "./pages/ContactUs";
// import CareerPage from "./pages/CareerPage";
// import LoginPage from './components/LoginModal';

// import DashboardLayout from "./dashboard/DashboardLayout";
// import DashboardHome from "./dashboard/page/dashboardHome";
// import DutySchedule from "./dashboard/component/DutySchedule";
// import ClientManagement from "./dashboard/page/clientPage";
// import GuardManagement from "./dashboard/page/guardPage";
// import AdminManagement from "./dashboard/page/AdminManagement";
// import IncidentPage from './dashboard/page/IncidentPage';
// import ReportAnalytics from "./dashboard/page/reportPage";
// import Invoices from './dashboard/page/InvoicePage';
// import ServiceManagement from './dashboard/page/ServiceManagement';
// import SettingsPage from './dashboard/page/SettingPage';

// import api from './Api/Api';
// import AuthPage from './pages/AuthPage'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';




// // ✅ Inner component to access `useLocation`
// function AppContent() {
//   const location = useLocation();
//   const isDashboardRoute = location.pathname.startsWith("/dashboard");

//   // ✅ Example fetch using api (fetch all admins)
//   useEffect(() => {
//     const fetchAdmins = async () => {
//       const res = await api.admin.getAll();
//       if (res.success) {
//         console.log("✅ Admins fetched:", res.data);
//       } else {
//         console.error("❌ Failed to fetch admins:", res.error);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   return (
//     <div className="App">
//       {!isDashboardRoute && <Navbar />}

//       <Routes>
//         {/* Public pages */}
//         <Route path="/" element={<Hero />} />
//         <Route path="/about_us" element={<AboutPage />} />
//         <Route path="/services" element={<ServicesPage />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/careers" element={<CareerPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/login" element={<AuthPage />} />

//         {/* Dashboard pages */}
//         <Route path="/dashboard/*" element={<DashboardLayout />}>
//           <Route index element={<DashboardHome />} />
//           <Route path="duty-schedule" element={<DutySchedule />} />
//           <Route path="clients" element={<ClientManagement />} />
//           <Route path="guards" element={<GuardManagement />} />
//           <Route path="admins" element={<AdminManagement />} />
//           <Route path="incidents" element={<IncidentPage />} />
//           <Route path="report-summary" element={<ReportAnalytics />} />
//           <Route path="invoices" element={<Invoices />} />
//           <Route path="services" element={<ServiceManagement />} />
//           <Route path="settings" element={<SettingsPage />} />
//         </Route>
//       </Routes>

//       {!isDashboardRoute && <Footer />}
//     </div>
//   );
// }

// // ✅ Main wrapper for routing
// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// export default App;





// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/HeroSection";
import Footer from "./components/footer";
import AboutPage from "./pages/about_us";
import ServicesPage from "./pages/services";
import ContactUs from "./pages/ContactUs";
import CareerPage from "./pages/CareerPage";
import AuthPage from './pages/AuthPage'; 

import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardHome from "./dashboard/page/dashboardHome";
import DutySchedule from "./dashboard/component/DutySchedule";
import ClientManagement from "./dashboard/page/clientPage";
import GuardManagement from "./dashboard/page/guardPage";
import AdminManagement from "./dashboard/page/AdminManagement";
import IncidentPage from './dashboard/page/IncidentPage';
import ReportAnalytics from "./dashboard/page/reportPage";
import Invoices from './dashboard/page/InvoicePage';
import ServiceManagement from './dashboard/page/ServiceManagement';
import SettingsPage from './dashboard/page/SettingPage';

import api from './Api/Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// This component uses `useLocation` to conditionally render the Navbar and Footer.
// It must be wrapped by `BrowserRouter`.
function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const fetchAdmins = async () => {
      const res = await api.admin.getAll();
      if (res.success) {
        console.log("✅ Admins fetched:", res.data);
      } else {
        console.error("❌ Failed to fetch admins:", res.error);
      }
    };

    // Only fetch admins if the user is on a dashboard route, or after login.
    // This is just an example. You might want to move this fetch to a more appropriate
    // location, like a component that actually needs the data.
    if (isDashboardRoute) {
        // You would typically check for authentication before fetching sensitive data
        // For now, the dashboard layout handles the redirect.
    }
    
  }, [isDashboardRoute]);

  return (
    <div className="App">
      {!isDashboardRoute && <Navbar />}

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Hero />} />
        <Route path="/about_us" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<CareerPage />} />
        
        {/* Consolidated Login Route */}
        <Route path="/login" element={<AuthPage />} />

        {/* Protected Dashboard routes, using a single parent route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="duty-schedule" element={<DutySchedule />} />
          <Route path="clients" element={<ClientManagement />} />
          <Route path="guards" element={<GuardManagement />} />
          <Route path="admins" element={<AdminManagement />} />
          <Route path="incidents" element={<IncidentPage />} />
          <Route path="report-summary" element={<ReportAnalytics />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all for any other routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      {!isDashboardRoute && <Footer />}
    </div>
  );
}

// The main App component wraps everything in BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
