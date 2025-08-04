import React from "react";
import welcomeImage from "./SLassets/welcome-image.png";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-section">
      <h1 className="welcome-text">Welcome to Student Portal</h1>
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />
    </div>
  );
}

export default Welcome;