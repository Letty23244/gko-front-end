
import React from "react";
import "./services.css";

import guardImg  from "../assets/person.jpg";
import cctvImg   from "../assets/cctv.jpeg";
import alarmImg  from "../assets/alarm.jpeg";
import eventImg  from "../assets/event.jpg";

function ServicesPage() {
  const services = [
    {
      title: "Guard Services",
      img: guardImg,
      description: "Professional guards trained to keep your property and people safe 24/7."
    },
    {
      title: "CCTV Installation",
      img: cctvImg,
      description: "High‑quality cameras installed to monitor your premises effectively."
    },
    {
      title: "Alarm Response",
      img: alarmImg,
      description: "Quick and reliable alarm response to keep you protected at all times."
    },
    {
      title: "Event Security",
      img: eventImg,
      description: "Security solutions tailored for events, ensuring safety and smooth flow."
    }
  ];

  return (
    <div className="services-page">
    
      <h1>Who We Are &amp; What We Offer</h1>
      <p>
        At GKO Security, we provide a wide range of professional security services
        tailored to meet the unique needs of individuals, businesses, and institutions.
        Our goal is to ensure the safety of people, property, and valuable assets through
        trusted expertise, modern technology, and highly trained personnel.
      </p>

      
      <div className="services-list">
        {services.map(({ title, img, description }) => (
          <div key={title} className="service-item">
            <img src={img} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <section className="why-choose">
        <h2>Why Choose GKO Security?</h2>
        <ul>
          <li>Over 1,000 trained security personnel</li>
          <li>Nationwide coverage and rapid response</li>
          <li> Use of advanced surveillance and alarm systems</li>
          <li> 24 / 7 customer support</li>
        </ul>
      </section>

    
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <blockquote>
          “GKO guards are reliable and professional. They’ve protected our premises for three years now!”
          <cite> – ,DTB BANK Kampala</cite>
        </blockquote>
        <blockquote>
          “The CCTV installation was quick and affordable. Excellent service.”
          <cite> – Mutungo hill resisdents, Mutungo</cite>
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
