import React, { useState } from 'react';
import { QUESTION_PAPERS_DATA } from './data';
import './QuestionPaperSection.css';

const QuestionPaperSection = () => {
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [expandedYear, setExpandedYear] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const questionPapersData = QUESTION_PAPERS_DATA;
  
  const handleYearClick = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
    setExpandedSubject(null);
  };
  
  const handleSubjectClick = (subject, e) => {
    if (e) e.stopPropagation();
    setExpandedSubject(expandedSubject === subject ? null : subject);
  };
  
  const handleDownload = (paperPath, e) => {
    if (e) e.stopPropagation();
    console.log(`Downloading: ${paperPath}`);
    
    const link = document.createElement('a');
    link.href = paperPath;
    link.download = paperPath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="question-paper-section">
      <div className="qp-semester-selector">
        <label htmlFor="qp-semester-select">Select Semester:</label>
        <select
          id="qp-semester-select"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
      </div>
      
      <div className="year-cards-container">
        {Object.keys(questionPapersData).map(year => (
          <div
            key={year}
            className={`year-card ${expandedYear === year ? 'expanded' : ''}`}
            onClick={() => handleYearClick(year)}
          >
            <div className="year-header">
              <h3>{year}</h3>
              <span className={`qp-expand-icon ${expandedYear === year ? 'expanded' : ''}`}>
                {expandedYear === year ? '−' : '+'}
              </span>
            </div>
            
            {expandedYear === year && (
              <div className="subjects-list">
                {Object.keys(questionPapersData[year]).map(subject => (
                  <div key={subject} className="qp-subject-item">
                    <div
                      className="qp-subject-header"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubjectClick(subject);
                      }}
                    >
                      <span>{subject}</span>
                      <span className={`qp-expand-icon small ${expandedSubject === subject ? 'expanded' : ''}`}>
                        {expandedSubject === subject ? '−' : '+'}
                      </span>
                    </div>
                    
                    {expandedSubject === subject && (
                      <div className="exam-types">
                        {Object.entries(questionPapersData[year][subject]).map(([examType, path]) => (
                          <div
                            key={examType}
                            className="exam-type-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(path);
                            }}
                          >
                            <span>{examType}</span>
                            <span className="qp-download-icon">↓</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPaperSection;