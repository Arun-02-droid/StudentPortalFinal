import React from 'react';
import StudentPortal from './StudentPortal';

import './DashBoard.css';

function DashBoard() {
  // Student information that will be passed to StudentPortal
  const studentInfo = {
    name: "",
    registerno:"",
    role:"",
    email:""
  };

//   localStorage.setItem('user', JSON.stringify({
//     role: "admin",
//     registerno: "12345",
//     name: "John Doe",
//     profilePicUrl: "/images/default-profile.png"
// }));

  return (
    <div className="app">
      <StudentPortal studentInfo={studentInfo} />
    </div>
    
  );
  
}

export default DashBoard;