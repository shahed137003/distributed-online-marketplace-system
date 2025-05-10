import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Make sure this CSS file contains your social-icons styles

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: '40px 20px' }}>
      <Container>
        {/* Title and Description */}
        <Row className="text-center mb-4">
          <Col>
            <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>
              Fashion<span style={{ color: '#6f42c1' }}>Store</span>
            </h2>
            <p style={{ maxWidth: '600px', margin: '10px auto 0', color: '#ccc', lineHeight: '1.6' }}>
              Discover, buy, and sell products effortlessly in our all-in-one online marketplace — connecting buyers and sellers in a fast,
              secure, and user-friendly environment.
            </p>
          </Col>
        </Row>

        {/* Social Icons */}
        <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <div className="social-icons d-flex gap-3 justify-content-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: '#444', maxWidth: '80%', margin: '0 auto 20px' }} />

        {/* Bottom Copyright */}
        <Row>
          <Col className="text-center" style={{ color: '#aaa', fontSize: '14px' }}>
            © 2025 SALE Square. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
