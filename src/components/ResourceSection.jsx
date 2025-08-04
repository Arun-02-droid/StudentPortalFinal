import React, { useState } from 'react';
import './ResourceSection.css'; // We'll create this stylesheet separately

const ResourceSection = () => {
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [selectedCardType, setSelectedCardType] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  // Sample data for resources
  const resourceData = {
    '1': {
      subjects: ['Mathematics', 'Programming Fundamentals', 'Computer Organization', 'Digital Systems'],
      videoMaterials: {
        'Mathematics': [
          { channel: 'Professor Leonard', topics: ['Calculus', 'Linear Algebra', 'Differential Equations'] },
          { channel: '3Blue1Brown', topics: ['Essence of Calculus', 'Linear Algebra Visualization'] }
        ],
        'Programming Fundamentals': [
          { channel: 'CS50', topics: ['Introduction to Programming', 'C Programming'] },
          { channel: 'CodeWithHarry', topics: ['Python Basics', 'OOP Concepts'] }
        ],
        'Computer Organization': [
          { channel: 'Neso Academy', topics: ['Computer Architecture', 'Assembly Language'] },
          { channel: 'Gate Smashers', topics: ['Processor Design', 'Memory Organization'] }
        ],
        'Digital Systems': [
          { channel: 'Neso Academy', topics: ['Boolean Algebra', 'Logic Gates', 'Combinational Circuits'] },
          { channel: 'Gate Smashers', topics: ['Sequential Circuits', 'Flip Flops'] }
        ]
      },
      notes: {
        'Mathematics': '/resources/sem1/math_notes.pdf',
        'Programming Fundamentals': '/resources/sem1/programming_notes.pdf',
        'Computer Organization': '/resources/sem1/co_notes.pdf',
        'Digital Systems': '/resources/sem1/ds_notes.pdf'
      },
      books: {
        'Mathematics': '/resources/sem1/math_textbook.pdf',
        'Programming Fundamentals': '/resources/sem1/programming_textbook.pdf',
        'Computer Organization': '/resources/sem1/co_textbook.pdf',
        'Digital Systems': '/resources/sem1/ds_textbook.pdf'
      }
    },
    '2': {
      subjects: ['Data Structures', 'Object-Oriented Programming', 'Discrete Mathematics', 'Database Systems'],
      videoMaterials: {
        'Data Structures': [
          { channel: 'CodeWithHarry', topics: ['Linked Lists', 'Trees', 'Graphs'] },
          { channel: 'Apna College', topics: ['Sorting', 'Recursion', 'Stacks & Queues'] }
        ],
        'Object-Oriented Programming': [
          { channel: 'Telusko', topics: ['Classes & Objects', 'Inheritance', 'Polymorphism'] },
          { channel: 'Programming with Mosh', topics: ['Encapsulation', 'Abstraction', 'Interfaces'] }
        ],
        'Discrete Mathematics': [
          { channel: 'TheTrevTutor', topics: ['Set Theory', 'Graph Theory', 'Number Theory'] },
          { channel: 'Neso Academy', topics: ['Propositional Logic', 'Combinatorics'] }
        ],
        'Database Systems': [
          { channel: 'Gate Smashers', topics: ['SQL Basics', 'Normalization', 'ER Diagrams'] },
          { channel: 'FreeCodeCamp', topics: ['Database Design', 'SQL Advanced'] }
        ]
      },
      notes: {
        'Data Structures': '/resources/sem2/ds_notes.pdf',
        'Object-Oriented Programming': '/resources/sem2/oop_notes.pdf',
        'Discrete Mathematics': '/resources/sem2/dm_notes.pdf',
        'Database Systems': '/resources/sem2/db_notes.pdf'
      },
      books: {
        'Data Structures': '/resources/sem2/ds_textbook.pdf',
        'Object-Oriented Programming': '/resources/sem2/oop_textbook.pdf',
        'Discrete Mathematics': '/resources/sem2/dm_textbook.pdf',
        'Database Systems': '/resources/sem2/db_textbook.pdf'
      }
    },
    // Add more semesters as needed
  };

  const handleCardClick = (cardType) => {
    // If clicking the same card type, toggle it off
    if (selectedCardType === cardType) {
      setSelectedCardType(null);
      setSelectedSubject(null);
    } else {
      setSelectedCardType(cardType);
      setSelectedSubject(null);
    }
  };

  const handleSubjectClick = (subject) => {
    if (selectedCardType === 'notes' || selectedCardType === 'books') {
      // For notes and books, directly download the file
      downloadResource(selectedCardType, subject);
    } else {
      // For video materials, show the channels
      setSelectedSubject(selectedSubject === subject ? null : subject);
    }
  };

  const downloadResource = (type, subject) => {
    const path = resourceData[selectedSemester][type === 'notes' ? 'notes' : 'books'][subject];
    console.log(`Downloading: ${path}`);
    
    // Simulate a download (in a real app, this would trigger a file download)
    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resource-section">
      {/* Semester Selection Dropdown */}
      <div className="semester-selector">
        <label htmlFor="resource-semester-select">Select Semester:</label>
        <select 
          id="resource-semester-select" 
          value={selectedSemester} 
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            setSelectedCardType(null);
            setSelectedSubject(null);
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <option key={sem} value={sem.toString()}>Semester {sem}</option>
          ))}
        </select>
      </div>

      {/* Resource Cards */}
      <div className="resource-cards">
        {/* Video Material Card */}
        <div 
          className={`resource-card ${selectedCardType === 'videoMaterials' ? 'active' : ''}`}
          onClick={() => handleCardClick('videoMaterials')}
        >
          <div className="card-icon">🎥</div>
          <h3>Video Material</h3>
          <p>Recommended YouTube channels for each subject</p>
        </div>

        {/* Notes Card */}
        <div 
          className={`resource-card ${selectedCardType === 'notes' ? 'active' : ''}`}
          onClick={() => handleCardClick('notes')}
        >
          <div className="card-icon">📄</div>
          <h3>Notes</h3>
          <p>Downloadable study materials</p>
        </div>

        {/* Books Card */}
        <div 
          className={`resource-card ${selectedCardType === 'books' ? 'active' : ''}`}
          onClick={() => handleCardClick('books')}
        >
          <div className="card-icon">📚</div>
          <h3>Books</h3>
          <p>Downloadable textbooks</p>
        </div>
      </div>

      

      {/* Subject List - Shows when a card is selected */}
      {selectedCardType && (
        <div className="subject-list-container">
          <h3>
            {selectedCardType === 'videoMaterials' 
              ? 'Select a Subject to View Recommended Channels' 
              : `Select a Subject to Download ${selectedCardType === 'notes' ? 'Notes' : 'Books'}`}
          </h3>
          <div className="subject-list">
            {resourceData[selectedSemester].subjects.map((subject) => (
              <div 
                key={subject} 
                className={`subject-item ${selectedSubject === subject ? 'active' : ''}`}
                onClick={() => handleSubjectClick(subject)}
              >
                <span>{subject}</span>
                {selectedCardType === 'videoMaterials' && (
                  <span className="expand-icon">{selectedSubject === subject ? '−' : '+'}</span>
                )}
                {selectedCardType !== 'videoMaterials' && (
                  <span className="download-icon">↓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Channels - Shows when a subject is selected in Video Materials */}
      {selectedCardType === 'videoMaterials' && selectedSubject && (
        <div className="video-channels-container">
          <h3>Recommended Channels for {selectedSubject}</h3>
          <div className="channels-list">
            {resourceData[selectedSemester].videoMaterials[selectedSubject].map((item, index) => (
              <div key={index} className="channel-item">
                <h4>{item.channel}</h4>
                <div className="topics-list">
                  <strong>Topics:</strong>
                  <ul>
                    {item.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceSection;