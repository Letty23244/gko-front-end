// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./services.css";

// // Local fallback images
// import guardImg from "../assets/person.jpg";
// import cctvImg from "../assets/cctv.jpeg";
// import alarmImg from "../assets/alarm.jpeg";
// import eventImg from "../assets/event.jpg";
// import patrolImg from "../assets/patrol.webp";  
// import escortImg from "../assets/VIP Escort.webp";  
// import fireImg from "../assets/fire-alarm.jpg";      
// import k9Img from "../assets/K9.jpg";          

// // Map titles from backend → images
// const imageMap = {
//   "Guard Services": guardImg,
//   "CCTV Installation": cctvImg,
//   "Alarm Response": alarmImg,
//   "Event Security": eventImg,
//   "Mobile Patrol": patrolImg,
//   "VIP Escort": escortImg,
//   "Fire Safety Monitoring": fireImg,
//   "K9 Security": k9Img,
// };



// function ServicesPage() {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:5000/api/v1/services/") // Adjust if deployed
//       .then((res) => {
//         setServices(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to load services. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading services...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="services-page">
//       <h1>Who We Are &amp; What We Offer</h1>
//       <p>
//         At GKO Security, we provide a wide range of professional security services
//         tailored to meet the unique needs of individuals, businesses, and institutions.
//         Our goal is to ensure the safety of people, property, and valuable assets through
//         trusted expertise, modern technology, and highly trained personnel.
//       </p>

//      <div className="services-list">
//   {services.map(service => (
//     <div key={service.id} className="service-item">
//      <img
//               src={imageMap[service.image] || k9Img} // Fallback to k9Img if no match
//               alt={service.title}
//             />
//       <h3>{service.title}</h3>
//       <p>{service.description}</p>
//     </div>
//   ))}
// </div>


//       <section className="why-choose">
//         <h2>Why Choose GKO Security?</h2>
//         <ul>
//           <li>Over 1,000 trained security personnel</li>
//           <li>Nationwide coverage and rapid response</li>
//           <li>Use of advanced surveillance and alarm systems</li>
//           <li>24 / 7 customer support</li>
//         </ul>
//       </section>

//       <section className="testimonials">
//         <h2>What Our Clients Say</h2>
//         <blockquote>
//           “GKO guards are reliable and professional. They’ve protected our premises for three years now!”
//           <cite> – DTB BANK Kampala</cite>
//         </blockquote>
//         <blockquote>
//           “The CCTV installation was quick and affordable. Excellent service.”
//           <cite> – Mutungo hill residents, Mutungo</cite>
//         </blockquote>
//       </section>

//       <section className="call-to-action">
//         <h2>Need Reliable Security?</h2>
//         <p>Get in touch with our team today and let us protect what matters most.</p>
//         <a href="/contact" className="btn">Contact Us Now</a>
//       </section>
//     </div>
//   );
// }

// export default ServicesPage;




import React, { useEffect, useState } from "react";
import axios from "axios";
import "./services.css";

// Import all local images as fallback
import guardImg from "../assets/person.jpg";
import cctvImg from "../assets/cctv.jpeg";
import alarmImg from "../assets/alarm.jpeg";
import eventImg from "../assets/event.jpg";
import patrolImg from "../assets/patrol.webp";  
import escortImg from "../assets/VIP Escort.webp";  
import fireImg from "../assets/fire-alarm.jpg";      
import k9Img from "../assets/K9.jpg";          

// Map filenames → local imports (fallbacks)
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

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/v1/services/")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load services. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p className="error">{error}</p>;

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
        {services.map((service) => {
          // Use the backend image if it exists in fallbackImages, otherwise default to guardImg
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
