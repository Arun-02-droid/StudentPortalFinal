import React, { useState } from "react";
import Welcome from "./Welcome";
import "./SLSignup1.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SLSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    registerno: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, registerno, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios.post('http://localhost:3001/register', {
      name: fullName,   // Match backend field
      email: email,
      registerno: registerno,
      password: password
    })
    .then(result => {
      console.log(result);
      navigate('/login');
    })
    .catch(err => {
      console.log(err.response ? err.response.data : err.message);
      alert(err.response?.data?.message || "Registration failed.");
    });
  };

  return (
    <div className="SL-signup-container">
      <div className="SL-signup-left">
        <div className="SL-signup-box">
          <h1 className="SL-signup-heading">Sign Up</h1>
          <p className="SL-signup-text">Create your student account</p>
          <form className="SL-signup-form" onSubmit={handleSubmit}>
            <input
              className="SL-signup-input"
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              className="SL-signup-input"
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="SL-signup-input"
              type="text"
              name="registerno"
              placeholder="Register Number"
              required
              value={formData.registerno}
              onChange={handleChange}
            />
            <input
              className="SL-signup-input"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className="SL-signup-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button className="SL-signup-button" type="submit">Create Account</button>
          </form>
          <p className="SL-login-link">
            Already have an account?{" "}
            <a href="#" className="SL-login-anchor" onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}>
              Login
            </a>
          </p>
        </div>
      </div>
      <div className="SL-signup-right">
        <Welcome />
      </div>
    </div>
  );
}

export default SLSignup;
