import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../Api/Api";

function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.services.getAll(); // Uses your API wrapper
        if (res.success) {
          setServices(res.data);
        } else {
          setError(res.error?.message || "Failed to fetch services.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card style={{ backgroundColor: "#f8f9fa", padding: "1.5rem" }}>
      <h3 className="mb-4">Our Services</h3>
      <Row className="mb-4">
        {services.map((service) => (
          <Col md={4} className="mb-3" key={service.id}>
            <Card className="text-center shadow-sm p-3 h-100">
              {service.image ? (
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${service.image}`}
                  alt={service.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <div className="mb-2 text-primary">🔒</div>
              )}
              <h5>{service.title}</h5>
              <p>{service.description}</p>
              <p>
                <strong>Rate:</strong> {service.price_rate}
              </p>
              <Button variant="outline-primary" size="sm">
                Request a Quote
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="p-4 text-white" style={{ backgroundColor: "#343a40" }}>
        <h4>Special Discount Alert 🚨</h4>
        <p>
          Clients who hire <strong>more than 10 guards</strong> receive a
          special corporate discount! Boost your security and save.
        </p>
        <Button variant="warning" as={Link} to="/contact">
          Contact Us to Claim
        </Button>
      </Card>
    </Card>
  );
}

export default ServiceManagement;
