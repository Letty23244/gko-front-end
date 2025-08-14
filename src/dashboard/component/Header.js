import React from 'react';
import { Button } from 'react-bootstrap';

const Header = ({ title = "Dashboard Home", userName = "leticia", onLogout }) => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light shadow-sm">
      <h2 className="m-0">{title}</h2>

      <div className="d-flex align-items-center gap-3">
        <span className="fw-semibold">Welcome, {userName}</span>
        <Button variant="outline-danger" size="sm" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;

