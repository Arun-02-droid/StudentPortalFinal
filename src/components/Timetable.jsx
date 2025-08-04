import React, { useState, useEffect } from 'react';
import './Timetable.css';

const Timetable = () => {
  const initialTimeSlots = [
    '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00',
    '12:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);
  const [timetableData, setTimetableData] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [editingTime, setEditingTime] = useState(null);
  const [cellContent, setCellContent] = useState('');
  const [timeContent, setTimeContent] = useState('');
  const [fadeIn, setFadeIn] = useState(true);

  // Check if the user is admin
  const userRole = localStorage.getItem('role');
  const isAdmin = userRole === 'admin'; // Checks if the role is admin
  console.log(userRole)

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch('http://localhost:3001/timetable');
        const data = await response.json();
        setTimetableData(data);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimetable();
    setFadeIn(true);
  }, []);

  const handleCellClick = (day, time) => {
    if (!isAdmin) return; // Prevent students from editing
    setEditingCell({ day, time });
    setCellContent(timetableData?.[day]?.[time] || '');
  };

  const handleTimeClick = (index) => {
    if (!isAdmin) return; // Prevent students from editing times
    setEditingTime(index);
    setTimeContent(timeSlots[index]);
  };

  const handleSaveCell = async () => {
    if (editingCell) {
      const { day, time } = editingCell;
      const newData = { ...timetableData };

      if (!newData[day]) newData[day] = {};
      newData[day][time] = cellContent;

      setTimetableData(newData);
      setEditingCell(null);

      try {
        await fetch('http://localhost:3001/timetable', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ day, time, content: cellContent })
        });
      } catch (error) {
        console.error('Error saving timetable:', error);
      }
    }
  };

  const handleSaveTime = async () => {
    if (editingTime !== null) {
      const newTimeSlots = [...timeSlots];
      const oldTime = timeSlots[editingTime];
      newTimeSlots[editingTime] = timeContent;

      const newData = { ...timetableData };
      days.forEach(day => {
        if (!newData[day]) newData[day] = {};
        newData[day][timeContent] = newData[day][oldTime] || '';
        if (oldTime !== timeContent) delete newData[day][oldTime];
      });

      setTimeSlots(newTimeSlots);
      setTimetableData(newData);
      setEditingTime(null);

      try {
        await fetch('http://localhost:5173/api/timetable', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ oldTime, newTime: timeContent })
        });
      } catch (error) {
        console.error('Error updating time slot:', error);
      }
    }
  };

  const handleDeleteCell = async () => {
    if (editingCell) {
      const { day, time } = editingCell;
      const newData = { ...timetableData };
      if (newData[day]) newData[day][time] = '';
      setTimetableData(newData);
      setEditingCell(null);

      try {
        await fetch('/api/timetable', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ day, time })
        });
      } catch (error) {
        console.error('Error deleting cell content:', error);
      }
    }
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      type === 'cell' ? handleSaveCell() : handleSaveTime();
    } else if (e.key === 'Escape') {
      type === 'cell' ? setEditingCell(null) : setEditingTime(null);
    }
  };

  return (
    <div className={`timetable-container ${fadeIn ? 'fade-in' : 'fade-out'}`}>
      <h1>Class Timetable</h1>
      <div className="timetable">
        <div className="timetable-grid">
          <div className="timetable-header-cell empty-cell"></div>
          {timeSlots.map((time, index) => (
            <div
              key={`time-${index}`}
              className="timetable-header-cell time-cell"
              onClick={() => handleTimeClick(index)}
            >
              {editingTime === index && isAdmin ? (
                <input
                  type="text"
                  value={timeContent}
                  onChange={(e) => setTimeContent(e.target.value)}
                  onBlur={handleSaveTime}
                  onKeyDown={(e) => handleKeyPress(e, 'time')}
                  autoFocus
                />
              ) : (
                time
              )}
            </div>
          ))}

          {days.map(day => (
            <React.Fragment key={day}>
              <div className="timetable-header-cell day-cell">{day}</div>
              {timeSlots.map(time => (
                <div
                  key={`${day}-${time}`}
                  className={`timetable-cell ${timetableData?.[day]?.[time] ? 'has-content' : ''}`}
                  onClick={() => handleCellClick(day, time)}
                >
                  {editingCell && editingCell.day === day && editingCell.time === time && isAdmin ? (
                    <div className="cell-edit-container">
                      <input
                        type="text"
                        value={cellContent}
                        onChange={(e) => setCellContent(e.target.value)}
                        onBlur={handleSaveCell}
                        onKeyDown={(e) => handleKeyPress(e, 'cell')}
                        autoFocus
                      />
                      <div className="cell-actions">
                        <button onClick={handleSaveCell} className="save-btn">Save</button>
                        <button onClick={handleDeleteCell} className="delete-btn">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <div className="cell-content">{timetableData?.[day]?.[time]}</div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="timetable-help">
        {isAdmin ? (
          <>
            <p>Click on any cell to add or edit class information</p>
            <p>Click on time slots to modify the schedule times</p>
          </>
        ) : (
          <p>Students can only view the timetable.</p>
        )}
      </div>
    </div>
  );
};

export default Timetable;
