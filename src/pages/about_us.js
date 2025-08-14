import React from "react";
import { Container, Row, Col, Card ,Button} from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin, FaEye, FaBullseye,  FaUsers, FaHandshake, FaShieldAlt, FaStar, FaCheckCircle, FaCertificate } from "react-icons/fa";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import "../pages/about_us.css"; 
// Assuming these paths are correct and images exist
import founder1 from "../assets/ceo.png"; 
import founder2 from "../assets/titania.png"; 
// import team1 from "../assets/team1.png"; // Alumansi Musa (Commented out in original)
import team2 from "../assets/tadeo.png"; // Byaruhanga Tadeo
// import team3 from "../assets/team3.png"; // Nsamba Francis (Commented out in original)
// import team4 from "../assets/team4.png"; // James Thomas (Commented out in original)
import guard2 from "../assets/gaurd2.webp";
function SocialLinks() {
 return (

<div className="flex justify-center space-x-4 mt-3">
 <a
href="https://facebook.com/gkosecurity"
 target="_blank"
 rel="noreferrer"
 className="text-blue-600 hover:text-blue-800 transition-colors duration-200" 
aria-label="Facebook"
 >
 <FaFacebook size={30} />
 </a>
<a
 href="https://twitter.com/gkosecurity"
target="_blank"
 rel="noreferrer"
 aria-label="Twitter"
 >
<FaTwitter size={30} />
 </a>
 <a
href="https://linkedin.com/company/gkosecurity"
target="_blank"
 rel="noreferrer"
 className="text-blue-700 hover:text-blue-900 transition-colors duration-200" 
 aria-label="LinkedIn"
>
 <FaLinkedin size={30} />
 </a>
 </div>
 );
}

export default function AboutPage() {
   return (

 <Container className="py-12 px-4 sm:px-6 lg:px-8 bg-white text-gray-800"> 
<h1 className="text-center text-indigo-700 text-4xl font-extrabold mb-8">  About GKO Security Ltd </h1>
<p className="text-lg leading-relaxed text-gray-700">
       GKO Security Ltd was established in 2011 to offer security solutions due to increasing threats to people and their property.
 Today, we are one of Uganda’s leading security companies, trusted by individuals and organizations alike. </p>

 <Row className="mb-10 items-center justify-center"> 
   <Col md={6} className="mb-6 md:mb-0">
      <p className="text-xl sm:text-2xl text-gray-600 font-light mb-6 mx-auto max-w-4xl"> From a humble beginning rooted in quality service, we've grown into a major employer with over 1,000 Ugandans in skilled and semi-skilled roles.
              Our head office is located at Plot 1336, Port Bell Road, Kitintale, P.O BOX 21603, Kampala, Uganda. </p>
  <p className="text-lg leading-relaxed"> With a team of trained and dedicated professionals, we deliver peace of mind through reliable and secure service.
 </p>
 </Col>
 <Col md={6} className="flex justify-center"> 
 <img
     src={guard2}
            alt="GKO Security Team"
            className="img-fluid rounded-lg shadow-xl w-full max-w-md h-auto"
 />
 </Col>
 </Row>

<Row className="g-4 mb-10"> 
<Col md={6}> 
<Card className="h-full shadow-lg rounded-xl transition-transform duration-300 hover:scale-105"> 
 <Card.Body className="p-6"> 
<Card.Title className="text-indigo-600 text-2xl font-semibold mb-3"> 
 <FaEye className="inline-block mr-3 text-indigo-500" /> Our Vision
 </Card.Title>
<Card.Text className="text-gray-700 text-base leading-relaxed">
To be the leading service provider in the region by delivering trusted, professional,
 and innovative security solutions that guarantee the safety of individuals, institutions, and property.
 </Card.Text>

 </Card.Body>
 </Card>
 </Col>

 <Col md={6}>
<Card className="h-full shadow-lg rounded-xl transition-transform duration-300 hover:scale-105">
 <Card.Body className="p-6">
<Card.Title className="text-indigo-600 text-2xl font-semibold mb-3">
<FaBullseye className="inline-block mr-3 text-indigo-500" /> Our Mission
 </Card.Title>
  <Card.Text className="text-gray-700 text-base leading-relaxed">
To provide reliable, customer-tailored security services through trained personnel and modern technology,
 with a deep understanding of each client’s unique needs.
       </Card.Text>
</Card.Body>
    </Card>
 </Col>
</Row>


      <h3 className="text-indigo-700 text-3xl font-bold mt-10 mb-6 text-center">Our Core Values</h3>
      <Row className="g-4 mb-10">
       
        <Col md={6} lg={4}>
          <Card className="h-full shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105">
            <Card.Body>
              <div className="text-center mb-3">
                <FaShieldAlt className="text-green-600 text-5xl mx-auto" />
              </div>
              <Card.Title className="text-xl font-bold text-center text-gray-800 mb-2">Integrity</Card.Title>
              <Card.Text className="text-gray-700 text-base leading-relaxed">
                We act with unwavering **honesty and transparency** in all our dealings. Upholding strong moral principles is the cornerstone of our operations, ensuring that we build and maintain trust with our clients, partners, and employees.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-full shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105">
            <Card.Body>
              <div className="text-center mb-3">
                <FaStar className="text-yellow-500 text-5xl mx-auto" />
              </div>
              <Card.Title className="text-xl font-bold text-center text-gray-800 mb-2">Excellence</Card.Title>
              <Card.Text className="text-gray-700 text-base leading-relaxed">
                We are committed to **surpassing expectations** and delivering exceptional quality in every service we provide. Our pursuit of excellence drives us to continuously improve our methods, training, and technology to offer unparalleled security solutions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

      
        <Col md={6} lg={4}>
          <Card className="h-full shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105">
            <Card.Body>
              <div className="text-center mb-3">
                <FaUsers className="text-purple-600 text-5xl mx-auto" />
              </div>
              <Card.Title className="text-xl font-bold text-center text-gray-800 mb-2">Teamwork</Card.Title>
              <Card.Text className="text-gray-700 text-base leading-relaxed">
                We foster a **collaborative environment** where mutual respect and shared goals are paramount. We believe our collective strength, expertise, and dedication as a team are what drive our success and allow us to provide comprehensive protection for our clients.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={4}>
          <Card className="h-full shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105">
            <Card.Body>
              <div className="text-center mb-3">
                <FaCheckCircle className="text-blue-600 text-5xl mx-auto" />
              </div>
              <Card.Title className="text-xl font-bold text-center text-gray-800 mb-2">Accountability</Card.Title>
              <Card.Text className="text-gray-700 text-base leading-relaxed">
                We take **full responsibility** for our actions and commitments. Our clients can trust that we will stand by our word and be reliable partners, consistently delivering on our promises and addressing any challenges with transparency and resolve.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Partnership Card */}
        <Col md={6} lg={4}>
          <Card className="h-full shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105">
            <Card.Body>
              <div className="text-center mb-3">
                <FaHandshake className="text-teal-600 text-5xl mx-auto" />
              </div>
              <Card.Title className="text-xl font-bold text-center text-gray-800 mb-2">Partnership</Card.Title>
              <Card.Text className="text-gray-700 text-base leading-relaxed">
                We build **enduring relationships** with our clients, seeing ourselves not just as a service provider, but as a long-term partner in their safety and success. Our focus is on fostering trust and shared growth through open communication and tailored solutions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="text-indigo-700 text-3xl font-bold mt-10 mb-6 text-center">Meet Our Founders</h3> 
      <Row className="mb-10 justify-center g-4"> 
        <Col md={4} sm={6} className="mb-4"> 
          <Card className="shadow-lg rounded-xl text-center h-full transition-transform duration-300 hover:scale-105">
            <Card.Img 
              variant="top" 
              src={founder1} 
              alt="Dr. Gilbert Ohairwe" 
              className="p-4 rounded-full w-48 h-48 object-cover object-top mx-auto" 
            /> 
            <Card.Body>
              <Card.Title className="text-xl font-semibold text-gray-800">Dr. Gilbert Ohairwe</Card.Title>
              <Card.Text className="text-indigo-600 font-medium">Founder & CEO</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6} className="mb-4">
          <Card className="shadow-lg rounded-xl text-center h-full transition-transform duration-300 hover:scale-105">
            <Card.Img 
              variant="top" 
              src={founder2} 
              alt="Dr. Tiantian Ermoshkir" 
              className="p-4 rounded-full w-48 h-48 object-cover object-top mx-auto" 
            />
            <Card.Body>
              <Card.Title className="text-xl font-semibold text-gray-800">Dr. Tiantian Ermoshkir</Card.Title>
              <Card.Text className="text-indigo-600 font-medium">Co-Founder</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="text-indigo-700 text-3xl font-bold mt-10 mb-6 text-center">Meet Our Team</h3>
      <Row className="mb-10 justify-center g-4"> 
        <Col md={3} sm={6} className="mb-4">
          <Card className="shadow-lg rounded-xl text-center h-full transition-transform duration-300 hover:scale-105">
            <Card.Img variant="top" src={guard2} alt="Alumansi Musa" className="p-4 rounded-full w-48 h-48 object-cover object-top mx-auto" />
            <Card.Body>
              <Card.Title className="text-lg font-semibold text-gray-800">Mr. Alumansi Musa</Card.Title>
              <Card.Text className="text-gray-600 text-sm">Chief Investigation Officer & Operations Manager</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="shadow-lg rounded-xl text-center h-full transition-transform duration-300 hover:scale-105">
            <Card.Img variant="top" src={team2} alt="Byaruhanga Tadeo" className="p-4 rounded-full w-48 h-48 object-cover object-top mx-auto" />
            <Card.Body>
              <Card.Title className="text-lg font-semibold text-gray-800">Mr. Byaruhanga Tadeo</Card.Title>
              <Card.Text className="text-gray-600 text-sm">Assistant Operations Manager</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="shadow-lg rounded-xl text-center h-full transition-transform duration-300 hover:scale-105">
            <Card.Img variant="top" src={guard2} alt="Nsamba Francis" className="p-4 rounded-full w-48 h-48 object-cover object-top mx-auto" />
            <Card.Body>
              <Card.Title className="text-lg font-semibold text-gray-800">Mr. Nsamba Francis</Card.Title>
              <Card.Text className="text-gray-600 text-sm">Assistant Operations Manager – Control Room</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="shadow-lg rounded-xl text-center h-full transition-transform duration-300 hover:scale-105">
            <Card.Img variant="top" src={guard2} alt="James Thomas" className="p-4 rounded-full w-48 h-48 object-cover object-top mx-auto" />
            <Card.Body>
              <Card.Title className="text-lg font-semibold text-gray-800">Mr. James Thomas</Card.Title>
              <Card.Text className="text-gray-600 text-sm">Assistant Operations Manager – Control Room</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="text-indigo-700 text-3xl font-bold mt-10 mb-6 text-center">Why Choose GKO Security?</h3>
      <Card className="shadow-lg rounded-xl mb-10 p-6">
        <Card.Body>
          <ul className="mb-0 space-y-3 text-gray-700 text-lg">
            <li><strong className="text-indigo-600">Highly Trained Personnel:</strong> Our guards and staff undergo rigorous training and regular refreshers.</li>
            <li><strong className="text-indigo-600">Advanced Technology:</strong> We deploy modern surveillance, alarm, and response systems.</li>
            <li><strong className="text-indigo-600">Customized Solutions:</strong> Every client receives a tailored approach suited to their specific risks and environment.</li>
            <li><strong className="text-indigo-600">24/7 Monitoring:</strong> Our control room is manned day and night to ensure immediate incident response.</li>
          </ul>
        </Card.Body>
      </Card>

      <h3 className="text-indigo-700 text-3xl font-bold mb-6 text-center">What Makes Us Special?</h3>
      <Card className="shadow-lg rounded-xl mb-10 p-6">
        <Card.Body>
          <ul className="mb-0 space-y-3 text-gray-700 text-lg">
            <li><FaStar className="text-yellow-500 mr-2" /> <strong className="text-indigo-600">Proven track record:</strong> with banks, supermarkets, institutions, and estates.</li>
            <li><FaCertificate className="text-green-500 mr-2" /> <strong className="text-indigo-600">Certified and licensed:</strong> by Uganda Police & Ministry of Internal Affairs.</li>
            <li><FaCheckCircle className="text-blue-500 mr-2" /> <strong className="text-indigo-600">Commitment:</strong> to transparency, trust, and long-term client satisfaction.</li>
          </ul>
        </Card.Body>
      </Card>
      
      <Card className="shadow-lg rounded-xl p-6 mb-5 bg-gray-100 text-gray-800">
        <Card.Body>
          <Card.Title className="text-indigo-700 text-2xl font-semibold mb-4">
            Connect With Us
          </Card.Title>
          <p className="text-center text-lg mb-4">Follow us on social media for updates and insights.</p>
          <SocialLinks /> 
        </Card.Body>
      </Card>
      
      <Card className="shadow-lg rounded-xl p-6 mb-5 bg-indigo-50 text-indigo-800"> 
        <Card.Body>
          <Card.Title className="text-indigo-700 text-2xl font-semibold mb-4">
            <FaPhoneAlt className="inline-block mr-3" /> Get in Touch
          </Card.Title>
          <p className="flex items-center text-lg mb-2"><FaMapMarkerAlt className="mr-3 text-indigo-600" /> Plot 1336, Port Bell Road, Kitintale, Kampala</p>
          <p className="flex items-center text-lg mb-2"><FaPhoneAlt className="mr-3 text-indigo-600" /> +256-700-000000 | +256-772-000000</p>
          <p className="flex items-center text-lg mb-4"><FaEnvelope className="mr-3 text-indigo-600" /> info@gkosecurity.com</p>
          <Button variant="primary" href="/contact" className="w-auto py-2 px-6 rounded-md font-semibold transition-transform duration-200 transform hover:scale-105">
            Contact Us Now
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}