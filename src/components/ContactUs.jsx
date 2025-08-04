import React from 'react';
import './ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ContactUs = () => {
  const handleSocialMediaClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="contact-us-container">
      <div className="contact-section">
        <h2>Contact Information</h2>
        <div className="contact-cards">
          <div className="contact-card">
            <div className="icon-container">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            </div>
            <h3>Email Support</h3>
            <div className="contact-details">
              <p>Academic Concerns: <a href="mailto:academics@university.edu">academics@university.edu</a></p>
              <p>Technical Support: <a href="mailto:support@university.edu">support@university.edu</a></p>
              <p>Admissions: <a href="mailto:admissions@university.edu">admissions@university.edu</a></p>
            </div>
          </div>

          <div className="contact-card">
            <div className="icon-container">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
            </div>
            <h3>Phone</h3>
            <div className="contact-details">
              <p>Helpline: <a href="tel:+12345678900">+1-234-567-8900</a></p>
              <p>Admissions: <a href="tel:+12345678901">+1-234-567-8901</a></p>
              <p>Student Affairs: <a href="tel:+12345678902">+1-234-567-8902</a></p>
            </div>
          </div>

          <div className="contact-card">
            <div className="icon-container">
              <FontAwesomeIcon icon={faBuilding} className="contact-icon" />
            </div>
            <h3>Address</h3>
            <div className="contact-details">
              <p>123 University Avenue</p>
              <p>Campus Buildings 4-6</p>
              <p>Education City, ST 12345</p>
            </div>
          </div>
        </div>
      </div>

      <div className="social-media-section">
        <h2>Connect With Us</h2>
        <div className="social-media-container">
          <div 
            className="social-media-card facebook"
            onClick={() => handleSocialMediaClick('https://www.facebook.com/AnnaUniversityOnline/')}
          >
            <div className="social-icon-container">
              <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            </div>
            <h3>Facebook</h3>
            <p>Follow us for events, news, and community updates</p>
            <span className="visit-link">Visit Page</span>
          </div>

          <div 
            className="social-media-card instagram"
            onClick={() => handleSocialMediaClick('https://www.instagram.com/YourCollegePage')}
          >
            <div className="social-icon-container">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </div>
            <h3>Instagram</h3>
            <p>See campus life, student activities, and announcements</p>
            <span className="visit-link">Visit Page</span>
          </div>

          <div 
            className="social-media-card linkedin"
            onClick={() => handleSocialMediaClick('https://www.linkedin.com/school/anna-university/')}
          >
            <div className="social-icon-container">
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </div>
            <h3>LinkedIn</h3>
            <p>Connect for professional networking and career opportunities</p>
            <span className="visit-link">Visit Page</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;