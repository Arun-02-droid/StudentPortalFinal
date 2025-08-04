import React, { useState, useEffect } from 'react';
import { EVENTS_DATA } from './data';
import './EventsCarousel.css';

const EventsCarousel = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const events = EVENTS_DATA;

  // Auto rotate events every 5 seconds
  useEffect(() => {
    const autoRotate = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);
    
    return () => clearInterval(autoRotate);
  }, [events.length]);

  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="events-section">
      <h2>Upcoming Events</h2>
      <div className="events-carousel">
        <button className="carousel-btn prev-btn" onClick={prevEvent}>&lt;</button>
        
        <div className="event-card">
          <div className="event-image">
            <img src={events[currentEventIndex].image || "/images/event-default.png"} alt={events[currentEventIndex].title} />
          </div>
          <div className="event-content">
            <h3>{events[currentEventIndex].title}</h3>
            <p className="event-date">{events[currentEventIndex].date}</p>
            <p>{events[currentEventIndex].description}</p>
            <button className="event-action-btn">{events[currentEventIndex].buttonText}</button>
          </div>
        </div>
        
        <button className="carousel-btn next-btn" onClick={nextEvent}>&gt;</button>
      </div>
      <div className="carousel-indicators">
        {events.map((_, index) => ( 
          <span 
            key={index} 
            className={`indicator ${index === currentEventIndex ? 'active' : ''}`}
            onClick={() => setCurrentEventIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default EventsCarousel;