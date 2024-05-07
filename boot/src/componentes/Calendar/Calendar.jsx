import React, { useState } from 'react';
import Event from './Event';
import './Calendar.css';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const getEasterDate = (year) => {
  // Algoritmo para calcular a data da Páscoa (Método de Computus)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
};

const isCarnaval = (year, month, day) => {
  const easterDate = getEasterDate(year);
  const carnavalDate = new Date(easterDate);
  carnavalDate.setDate(easterDate.getDate() - 46);

  return (
    month === carnavalDate.getMonth() &&
    day === carnavalDate.getDate()
  );
};

const isBrazilianHoliday = (year, month, day) => {
  const holidays = {
    1: [1], // Ano Novo
    3: [29], // Sexta-Feira Santa
    4: [21], // Tiradentes
    5: [1, 30], // Dia do Trabalhador / Corpos Christi
    9: [7], // Independência do Brasil
    10: [12], // Nossa Senhora Aparecida / Dia das Crianças
    11: [2, 15, 20], // Finados / Proclamação da República / Consciência Negra
    12: [24, 25, 31], // Véspera de Natal / Natal / Último dia do Ano
  };

  return holidays[month + 1] && (holidays[month + 1].includes(day) || isCarnaval(year, month, day));
};

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
        {[...Array(daysInMonth).keys()].map((day) => {
          const isWeekend = [0, 6].includes(new Date(currentYear, currentMonth, day + 1).getDay());
          const isHolidayDay = isBrazilianHoliday(currentYear, currentMonth, day + 1) || isCarnaval(currentYear, currentMonth, day + 1);

          return (
            <div key={day} className={`day ${isWeekend ? 'weekend' : ''} ${isHolidayDay ? 'holiday' : ''}`} onClick={() => handleAddEvent(day)}>
              <span className={`day-number ${isCarnaval(currentYear, currentMonth, day + 1) ? 'carnaval' : ''}`}>{day + 1}</span>
              {events.map((event, index) => {
                if (event.date === day + 1) {
                  return <Event key={index} title={event.title} />;
                }
                return null;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
