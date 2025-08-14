import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import api from '../Api/Api'; // Import the centralized API service

function SocialLinks() {
  return (
    <div className="social-links mt-3">
      <a
        href="https://facebook.com/gkosecurity"
        target="_blank"
        rel="noreferrer"
        className="me-3 text-primary"
        aria-label="Facebook"
      >
        <FaFacebook size={30} />
      </a>
      <a
        href="https://twitter.com/gkosecurity"
        target="_blank"
        rel="noreferrer"
        className="me-3 text-primary"
        aria-label="Twitter"
      >
        <FaTwitter size={30} />
      </a>
      <a
        href="https://linkedin.com/company/gkosecurity"
        target="_blank"
        rel="noreferrer"
        className="text-primary"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={30} />
      </a>
    </div>
  );
}

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConsultationMessage, setShowConsultationMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setShowConsultationMessage(false); // Clear any consultation message

    try {
      // ✅ Use api.contact_messages.create from the centralized API service
      const res = await api.contact_messages.create(formData);

      if (res.success) {
        setSuccessMessage(res.data.message || 'Your message has been sent successfully!');
        // Clear the form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setError(res.error.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleConsultation = () => {
    setSuccessMessage('');
    setError('');
    setShowConsultationMessage(true);
    // In a real app, you'd likely redirect to a scheduling page or open a booking widget
  };

  return (
    <Container className="py-5 contact-page">
      <h1 className="text-center text-primary mb-4">Contact Us</h1>
      <Row>
        {/* Contact Form */}
        <Col md={6} className="mb-4">
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-primary">Send a Message</Card.Title>
              
              {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
              {successMessage && <Alert variant="success" className="mb-4">{successMessage}</Alert>}
              {showConsultationMessage && (
                <Alert variant="info" className="mb-4">
                  Thank you for your interest! We'll be in touch shortly to schedule your consultation.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name" 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email" 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject" 
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Form>

              {/* CTA Button */}
              <Button
                variant="success"
                className="mt-4 w-100"
                onClick={handleScheduleConsultation}
              >
                Schedule a Security Consultation
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Info and Map */}
        <Col md={6}>
          <Card className="p-4 shadow-sm mb-3">
            <Card.Body>
              <Card.Title className="mb-3 text-primary">Our Location</Card.Title>
              <p>
                <strong>GKO Security Ltd</strong>
              </p>
              <p>Plot 1336, Port Bell Road, Kitintale</p>
              <p>P.O BOX 21603, Kampala, Uganda</p>
              <p>Phone: +256 700 000000</p>
              <p>Email: info@gkosecurity.com</p>
            </Card.Body>
          </Card>

          {/* Operating Hours */}
          <Card className="p-4 shadow-sm mb-3">
            <Card.Body>
              <Card.Title className="mb-3 text-primary">Operating Hours</Card.Title>
              <p>Monday - Friday: 8:00 AM – 6:00 PM</p>
              <p>Saturday: 9:00 AM – 1:00 PM</p>
              <p>Sunday: Closed</p>
            </Card.Body>
          </Card>

          {/* Social Media Links */}
          <Card className="p-4 shadow-sm mb-3">
            <Card.Body>
              <Card.Title className="mb-3 text-primary">Connect With Us</Card.Title>
              <SocialLinks />
            </Card.Body>
          </Card>

          {/* Google Map */}
          <Card className="shadow-sm">
            <iframe
              title="GKO Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8456259980664!2d32.62970801509138!3d0.31357966408101914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb597b267f2f%3A0x1c1f243e0532b984!2sKitintale%2C%20Kampala!5e0!3m2!1sen!2sug!4v1657123456789!5m2!1sen!2sug"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Card>
        </Col>
      </Row>

      {/* Testimonials Section */}
      <Row className="mt-5">
        <Col>
          <h2 className="text-center text-primary mb-4">What Our Clients Say</h2>
          <Row>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3">
                <Card.Body>
                  <Card.Text>
                    "GKO Security has been instrumental in securing our premises. Highly professional and reliable."
                  </Card.Text>
                  <footer className="blockquote-footer">John Doe, CEO, ABC Corp</footer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3">
                <Card.Body>
                  <Card.Text>
                    "Exceptional service and quick response times. I trust GKO with my security needs."
                  </Card.Text>
                  <footer className="blockquote-footer">Jane Smith, Property Manager</footer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm p-3">
                <Card.Body>
                  <Card.Text>
                    "Professional guards and excellent customer support. Definitely recommend."
                  </Card.Text>
                  <footer className="blockquote-footer">Mark Johnson, Retail Owner</footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
