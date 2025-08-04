import React from 'react';
import './ExamDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBrain, 
  faClock, 
  faBook, 
  faPencilAlt, 
  faListCheck 
} from '@fortawesome/free-solid-svg-icons';

const ExamDetails = ({ section }) => {
  // Render single exam marks card section
  const renderExamMarks = () => {
    return (
      <div className="exam-marks-section">
        <div 
          className="subject-marks-card single-card"
          onClick={() => window.location.href = `https://acoe.annauniv.edu/sems/login/student`}
        >
          <h3>Check Your Marks</h3>
          <div className="view-details">
            <span>View Detailed Analysis</span>
            <i className="arrow-icon">→</i>
          </div>
        </div>
      </div>
    );
  };
  
  // Render CGPA as "Work in Progress"
  const renderCGPA = () => {
    return (
      <div className="cgpa-section work-in-progress">
        <h2>Work in Progress</h2>
        <p>This section is currently under development.</p>
      </div>
    );
  };
  
  // Render exam tips section
  const renderExamTips = () => {
    const tips = [
      {
        icon: faBrain,
        title: "Understand, Don't Memorize",
        description: "Focus on understanding concepts rather than memorizing. Create concept maps to connect ideas."
      },
      {
        icon: faClock,
        title: "Effective Time Management",
        description: "Create a structured study schedule. Allocate more time to difficult subjects and use the Pomodoro technique."
      },
      {
        icon: faBook,
        title: "Regular Revision",
        description: "Review your notes regularly. Spaced repetition helps retain information longer."
      },
      {
        icon: faPencilAlt,
        title: "Practice Previous Papers",
        description: "Solve previous years' question papers to understand the exam pattern and improve time management."
      },
      {
        icon: faListCheck,
        title: "Self-Assessment",
        description: "Take regular mock tests to identify your weak areas and work on improving them."
      }
    ];
    
    return (
      <div className="exam-tips-section">
        <div className="tips-header">
          <h2>5 Steps to Excel in Your Exams</h2>
          <p>Follow these proven strategies to maximize your exam performance</p>
        </div>
        
        <div className="tips-container">
          {tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-icon">
                <FontAwesomeIcon icon={tip.icon} />
              </div>
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
              {/* <div className="tip-number">{index + 1}</div> */}
            </div>
          ))}
        </div>
        
        <div className="additional-resources">
          <h3>Additional Resources</h3>
          <p>
            Visit our <a href="/study-resources">Study Resources</a> section for worksheets, practice tests, and study guides.
          </p>
        </div>
      </div>
    );
  };
  
  // Main render function that determines which section to show
  const renderContent = () => {
    switch(section) {
      case 'exammarks':
        return renderExamMarks();
      case 'examcgpa':
        return renderCGPA();
      case 'examtips':
        return renderExamTips();
      default:
        return (
          <div className="exam-details-placeholder">
            <h2>Exam Details</h2>
            <p>Select an option from the sidebar to view exam-related information.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="exam-details-container">
      {renderContent()}
    </div>
  );
};

export default ExamDetails;