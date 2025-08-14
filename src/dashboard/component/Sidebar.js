import React, { useState } from 'react';
import { Nav, Modal, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  Gauge, UserCog, UserCheck, Calendar, Users,
  FileText,  AlertTriangle, BarChart2,
  LogOut, Settings
} from 'lucide-react';
import { FaShieldAlt } from 'react-icons/fa';

const Sidebar = () => {
  const iconStyle = { marginRight: '10px' };
  const navigate = useNavigate();

  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
  };

  return (
    <div className="bg-primary text-white vh-100 d-flex flex-column justify-content-between" style={{ width: '300px' }}>
      <div>
        <h4 className="text-center mb-4 mt-2">GKO Admin Dashboard</h4>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Link as={Link} to="/dashboard" className="text-white d-flex align-items-center">
            <Gauge style={iconStyle} size={20} /> Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/admins" className="text-white d-flex align-items-center">
            <UserCog style={iconStyle} size={20} /> Admin 
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/guards" className="text-white d-flex align-items-center">
            <UserCheck style={iconStyle} size={20} /> Guards 
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/duty-schedule" className="text-white d-flex align-items-center">
            <Calendar style={iconStyle} size={20} /> Duty Schedule
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/clients" className="text-white d-flex align-items-center">
            <Users style={iconStyle} size={20} /> Clients & Contracts
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/services" className="text-white d-flex align-items-center">
            <FaShieldAlt style={iconStyle} size={20} /> Services Offered
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/invoices" className="text-white d-flex align-items-center">
            <FileText style={iconStyle} size={20} /> Invoices & Payments
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/report-summary" className="text-white d-flex align-items-center">
            <BarChart2 style={iconStyle} size={20} /> Reports & Analytics
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard/incidents" className="text-white d-flex align-items-center">
            <AlertTriangle style={iconStyle} size={20} /> Incident Reports
          </Nav.Link>
        </Nav>
      </div>

      {/* Bottom section: Settings and Logout */}
      <div>
        <Nav className="flex-column">
          <Nav.Link onClick={() => setShowSettings(true)} className="text-white d-flex align-items-center" style={{ cursor: 'pointer' }}>
            <Settings style={iconStyle} size={20} /> Settings
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="text-white d-flex align-items-center" style={{ cursor: 'pointer' }}>
            <LogOut style={iconStyle} size={20} /> Logout
          </Nav.Link>
        </Nav>
      </div>

      {/* Settings Modal */}
      <Modal show={showSettings} onHide={() => setShowSettings(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="switch"
              label="Enable Dark Mode"
              checked={darkMode}
              onChange={handleDarkModeToggle}
              className="mb-3"
            />
            <Form.Check type="checkbox" label="Enable Notifications" className="mb-3" />
            <Form.Check type="checkbox" label="Move deleted items to Trash" className="mb-3" />
            <Form.Check type="checkbox" label="Show Help Tips" className="mb-3" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSettings(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
