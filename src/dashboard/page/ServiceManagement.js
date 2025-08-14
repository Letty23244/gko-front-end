import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaShieldAlt, FaUserSecret, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <FaShieldAlt size={30} />,
    title: "Static Guarding",
    description: "Reliable security personnel for static post assignments at your property or business.",
  },
  {
    icon: <FaUserSecret size={30} />,
    title: "VIP Protection",
    description: "Trained bodyguards for high-profile clients needing discreet protection.",
  },
  {
    icon: <FaUserFriends size={30} />,
    title: "Event Security",
    description: "Professional crowd control and perimeter guarding for private or public events.",
  },
];

function ServiceManagement() {
  return (
    <Card style={{ backgroundColor: '#f8f9fa', padding: '1.5rem' }}>
      <h3 className="mb-4">Our Services</h3>
      <Row className="mb-4">
        {services.map((service, idx) => (
          <Col md={4} className="mb-3" key={idx}>
            <Card className="text-center shadow-sm p-3 h-100">
              <div className="mb-2 text-primary">{service.icon}</div>
              <h5>{service.title}</h5>
              <p>{service.description}</p>
              <Button variant="outline-primary" size="sm">Request a Quote</Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Special Discount Section */}
      <Card className="p-4 text-white" style={{ backgroundColor: '#343a40' }}>
        <h4>Special Discount Alert 🚨</h4>
        <p>
          Clients who hire <strong>more than 10 guards</strong> receive a special corporate discount! Boost your security and save.
        </p>
        <Button variant="warning" as={Link} to="/contact">
          Contact Us to Claim
        </Button>
      </Card>
    </Card>
  );
}

export default ServiceManagement;
