import React from 'react';
import './AlumniContact.css';

const AlumniContact = () => {
  // Sample alumni data
  const alumni = [
    {
      name: "Sarthak Vashistha",
      position: "Team Lead",
      company: "Google",
      image: "/images/alumni/sarthak.jpg",
      linkedin: "https://linkedin.com/in/sarthak-vashistha",
      github: "https://github.com/sarthak-vashistha",
      email: "sarthak@example.com"
    },
    {
      name: "Khyati Valera",
      position: "Team Member",
      company: "Microsoft",
      image: "/images/alumni/khyati.jpg",
      linkedin: "https://linkedin.com/in/khyati-valera",
      github: "https://github.com/khyati-valera",
      email: "khyati@example.com"
    },
    {
      name: "Pulkit Yadav",
      position: "Team Member",
      company: "Amazon",
      image: "/images/alumni/pulkit.jpg",
      linkedin: "https://linkedin.com/in/pulkit-yadav",
      github: "https://github.com/pulkit-yadav",
      email: "pulkit@example.com"
    },
    {
      name: "Jijo Abraham",
      position: "Team Member",
      company: "Apple",
      image: "/images/alumni/jijo.jpg",
      linkedin: "https://linkedin.com/in/jijo-abraham",
      github: "https://github.com/jijo-abraham",
      email: "jijo@example.com"
    }
  ];

  return (
    <div className="alumni-contact-container">
      <div className="alumni-header">
        <h2>Alumni Network</h2>
        <p>Connect with our successful graduates and expand your professional network</p>
      </div>
      
      <div className="alumni-cards-container">
        {/* College Card */}
        <div className="alumni-card college-card">
          <div className="college-logo">
            <img src="/images/alumni/Anna.jpg" alt="College Logo" />
          </div>
          <h3>Official College Portal</h3>
          <p>Access resources, events, and connect with faculty</p>
          <a href="https://www.collegename.edu" target="_blank" rel="noopener noreferrer" className="college-link">
            Visit College Website
          </a>
        </div>
        
        {/* Alumni Cards */}
        {alumni.map((alumnus, index) => (
          <div key={index} className="alumni-card">
            <div className="alumni-image">
              <img src={alumnus.image} alt={alumnus.name} />
            </div>
            <div className="alumni-details">
              <h3>{alumnus.name}</h3>
              <p className="alumni-position">{alumnus.position}</p>
              <p className="alumni-company">{alumnus.company}</p>
            </div>
            <div className="alumni-social">
              <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                <span className="icon">in</span>
              </a>
              <a href={alumnus.github} target="_blank" rel="noopener noreferrer" className="social-icon github">
                <span className="icon">gm</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlumniContact;