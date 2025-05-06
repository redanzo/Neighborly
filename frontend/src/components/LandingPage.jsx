import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="landing-wrapper">
      <header className={`landing-header ${scrolled ? "scrolled" : ""}`}>
        <div className="landing-logo">
          <img src="/img/Neighborly_Logo.png" alt="Neighborly Logo" />
        </div>
        <nav className="landing-nav">
          <Link to="/login" className="landing-btn outline">
            Login
          </Link>
          <Link to="/signup" className="landing-btn filled">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="hero-text">
            <h1>Bringing Neighbors Together</h1>
            <p>
              Connect, share, and thrive in your local community with
              Neighborly.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to="/signup" className="landing-btn filled">
                Join Now
              </Link>
            </div>
          </div>
          <div className="hero-img">
            <img src="/img/Neighborhood.jpg" alt="Community Graphic" />
          </div>
        </section>

        <section className="landing-features">
          <h2>Why Neighborly?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🛍️ Neighborhood Marketplace</h3>
              <p>
                Buy, sell, and trade items directly with trusted neighbors in
                your community.
              </p>
            </div>
            <div className="feature-card">
              <h3>🐾 Lost & Found Pets</h3>
              <p>
                Report and discover lost or found pets to quickly reunite furry
                friends with their owners.
              </p>
            </div>
            <div className="feature-card">
              <h3>🚨 Community Alerts</h3>
              <p>
                Stay informed about nearby crime reports, safety hazards, and
                emergency situations.
              </p>
            </div>
            <div className="feature-card">
              <h3>🎉 Local Events & Activities</h3>
              <p>
                Attend and promote neighborhood gatherings, block parties,
                cleanups, and community meetings.
              </p>
            </div>
          </div>
        </section>

        <section className="landing-cta">
          <h2>Start Connecting Today</h2>
          <p>
            Join thousands of neighborhoods already building stronger
            communities on Neighborly.
          </p>
          <div>
            <Link to="/signup" className="landing-btn filled">
              Get Started
            </Link>
            <Link to="/login" className="landing-btn outline">
              Add Your Community Today!
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Neighborly. All rights reserved.</p>
          <Link to="/" style={{ color: "white", opacity: 0.8 }}>
            Privacy Policy
          </Link>
          <Link to="/" style={{ color: "white", opacity: 0.8 }}>
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}