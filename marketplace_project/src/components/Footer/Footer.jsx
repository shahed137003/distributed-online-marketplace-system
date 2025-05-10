import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Container, Row, Col } from "react-bootstrap";
import './Footer.css'
export default function Footer() {
  return (
    <footer className="footer py-4">
    <Container fluid>
      <Row className="align-items-center">
        {/* Left side: copyright */}
        <Col xs={12} sm={6} className="text-center text-sm-start mb-3 mb-sm-0">
          <p className="footer-text mb-0">
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </Col>

        {/* Right side: social icons */}
        <Col xs={12} sm={6} className="text-center text-sm-end">
          <div className="social-icons">
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
    </Container>
  </footer>
  )
}
