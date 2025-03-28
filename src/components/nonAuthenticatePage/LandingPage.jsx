import React, { useState } from "react";
import ROBOSVG from "../../assets/FloatingRobo.svg";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  //Navigate to Assistant Page

  const signUp = () => {
    navigate("/emo");
  };
  return (
    <>
      <div className="landing-container">
        <nav className="navbar">
          <div className="logo">
            {" "}
            <img
              src={ROBOSVG}
              alt="Chatbot"
              style={{
                width: "42px",
                position: "absolute",
                bottom: "9px",
                left: "40px",
              }}
            />
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`nav-links ${menuActive ? "active" : ""}`}>
            <Link style={{ color: "white" }} to="/about">
              About
            </Link>
            <Link style={{ color: "white" }} to="/contact">
              Contact
            </Link>
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
            <Link style={{ color: "white" }} to="/emo" className="signup">
              Sign up
            </Link>
          </ul>
        </nav>

        <div className="hero-section">
          <h1 style={{ fontWeight: "bold" }}>Chat Beyond Limits</h1>
          <p>
            Create your space. Build servers, add channels, and chat without
            limits. Your community, your rules.
          </p>
          <button onClick={signUp} className="glow-button glowMove">
            <span className="increase-index">Getting Started</span>
          </button>
        </div>
        <img src={ROBOSVG} alt="Chatbot" className="floating-robot" />
        <footer className="d-flex justify-content-between">
          <p>© 2025 VBEON. All rights reserved.</p>
          <p>Made with ❤️ for seamless conversations.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
