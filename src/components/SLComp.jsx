import React from "react";
import Signup1 from "./SignUpComponents/SLSignup1";
import Login from "./SignUpComponents/SLLogin";
import DashBoard from "./DashBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function SLComp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup1 />} />
        <Route path="/dashboard" element={<DashBoard />} />
        {/* <Route path="/admin-dashboard" element={<Admindashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default SLComp;
