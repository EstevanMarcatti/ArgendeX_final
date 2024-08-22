import React, { useState, useEffect } from 'react';
import './Calendar.css'; // Certifique-se de que o CSS está correto

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCategory, setEventCategory] = useState('');

  const userId = localStorage.getItem('ID'); // Obtenha o ID do usuário do localStorage

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleAddEvent = (day) => {
    setSelectedDate(day + 1);
    setCurrentEvent(null); // Reset current event
    setEventTitle('');
    setEventTime('');
    setEventDescription('');
    setEventCategory('');
    setEventModalVisible(true);
  };

  const handleSaveEvent = async () => {
    if (eventTitle && eventTime && eventDescription && eventCategory && userId) {
      // Criar um objeto Date com o dia selecionado, mês e ano
      const eventDate = new Date(currentYear, currentMonth, selectedDate);
      const formattedDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;

      const newEvent = {
        id: currentEvent ? currentEvent.id : null,
        date: formattedDate, // Enviar a data formatada para o backend
        title: eventTitle,
        time: eventTime,
        description: eventDescription,
        category: eventCategory,
        user_id: userId // Use o ID do usuário
      };

      try {
        if (currentEvent) {
          // Atualizar tarefa existente
          const response = await fetch('http://localhost:8085/tasks', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
          });

          if (!response.ok) {
            throw new Error(`Erro ao atualizar tarefa: ${response.statusText}`);
          }

          // Atualizar a lista de eventos local
          setEvents(events.map(event =>
            event.id === currentEvent.id ? newEvent : event
          ));
        } else {
          // Adicionar nova tarefa
          const response = await fetch('http://localhost:8085/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent)
          });

          if (!response.ok) {
            throw new Error(`Erro ao adicionar tarefa: ${response.statusText}`);
          }

          // Atualizar a lista de eventos local
          setEvents([...events, newEvent]);
        }

        // Resetar formulário e fechar modais
        setEventTitle('');
        setEventTime('');
        setEventDescription('');
        setEventCategory('');
        setCurrentEvent(null);
        setEventModalVisible(false);
        setModalVisible(false);
      } catch (error) {
        console.error('Erro ao salvar evento:', error.message);
      }
    } else {
      console.error('Dados inválidos ou usuário não autenticado.');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch('http://localhost:8085/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir tarefa: ${response.statusText}`);
      }

      // Atualizar a lista de eventos local
      setEvents(events.filter(event => event.id !== id));
      setCurrentEvent(null);
      setEventModalVisible(false);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error.message);
    }
  };

  const handleShowTasks = (day) => {
    setSelectedDate(day + 1);
    setCurrentEvent(null);
    setModalVisible(true);
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

  const tasksForSelectedDate = events.filter(event => {
    const eventDate = new Date(event.date);
    const selectedDateObj = new Date(currentYear, currentMonth, selectedDate);
    return eventDate.toDateString() === selectedDateObj.toDateString();
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8085/tasks');
        
        // Verifica o status da resposta
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro na resposta da API:', errorText);
          throw new Error(`Erro na resposta da API: ${response.statusText}`);
        }

        // Tenta converter a resposta para JSON
        const data = await response.json();
        setEvents(data.filter(event => event.user_id === userId));
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error.message);
      }
    };

    fetchEvents();
  }, [userId]);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h1 id="meses">{months[currentMonth]} {currentYear}</h1>
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
          const hasEvents = events.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day + 1 && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
          });

          return (
            <div
              key={day}
              className={`day ${isWeekend ? 'weekend' : ''}`}
              onClick={() => handleShowTasks(day)}
            >
              <span className="day-number">
                {day + 1}
              </span>
              {hasEvents && <div className="event-dot"></div>}
            </div>
          );
        })}
      </div>

      {modalVisible && (
        <div className="modal-calendar">
          <div className="modal-calendar-content">
            {tasksForSelectedDate.length > 0 ? (
              <div>
                <h2>Tarefas do Dia {selectedDate}</h2>
                <div className="task-list">
                  {tasksForSelectedDate.map(task => (
                    <div key={task.id} className="task-list-item">
                      <div><strong>{task.title}</strong></div>
                      <div>{task.time}</div>
                      <div>{task.description}</div>
                      <div>Categoria: {task.category}</div>
                      <div className="modal-calendar-buttons">
                        <button onClick={() => {
                          setCurrentEvent(task);
                          setEventTitle(task.title);
                          setEventTime(task.time);
                          setEventDescription(task.description);
                          setEventCategory(task.category);
                          setEventModalVisible(true);
                        }}>Editar</button>
                        <button onClick={() => handleDeleteEvent(task.id)}>Excluir</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="add-task-button" onClick={() => handleAddEvent(selectedDate - 1)}>Adicionar Tarefa</button>
              </div>
            ) : (
              <div className="no-tasks-message">
                Não há tarefas para este dia.
                <button className="add-task-button" onClick={() => handleAddEvent(selectedDate - 1)}>Adicionar Tarefa</button>
              </div>
            )}
            <button className="cancel" onClick={() => setModalVisible(false)}>Fechar</button>
          </div>
        </div>
      )}

      {eventModalVisible && (
        <div className="modal-calendar">
          <div className="modal-calendar-content">
            <h2>{currentEvent ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Título"
            />
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Descrição"
            />
            <input
              type="text"
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              placeholder="Categoria"
            />
            <div className="modal-calendar-buttons">
              <button onClick={handleSaveEvent}>Salvar</button>
              <button onClick={() => setEventModalVisible(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
