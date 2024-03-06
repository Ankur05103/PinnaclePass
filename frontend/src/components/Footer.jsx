import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>Made with ❤️ by PinnaclePass team</p>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Email: info@pinnaclepass.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div className="footer-column">
          <h3>Follow Us on</h3>
          <div className="social-icons">
            <a href="/"><i className="fa fa-facebook">Instagram</i></a>
            <a href="/"><i className="fa fa-twitter">Twitter</i></a>
            <a href="/"><i className="fa fa-instagram">Youtube</i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
