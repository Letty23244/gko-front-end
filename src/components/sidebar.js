import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const sidebar = () => {
  return (
    <div>sidebar
        <h3>Admin Dashboard</h3>
        <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
      <h3 className="text-center mb-4">Admin Dashboard</h3>
      <Nav defaultActiveKey="/add-user" className="flex-column">
        <Nav.Link as={Link} to="/add-user" className="text-white">Add User</Nav.Link>
        <Nav.Link as={Link} to="/show-users" className="text-white">Show Users</Nav.Link>
      </Nav>
        </div>
    </div>
  )
}

export default sidebar