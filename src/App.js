import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/HeroSection";
import TopBar from './components/TopBar';
import Footer from "./components/footer";
import AccommodationPage from "./pages/Accomodation";
import DiningPage from "./pages/Dining";
// import ServicesPage from "./pages/Services";
// import ContactUs from "./pages/ContactUs";
// import AuthPage from './pages/AuthPage'; 
// import ProtectedRoute from './dashboard/component/ProtectedRoute';
// import DashboardLayout from "./dashboard/DashboardLayout";
// import DashboardHome from "./dashboard/page/DashboardHome";
// import DutySchedule from "./dashboard/component/DutySchedule";
// import ClientManagement from "./dashboard/page/ClientPage";
// import GuardManagement from "./dashboard/page/GuardPage";
// import AdminManagement from "./dashboard/page/AdminManagement";
// import IncidentPage from './dashboard/page/IncidentPage';
// import ReportAnalytics from "./dashboard/page/ReportPage";
// import Invoices from './dashboard/page/InvoicePage';
// import ServiceManagement from './dashboard/page/ServiceManagement';
// import SettingsPage from './dashboard/page/SettingPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import BookingCard from "./components/BookingCard";

function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="App">
      {/* Show navbar and topbar only for public pages */}
      {!isDashboardRoute && <Navbar />}
      {!isDashboardRoute && <TopBar />}
       {/* {!isDashboardRoute && <BookingCard/>} */}

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Hero />} />
        <Route path="/accommodation" element={<AccommodationPage />} />
        <Route path="/dining" element={<DiningPage />} />
        {/* <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Protected Dashboard routes */}
        {/* <Route
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
        {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
      </Routes> 

      {/* Show footer only for public pages */}
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
