import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
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
    // State to hold form data, including files
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        jobId: '', // Changed to store job ID from the list
        cvFile: null,
        academicDocs: null,
        nationalId: null,
        healthDocs: null,
        message: ''
    });
    
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Create a ref to attach to the form for smooth scrolling
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const handleApplyClick = (jobId) => {
        setFormData(prevData => ({ ...prevData, jobId: jobId.toString() }));
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation for required fields
        if (!formData.name || !formData.email || !formData.jobId || !formData.cvFile) {
            setError('Please fill in all required fields and upload your CV.');
            return;
        }

        console.log('Submitting Application:', formData);
        
        // In a real application, you'd send this data to a server API
        setSubmitted(true);
        // Reset the form
        setFormData({
            name: '',
            email: '',
            jobId: '',
            cvFile: null,
            academicDocs: null,
            nationalId: null,
            healthDocs: null,
            message: ''
        });
    };

    return (
        <Container className="career-page py-5">
            <h2 className="text-center mb-4">Career Opportunities at GKO Security</h2>
            <p className="text-center text-muted mb-5">
                Join our team and help us deliver trusted security solutions. Browse our current openings below.
            </p>

            {/* Job Listings Section */}
            <Row className="mb-5">
                {jobList.map((job) => (
                    <Col md={4} className="mb-4" key={job.id}>
                        <Card className="job-card h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.location} | {job.type}</Card.Subtitle>
                                <Card.Text>{job.description}</Card.Text>
                                <Button 
                                    variant="primary" 
                                    onClick={() => handleApplyClick(job.id)}
                                >
                                    Apply Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <hr className="my-5" />

            {/* Application Form Section */}
            <h3 className="text-center mb-3" id="application-form">Apply for a Job</h3>
            {submitted && <Alert variant="success">Your application has been submitted successfully!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit} className="job-form" ref={formRef}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formName">
                        <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Enter your full name" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Enter your email" 
                            required 
                        />
                    </Form.Group>
                </Row>
                
                <Form.Group controlId="formJob" className="mb-4">
                    <Form.Label>Position Applying For <span className="text-danger">*</span></Form.Label>
                    <Form.Select name="jobId" value={formData.jobId} onChange={handleChange} required>
                        <option value="">-- Select a Job --</option>
                        {jobList.map((job) => (
                            <option key={job.id} value={job.id}>{job.title}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <hr className="my-4" />
                <h5 className="mb-3">Required Documents</h5>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCV">
                        <Form.Label>Curriculum Vitae (CV) <span className="text-danger">*</span></Form.Label>
                        <Form.Control 
                            type="file" 
                            name="cvFile" 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formAcademic">
                        <Form.Label>Academic Documents</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="academicDocs" 
                            onChange={handleChange} 
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formNationalId">
                        <Form.Label>National ID Photocopy</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="nationalId" 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formHealthDocs">
                        <Form.Label>Health Documents</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="healthDocs" 
                            onChange={handleChange} 
                        />
                    </Form.Group>
                </Row>

                <hr className="my-4" />
                <h5 className="mb-3">Additional Information</h5>

                <Form.Group controlId="formMessage" className="mb-4">
                    <Form.Label>Cover Letter Message</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder="Tell us why you're a great fit for this role." 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Submit Application
                </Button>
            </Form>
        </Container>
    );
};

export default CareerPage;