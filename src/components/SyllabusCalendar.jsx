import React from 'react';
import './SyllabusCalendar.css';

const SyllabusCalendar = () => {
  const handleCardClick = (url) => {
    // Open the official website in a new tab
    window.open(url, '_blank');
  };

  return (
    <div className="syllabus-calendar-section">
      <div className="section-header">
        <h2>Syllabus & Academic Calendar</h2>
        <p>Access your course syllabus and academic calendar from the official website</p>
      </div>

      <div className="syllabus-calendar-cards">
        <div 
          className="syllabus-calendar-card"
          onClick={() => handleCardClick('https://university-official-syllabus-url.edu')}
        >
          <div className="card-icon">
            <i className="fas fa-book"></i>
          </div>
          <h3>Syllabus</h3>
          <p>View detailed course syllabus for all subjects</p>
          <div className="card-footer">
            <span>Click to access official syllabus</span>
            <i className="fas fa-external-link-alt"></i>
          </div>
        </div>

        <div 
          className="syllabus-calendar-card"
          onClick={() => handleCardClick('https://university-official-calendar-url.edu')}
        >
          <div className="card-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <h3>Academic Calendar</h3>
          <p>View academic schedule, holidays, and important dates</p>
          <div className="card-footer">
            <span>Click to access official calendar</span>
            <i className="fas fa-external-link-alt"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusCalendar;