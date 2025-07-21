// src/App.js

import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/HeroSection"
import Footer from "./components/footer";
import AboutPage from "./pages/about_us"
// import HomePage from "./pages/home";
import ServicesPage from "./pages/services";
import ContactUs from './pages/ContactUs';
import CareerPage from "./pages/CareerPage";
import './App.css';

 function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element ={
            <div>
              <Hero />
            </div>
          }
          />
          
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/about_us" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactUs />} />
         <Route path="/careers" element={<CareerPage />} />
         <Route path="/services" element={<ServicesPage />} />

          
        </Routes>
      </div>
      
       <Footer />
    </BrowserRouter>
  );
}



export default App;
