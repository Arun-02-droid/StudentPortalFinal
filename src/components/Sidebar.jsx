import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleDropdownItemClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    // Clear all relevant data from localStorage and sessionStorage
    localStorage.clear();  // This will clear everything in localStorage
    sessionStorage.clear();  // This will clear everything in sessionStorage

    // Redirect to login page (you can use React Router's `useNavigate` if you're using React Router)
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="vertical-nav">
      <div className="logo">
        <h1>Student Portal</h1>
      </div>
      
      <div className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}>
        <div className="title" onClick={() => handleSectionClick('dashboard')}>
          <span>Dashboard</span>
        </div>
      </div>
      
      <div className={`nav-item ${openDropdown === 'academic' ? 'open' : ''}`}>
        <div className="title" onClick={() => toggleDropdown('academic')}>
          <span>Academic Section</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="dropdown">
          <div className="dropdown-item" onClick={() => handleDropdownItemClick('questionpaper')}>
            Question Paper
          </div>
          <div className="dropdown-item" onClick={() => handleDropdownItemClick('resources')}>
            Resources
          </div>
          <div className="dropdown-item" onClick={() => handleDropdownItemClick('syllabus')}>
            Syllabus & Calender
          </div>
        </div>
      </div>
      
      <div className={`nav-item ${openDropdown === 'exam' ? 'open' : ''}`}>
        <div className="title" onClick={() => toggleDropdown('exam')}>
          <span>Exam Details</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="dropdown">
          <div className="dropdown-item" onClick={() => handleDropdownItemClick('exammarks')}>
            Exam Marks
          </div>
          <div className="dropdown-item" onClick={() => handleDropdownItemClick('examcgpa')}>
            Exam CGPA
          </div>
          <div className="dropdown-item" onClick={() => handleDropdownItemClick('examtips')}>
            Exam Tips
          </div>
        </div>
      </div>
      
      <div className={`nav-item ${openDropdown === 'community' ? 'open' : ''}`}>
        <div className="title" onClick={() => toggleDropdown('community')}>
          <span>Community</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="dropdown">
          <div className="dropdown-item" onClick={() => handleDropdownItemClick('forum')}>
            Discussion Forum
          </div>
          <div className="dropdown-item" onClick={() => handleDropdownItemClick('alumni')}>
            Alumni Contact
          </div>
        </div>
      </div>
      
      <div className={`nav-item ${activeSection === 'placement' ? 'active' : ''}`}>
        <div className="title" onClick={() => handleSectionClick('placement')}>
          <span>Placement</span>
        </div>
      </div>
      
      <div className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
        <div className="title" onClick={() => handleSectionClick('contact')}>
          <span>Contact Us</span>
        </div>
      </div>
      
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
