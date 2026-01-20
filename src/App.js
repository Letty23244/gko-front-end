import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/HeroSection";
import TopBar from './components/TopBar';
import Footer from "./components/footer";
import AccommodationPage from "./pages/Accomodation";
import DiningPage from "./pages/Dining";
import ExperiencePage from "./pages/Experience";
import OffersPage from "./pages/Offer";
// import ServicesPage from "./pages/Services";
import ContactUs from "./pages/ContactUs";
// import AuthPage from './pages/AuthPage'; 


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
        <Route path="/experienceS" element={<ExperiencePage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/contact" element={<ContactUs />} />
        

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
