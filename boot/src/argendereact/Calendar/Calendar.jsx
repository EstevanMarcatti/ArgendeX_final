import React, { useState } from 'react';
import Event from './Event';
import './Calendar.css';


const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleAddEvent = (day) => {
    const title = prompt('Digite evento:');
    if (title) {
      setEvents([...events, { date: day + 1, title }]);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 id='meses'>{months[currentMonth]} {currentYear}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week">
            {day}
          </div>
        ))}
        {[...Array(firstDayOfMonth).fill(null)].map((_, index) => (
          <div key={`empty-${index}`} className="empty-day"></div>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <div key={day} className="day" onClick={() => handleAddEvent(day)}>
            <span className="day-number">{day + 1}</span>
            {events.map((event, index) => {
              if (event.date === day + 1) {
                return <Event key={index} title={event.title} />;
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );



};

export default Calendar;
