// CareerPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import './CareerPage.css';
import './CareerPage.css';


const jobList = [
  {
    id: 1,
    title: 'Security Guard',
    type: 'Full-time',
    description: 'Maintain safety and security at designated premises.'
  },
  {
    id: 2,
    title: 'CCTV Operator',
    type: 'Full-time',
    description: 'Monitor surveillance systems and alert management of any irregularities.'
  },
  {
    id: 3,
    title: 'Alarm Response Officer',
    type: 'Part-time',
    description: 'Quickly respond to triggered alarms and follow company procedures.'
  },
  {
    id: 4,
    title: 'Cashier (Supermarket)',
    type: 'Full-time',
    description: 'Handle customer transactions and maintain an accurate cash register.'
  },
  {
    id: 5,
    title: 'Shelf Stocker (Supermarket)',
    type: 'Part-time',
    description: 'Keep shelves stocked and organized for a pleasant shopping experience.'
  },
  {
    id: 6,
    title: 'Store Manager (Supermarket)',
    type: 'Full-time',
    description: 'Manage staff, inventory, and ensure smooth store operations.'
  }
];

const CareerPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', jobId: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Application:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', jobId: '', message: '' });
  };

  return (
    <Container className="career-page">
      <h2 className="text-center mb-4">Career Opportunities at GKO Security</h2>

      <Row className="mb-5">
        {jobList.map((job) => (
          <Col md={4} className="mb-4" key={job.id}>
            <Card className="job-card">
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.location} | {job.type}</Card.Subtitle>
                <Card.Text>{job.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="mb-3">Apply for a Job</h3>
      {submitted && <Alert variant="success">Your application has been submitted!</Alert>}
      <Form onSubmit={handleSubmit} className="job-form">
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formJob" className="mb-3">
          <Form.Label>Select Job</Form.Label>
          <Form.Select name="jobId" value={formData.jobId} onChange={handleChange} required>
            <option value="">-- Select a Job --</option>
            {jobList.map((job) => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Why should we hire you?</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">Submit Application</Button>
      </Form>
    </Container>
  );
};

export default CareerPage;
