import React, { useEffect, useState } from "react";
import api from "../Api/Api";
import "./services.css";

// Local fallback images
import guardImg from "../assets/person.jpg";
import cctvImg from "../assets/cctv.jpeg";
import alarmImg from "../assets/alarm.jpeg";
import eventImg from "../assets/event.jpg";
import patrolImg from "../assets/patrol.webp";
import escortImg from "../assets/VIP Escort.webp";
import fireImg from "../assets/fire-alarm.jpg";
import k9Img from "../assets/K9.jpg";

// Map backend image names → local fallback imports
const fallbackImages = {
  "person.jpg": guardImg,
  "cctv.jpeg": cctvImg,
  "alarm.jpeg": alarmImg,
  "event.jpg": eventImg,
  "patrol.webp": patrolImg,
  "VIP Escort.webp": escortImg,
  "fire-alarm.jpg": fireImg,
  "K9.jpg": k9Img,
};

// Optional fallback services if API fails
const fallbackServices = [
  { id: 1, title: "Security Guards", description: "Professional guards", price_rate: 100000, image: "person.jpg" },
  { id: 2, title: "CCTV Monitoring", description: "Advanced surveillance", price_rate: 150000, image: "cctv.jpeg" },
  { id: 3, title: "Fire Alarm Systems", description: "Protect from fire hazards", price_rate: 120000, image: "fire-alarm.jpg" },
];

function ServicesPage() {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.services.getAll();

        if (Array.isArray(res)) {
          setServices(res);
        } else if (res.success && res.data) {
          setServices(res.data);
        } else {
          setError("Failed to load services. Showing default services.");
          setServices(fallbackServices);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load services. Showing default services.");
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <h1>Who We Are &amp; What We Offer</h1>
      <p>
        At GKO Security, we provide a wide range of professional security services
        tailored to meet the unique needs of individuals, businesses, and institutions.
        Our goal is to ensure the safety of people, property, and valuable assets through
        trusted expertise, modern technology, and highly trained personnel.
      </p>

      {loading && <p className="loading">Loading services...</p>}
      {error && <p className="error">{error}</p>}

      <div className="services-list">
        {services.map((service) => {
          const imgSrc = fallbackImages[service.image] || guardImg;
          return (
            <div key={service.id} className="service-item">
              <img src={imgSrc} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Price Rate:</strong> {service.price_rate} UGX</p>
            </div>
          );
        })}
      </div>

      <section className="why-choose">
        <h2>Why Choose GKO Security?</h2>
        <ul>
          <li>Over 1,000 trained security personnel</li>
          <li>Nationwide coverage and rapid response</li>
          <li>Use of advanced surveillance and alarm systems</li>
          <li>24 / 7 customer support</li>
        </ul>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <blockquote>
          “GKO guards are reliable and professional. They’ve protected our premises for three years now!”
          <cite> – DTB BANK Kampala</cite>
        </blockquote>
        <blockquote>
          “The CCTV installation was quick and affordable. Excellent service.”
          <cite> – Mutungo hill residents, Mutungo</cite>
        </blockquote>
      </section>

      <section className="call-to-action">
        <h2>Need Reliable Security?</h2>
        <p>Get in touch with our team today and let us protect what matters most.</p>
        <a href="/contact" className="btn">Contact Us Now</a>
      </section>
    </div>
  );
}

export default ServicesPage;
