import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SLLogin.css";
import universityLogo from "./SLassets/anna-university-logo.png";

function SLLogin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    registerno: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = isAdmin
      ? "http://localhost:3001/admin-login"
      : "http://localhost:3001/login";

    axios
      .post(endpoint, formData, { headers: { "Access-Control-Allow-Origin": "http://localhost:5173" } })
      .then((result) => {
        if (result.data.status === "Success") {
          // Save the user data and role in localStorage
          localStorage.setItem('role', result.data.user.role);  // Store the role ('admin' or 'student')
          localStorage.setItem('user', JSON.stringify(result.data.user));  // Store user data

          // Navigate to the appropriate dashboard based on the role
          navigate("/dashboard");
        } else {
          alert(result.data.message || "Login failed");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="SL-login-container">
      {/* Left Section - Welcome Message with Image */}
      <div className="SL-left">
        <div className="SL-welcome-section">
          <h1 className="SL-title">Anna University</h1>
          <h2 className="SL-subtitle">MCA Student Portal</h2>
          <img
            src={universityLogo}
            alt="Anna University Logo"
            className="SL-university-logo"
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="SL-right">
        <div className="SL-login-box">
          <h1 className="SL-login-heading">
            {isAdmin ? "Admin Login" : "Student Login"}
          </h1>
          <p className="SL-login-text">
            {isAdmin
              ? "Access admin dashboard"
              : "Access your student account"}
          </p>

          {/* Login Type Toggle */}
          <div className="SL-toggle-container">
            <div
              className={`SL-toggle-option ${!isAdmin ? "SL-active" : ""}`}
              onClick={() => setIsAdmin(false)}
            >
              Student
            </div>
            <div
              className={`SL-toggle-option ${isAdmin ? "SL-active" : ""}`}
              onClick={() => setIsAdmin(true)}
            >
              Admin
            </div>
          </div>

          <form className="SL-form" onSubmit={handleSubmit}>
            <input
              className="SL-input"
              type="text"
              name="registerno"
              placeholder={isAdmin ? "Admin ID" : "Register Number"}
              required
              value={formData.registerno}
              onChange={handleChange}
            />
            <input
              className="SL-input"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="SL-button">
              {isAdmin ? "Admin Login" : "Student Login"}
            </button>
          </form>

          {/* Show signup link only for students */}
          {!isAdmin && (
            <p className="SL-signup-link">
              Don't have an account?{" "}
              <a
                href="#"
                className="SL-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Sign Up
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SLLogin;
