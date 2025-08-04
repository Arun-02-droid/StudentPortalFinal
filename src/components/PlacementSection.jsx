import React from 'react';
import './PlacementSection.css';

const PlacementSection = () => {
  const handleOfficialPortalClick = () => {
    // Navigate to official college placement portal
    window.open('https://placement.collegeportal.edu', '_blank');
  };

  const handleTipsCardClick = () => {
    // Toggle visibility of placement tips
    const tipsSection = document.getElementById('placement-tips-section');
    if (tipsSection) {
      tipsSection.classList.toggle('show');
    }
  };

  return (
    <div className="placement-section-container">
      <h2 style={{color: 'black', marginBottom: '20px'}}>Placement Section</h2>
      <div className="placement-cards">
        <div className="placement-card official-portal" onClick={handleOfficialPortalClick}>
          <div className="card-icon">
            <i className="fas fa-building"></i>
          </div>
          <h3>Official College Placement Cell</h3>
          <p>Access college placement portal for upcoming drives, company profiles, and application forms</p>
          <div className="card-action">
            <span>Visit Portal</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>

        <div className="placement-card placement-tips" onClick={handleTipsCardClick}>
          <div className="card-icon">
            <i className="fas fa-lightbulb"></i>
          </div>
          <h3>Placement Tips for Students</h3>
          <p>Get expert advice on how to prepare yourself for the placement season</p>
          <div className="card-action">
            <span>View Tips</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <div id="placement-tips-section" className="placement-tips-section">
        <div className="tips-header">
          <h2>Tips to Get Placed Successfully</h2>
          <button className="close-btn" onClick={handleTipsCardClick}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="tips-content">
          <div className="tip-item">
            <div className="tip-details">
              <h4>Practice Coding Problems</h4>
              <p>Regularly solve problems on platforms like HackerRank and LeetCode to improve your algorithmic and problem-solving skills.</p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-details">
              <h4>Develop Soft Skills</h4>
              <p>Enhance your communication, teamwork, and leadership abilities. Many companies prioritize these skills equally with technical knowledge.</p>
            </div>
          </div>

          {/* Additional tips here... */}
        </div>
      </div>
    </div>
  );
};

export default PlacementSection;