import React, { useState, useEffect } from 'react';
import './WelcomeCard.css';
import Timetable from './Timetable';
import ResourceSection from './ResourceSection';
import ExamDetails from './ExamDetails';
import DiscussionForum from './DiscussionForum';
import AlumniContact from './AlumniContact';
import EventsCarousel from './EventsCarousel';
import QuestionPaperSection from './QuestionPaperSection';
import PlacementSection from './PlacementSection';
import ContactUs from './ContactUs';
import SyllabusCalendar from './SyllabusCalendar'; // Import the new component
import { formatDate } from './utils';

const WelcomeCard = ({ section }) => {
  const [fadeIn, setFadeIn] = useState(true);
  const [date, setDate] = useState('');
  const [content, setContent] = useState({
    title: 'Welcome to Student Portal',
    description: 'Select an option from the menu to get started.',
    items: []
  });
  const [showTimetable, setShowTimetable] = useState(false);
  
  // Retrieve admin information from localStorage using the correct key "user"
  const adminInfo = JSON.parse(localStorage.getItem('user'));

  // Check if adminInfo exists and contains registerno
  if (!adminInfo || !adminInfo.registerno) {
    return <div>Error: Register number is missing. Please login again.</div>;
  }

  useEffect(() => {
    // Get current date in "DD Month" format
    setDate(formatDate());

    // Clear fade effect for now to debug visibility issues
    setFadeIn(true);
    updateContent();
  }, [section]);

  useEffect(() => {
    // Show timetable for dashboard section
    setShowTimetable(section === 'dashboard');
  }, [section]);

  const updateContent = () => {
    switch (section) {
      case 'dashboard':
        setContent({
          title: 'Dashboard',
          description: 'Welcome back!',
          items: []
        });
        break;
      case 'questionpaper':
        setContent({
          title: 'Question Papers',
          description: 'Access previous years\' question papers organized by semester.',
          items: []
        });
        break;
      case 'resources':
        setContent({
          title: 'Academic Resources',
          description: 'Find study materials, reference books, and online resources here.',
          items: []
        });
        break;
      case 'placement':
        setContent({
          title: 'Placement Cell',
          description: 'Access resources and opportunities for career placement and preparation.',
          items: []
        });
        break;
        
      // Add other cases as needed...
      
      default:
        setContent({
          title: 'Welcome to Student Portal',
          description: 'Select an option from the menu to get started.',
          items: []
        });
    }
  };

  // Check if the current section is exam-related
  const isExamSection = section === 'exammarks' || section === 'examcgpa' || section === 'examtips';

  return (
    <div className="welcome-container">
      <div className="top-bar">
        <div className="date-display">{date}</div>
        <div className="profile-container">
          {/* <div className="profile-pic">
            <img src={adminInfo.profilePicUrl || "/images/default-profile.png"} alt="Profile" />
          </div> */}
          {/* <div className="student-name">{adminInfo.name || "Admin"}</div> */}
          <div className="student-register-number">
            {adminInfo.registerno} {/* Display Register No */}
          </div>
        </div>
      </div>
      
      <div className="welcome-card">
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        {content.items.length > 0 && (
          <ul>
            {content.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Syllabus and Calendar Section */}
      {section === 'syllabus' && (
        <div className="section-container">
          <SyllabusCalendar />
        </div>
      )}
      
      {/* Contact Section */}
      {section === 'contact' && (
        <div className="contact-section-wrapper">
          <ContactUs />
        </div>
      )}
      
      {/* Direct check for placement section */}
      {section === 'placement' && (
        <div className="section-container">
          <PlacementSection />
        </div>
      )}
      
      {section === 'questionpaper' && <QuestionPaperSection />}
      {section === 'resources' && <ResourceSection />}
      {section === 'alumni' && <AlumniContact />}
      {section === 'forum' && <DiscussionForum studentName={adminInfo.name} profilePicUrl={adminInfo.profilePicUrl} />}
      
      {/* Exam Details Section */}
      {isExamSection && <ExamDetails section={section} />}
      
      {/* Upcoming Events Section - Show on dashboard */}
      {section === 'dashboard' && <EventsCarousel />}
      
      {/* Timetable Section - Show on dashboard */}
      {showTimetable && <Timetable />}
    </div>
  );
};

export default WelcomeCard;
