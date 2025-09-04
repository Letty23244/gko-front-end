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
import ProtectedRoute from './dashboard/component/ProtectedRoute';
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

function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.admin.getAll();
        if (res.success) {
          console.log("✅ Admins fetched:", res.data);
        } else {
          console.error("❌ Failed to fetch admins:", res.error);
        }
      } catch (err) {
        console.error("❌ Error fetching admins:", err);
      }
    };

    if (isDashboardRoute) {
      fetchAdmins();
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
        <Route path="/login" element={<AuthPage />} />

        {/* Protected Dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
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

        {/* Catch-all */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      {!isDashboardRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
