import React, { useState } from "react";
import "./Common.css";

const About = () => {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <div className="about-container">
      <h1>Welcome to VBeon</h1>
      <p>
        <strong>VBeon</strong> is a <b>real-time chat platform</b> designed for seamless and secure communication.  
        Whether you're collaborating, discussing, or socializing, VBeon keeps your conversations structured and private.
      </p>

      <div className="about-grid">
        <div className="about-box">
          <h2>What We Offer</h2>
          <ul style={{listStyle : "none"}}>
            <li>💬 <b>Instant Messaging</b> – Fast and reliable text communication</li>
            <li>🔒 <b>Private Channels</b> – Exclusive spaces for selected members</li>
            <li>✨ <b>Join via Code</b> – Quickly access servers using invite codes</li>
          </ul>
        </div>
        <div className="about-box">
          <h2>Why Choose Us?</h2>
          <ul style={{listStyle : "none"}}>
            <li>🔐 <b>Privacy First</b> – Only invited users can access private channels</li>
            <li>🌍 <b>Community-Driven</b> – Create and manage your own servers</li>
            <li>⚡ <b>Efficient & Secure</b> – Built for a smooth and protected chatting experience</li>
          </ul>
        </div>
        <div className="about-box">
          <h2>Our Mission</h2>
          <p>
            Our goal is to build a <b>next-generation chat platform</b> that prioritizes <b>privacy, security, and ease of use</b> for all users.
          </p>
        </div>
      </div>

      {/* Documentation Section */}
      <div className="documentation-section">
        <h2>📖 VBeon Documentation</h2>
        <p>
          Click the button below to view all details about VBeon, including how to use our features.
        </p>
        <button className="docs-button" onClick={() => setShowDocs(!showDocs)}>
          {showDocs ? "Hide Documentation" : "View Documentation"}
        </button>

        {showDocs && (
          <div className="docs-content">
            <h3>Getting Started</h3>
            <p>1️⃣ Sign up using your email and create a unique username.</p>
            <p>2️⃣ Join or create a server to start chatting.</p>
            <p>3️⃣ Use an invite code to connect with private communities.</p>

            <h3>Features & Usage</h3>
            <p>💬 **Text Chat** – Send messages instantly in real-time.</p>
            <p>🔒 **Private Channels** – Only selected members can join.</p>
            <p>📌 **Pinned Messages** – Save important messages for easy access.</p>
            <p>🎨 **Custom Themes** – Personalize your chat experience.</p>

            <h3>FAQs</h3>
            <p><b>Q:</b> How do I create a server? <br /> <b>A:</b> Click on "Create Server" and follow the instructions.</p>
            <p><b>Q:</b> How do I invite someone? <br /> <b>A:</b> Generate an invite code and share it with your friends.</p>
            <p><b>Q:</b> Is my data secure? <br /> <b>A:</b> Yes! VBeon uses end-to-end encryption for private channels.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
