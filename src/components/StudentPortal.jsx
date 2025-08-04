import React, { useState } from 'react';
import Sidebar from './Sidebar';
import WelcomeCard from './WelcomeCard';

const StudentPortal = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div style={{ marginLeft: '280px', padding: '30px', width: 'calc(100% - 280px)' }}>
        <WelcomeCard section={activeSection} />
      </div>
    </div>
  );
};

export default StudentPortal;