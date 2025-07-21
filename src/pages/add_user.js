import React from 'react'
import { Form ,Button,Alert } from 'react-bootstrap'
const add_user = () => {
  return (
    <div className="p-4">
      <h4>Add User</h4>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
        </Form.Group>

        <Button type="submit" variant="primary">Add User</Button>
      </Form>
    </div>
  )
}

export default add_user