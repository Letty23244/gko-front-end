import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaStar, 
  FaBed, 
  FaConciergeBell, 
  FaUtensils, 
  FaSwimmingPool,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";
import "../pages/Accomodation.css";

// Import images (replace with your hotel images)
import hotel1 from "../assets/room1.jpg"; 
import hotel2 from "../assets/room2.jpg"; 
import hotel3 from "../assets/room3.jpg"; 
import manager1 from "../assets/manager1.jpg";
import manager2 from "../assets/manager2.jpg";

// Social Links Component
function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6 mt-4">
      <a href="https://facebook.com/hoteljustino" target="_blank" rel="noreferrer">
        <FaFacebook size={32} className="text-blue-600 hover:text-blue-800" />
      </a>
      <a href="https://twitter.com/hoteljustino" target="_blank" rel="noreferrer">
        <FaTwitter size={32} className="text-blue-400 hover:text-blue-600" />
      </a>
      <a href="https://linkedin.com/company/hoteljustino" target="_blank" rel="noreferrer">
        <FaLinkedin size={32} className="text-blue-700 hover:text-blue-900" />
      </a>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <Col md={6} lg={3} className="mb-6">
    <Card className="h-full text-center border-0 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
      <div className="text-indigo-600 mb-4">
        <Icon size={40} />
      </div>
      <h4 className="font-bold text-xl mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </Card>
  </Col>
);

// Team Member Card Component
const TeamCard = ({ image, name, position }) => (
  <Col md={6} lg={3} className="mb-6">
    <Card className="border-0 shadow-lg rounded-2xl text-center hover:shadow-2xl transition-all duration-300">
      <Card.Img variant="top" src={image} className="rounded-t-2xl h-64 object-cover" />
      <Card.Body>
        <Card.Title className="text-xl font-bold">{name}</Card.Title>
        <Card.Text className="text-indigo-600">{position}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default function AccommodationPage() {
  const features = [
    { icon: FaBed, title: "Comfortable Rooms", description: "Cozy rooms with premium bedding for a restful stay." },
    { icon: FaUtensils, title: "Fine Dining", description: "Delicious meals from our in-house restaurant and bar." },
    { icon: FaSwimmingPool, title: "Swimming Pool", description: "Relax and enjoy our outdoor pool and sun deck." },
    { icon: FaConciergeBell, title: "24/7 Service", description: "Friendly staff ready to assist you anytime." }
  ];

  const managers = [
    { image: manager1, name: "John Doe", position: "General Manager" },
    { image: manager2, name: "Jane Smith", position: "Assistant Manager" }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <Container className="py-16 px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge bg="indigo" className="mb-4 px-4 py-2 text-sm font-semibold rounded-full">
            Since 2011
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Hotel Justino
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience comfort, elegance, and exceptional hospitality in the heart of Kampala. 
            Relax in our luxurious rooms, enjoy fine dining, and make your stay unforgettable.
          </p>
        </div>

        {/* Features / Amenities */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Amenities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a relaxing and enjoyable stay
            </p>
          </div>
          <Row>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </Row>
        </section>

        {/* Accommodation / Rooms Gallery */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Rooms & Suites</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elegant rooms designed for comfort and style
            </p>
          </div>
          <Row className="g-6">
            {[hotel1, hotel2, hotel3].map((img, i) => (
              <Col md={6} lg={4} key={i}>
                <Card className="border-0 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300">
                  <Card.Img variant="top" src={img} className="h-64 object-cover rounded-t-2xl" />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Management Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Experienced professionals making your stay comfortable
            </p>
          </div>
          <Row>
            {managers.map((member, i) => (
              <TeamCard key={i} {...member} />
            ))}
          </Row>
        </section>

        {/* Social & Contact CTA */}
        <Row className="mb-8">
          <Col lg={6} className="mb-6">
            <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-gray-900 to-indigo-900 text-white text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
              <p className="text-gray-300 mb-6">
                Stay updated with our latest offers and hotel events
              </p>
              <SocialLinks />
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="border-0 shadow-xl rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <FaPhoneAlt className="mr-3" /> Contact Us
              </h3>
              <div className="space-y-4 mb-6">
                <p className="flex items-center text-lg">
                  <FaMapMarkerAlt className="mr-4 text-indigo-300" />
                  Plot 1336, Port Bell Road, Kitintale, Kampala
                </p>
                <p className="flex items-center text-lg">
                  <FaPhoneAlt className="mr-4 text-indigo-300" />
                  +256-700-000000 | +256-772-000000
                </p>
                <p className="flex items-center text-lg">
                  <FaEnvelope className="mr-4 text-indigo-300" />
                  info@hoteljustino.com
                </p>
              </div>
              <Button 
                variant="light" 
                size="lg" 
                href="/contact" 
                className="w-full py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              >
                Contact Us Now
              </Button>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}
