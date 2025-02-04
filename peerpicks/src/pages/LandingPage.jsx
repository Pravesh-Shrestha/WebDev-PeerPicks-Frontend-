import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to PeerPicks!</h1>
      <p>Connect with friends and share your favorite places!</p>
      <Link to="/register" className="btn">
        Get Started
      </Link>
    </div>
  );
}

export default LandingPage;
