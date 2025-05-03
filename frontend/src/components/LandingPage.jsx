import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Welcome to Neighborly</h1>
          <p>Your neighborhood—reimagined online</p>
          <Link to="/signup" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="feature-section">
        <h2 className="section-title">Why Neighborly?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Hyper-Local Feed</h3>
            <p>Only see posts from your immediate neighborhood—no more noise.</p>
          </div>
          <div className="feature-card">
            <h3>Built-In Marketplace</h3>
            <p>Buy, sell, and swap goods with neighbors you know and trust.</p>
          </div>
          <div className="feature-card">
            <h3>Community Alerts</h3>
            <p>Get notified of lost pets, safety concerns, and emergency updates.</p>
          </div>
          <div className="feature-card">
            <h3>Event Planning</h3>
            <p>Organize block parties, meetups, and yard sales—all in one place.</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
        <section className="comparison-section">
        <h2 className="section-title">Better Than the Rest</h2>
        <div className="comparison-cards">
            <div className="comparison-card">
            <h3>Nextdoor</h3>
            <p>Great for alerts, weak on commerce.</p>
            </div>
            <div className="comparison-card">
            <h3>Facebook</h3>
            <p>Broad reach, zero neighborhood focus.</p>
            </div>
            <div className="comparison-card">
            <h3>Craigslist</h3>
            <p>Marketplace only, no community tools.</p>
            </div>
        </div>
        </section>


      {/* Benefits */}
      <section className="benefits-section">
        <h2 className="section-title">Our Advantages</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4>Trusted Connections</h4>
            <p>Verified neighbors build real trust.</p>
          </div>
          <div className="benefit-card">
            <h4>Single App</h4>
            <p>Community, commerce, and planning in one place.</p>
          </div>
          <div className="benefit-card">
            <h4>Safety First</h4>
            <p>Fast, secure alerts keep everyone informed.</p>
          </div>
          <div className="benefit-card">
            <h4>Skill Sharing</h4>
            <p>Offer or request services and build local networks.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Join Your Digital Neighborhood?</h2>
        <Link to="/signup" className="cta-button">
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Neighborly. All rights reserved.</p>
      </footer>
    </div>
  );
}