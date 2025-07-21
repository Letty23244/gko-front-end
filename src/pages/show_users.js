import React from 'react'
import { Table } from 'react-bootstrap'
const show_users = () => {
  return (
    <div className="p-4">
      <h4>All Users</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id}>
              <td>{index + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default show_users