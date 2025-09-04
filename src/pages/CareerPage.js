import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import api from '../Api/Api'; // Make sure api.js has a 'career' endpoint
import './CareerPage.css';




const CareerPage = () => {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        jobId: '',
        cvFile: null,
        academicDocs: null,
        nationalId: null,
        healthDocs: null,
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const formRef = useRef(null);

    // Fetch jobs from backend
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.career.getAll();
                if (res.success) {
                    setJobs(res.data);
                } else {
                    setJobs([]);
                }
            } catch (err) {
                console.error(err);
                setJobs([]);
            }
        };
        fetchJobs();
    }, []);

    // Handle input and file changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Scroll to form when applying for a job
    const handleApplyClick = (jobId) => {
        setFormData(prev => ({ ...prev, jobId: jobId.toString() }));
        if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Submit application
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitted(false);

        if (!formData.name || !formData.email || !formData.jobId || !formData.cvFile) {
            setError('Please fill in all required fields and upload your CV.');
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('jobId', formData.jobId);
        data.append('message', formData.message || '');
        data.append('cvFile', formData.cvFile);
        if (formData.academicDocs) data.append('academicDocs', formData.academicDocs);
        if (formData.nationalId) data.append('nationalId', formData.nationalId);
        if (formData.healthDocs) data.append('healthDocs', formData.healthDocs);

        try {
            const res = await api.career.apply(data);
            if (res.success) {
                setSubmitted(true);
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
            } else {
                setError(res.error?.message || 'Failed to submit application.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to submit application.');
        }
    };

    return (
        <Container className="career-page py-5">
            <h2 className="text-center mb-4">Career Opportunities at GKO Security</h2>
            <p className="text-center text-muted mb-5">
                Join our team and help us deliver trusted security solutions. Browse our current openings below.
            </p>

            <Row className="mb-5">
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <Col md={4} className="mb-4" key={job.id}>
                            <Card className="job-card h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>{job.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {job.location || 'N/A'} | {job.job_type}
                                    </Card.Subtitle>
                                    <Card.Text>{job.description}</Card.Text>
                                    <Button variant="primary" onClick={() => handleApplyClick(job.id)}>
                                        Apply Now
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No jobs available at the moment.</p>
                )}
            </Row>

            <hr className="my-5" />

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
                        {jobs.map(job => (
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



