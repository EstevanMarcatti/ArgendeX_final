// Calendar.jsx
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tasks, setTasks] = useState([]); // Estado para armazenar tarefas
  const [editModalVisible, setEditModalVisible] = useState(false); // Estado para controlar o modal de edição
  const [editedTask, setEditedTask] = useState(null); // Estado para armazenar a tarefa que está sendo editada
  

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
      const eventDate = new Date(currentYear, currentMonth, selectedDate);
      const formattedDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;

      const newEvent = {
        id: currentEvent ? currentEvent.id : null,
        date: formattedDate,
        title: eventTitle,
        time: eventTime,
        description: eventDescription,
        category: eventCategory,
        user_id: userId // Certifique-se de que esta linha esteja presente
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
          setEvents(prevEvents => [...prevEvents, newEvent]);
        }

        setEventTitle('');
        setEventTime('');
        setEventDescription('');
        setEventCategory('');
        setCurrentEvent(null);
        setEventModalVisible(false);
        setModalVisible(false);

        // Mostrar a mensagem de confirmação
        setShowConfirmation(true);

        // Esperar um tempo antes de atualizar a página
        setTimeout(() => {
          setShowConfirmation(false); // Ocultar a mensagem
          window.location.reload(); // Recarregar a página
        }, 2000); // 2 segundos

      } catch (error) {
        console.error('Erro ao salvar evento:', error.message);
      }
    } else {
      console.error('Dados inválidos ou usuário não autenticado.');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await fetch(`http://localhost:8085/tasks`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }) // Passando o ID corretamente
      });
      // Atualizar a lista de eventos local
      setEvents(events.filter(event => event.id !== id));
      setCurrentEvent(null);
      setEventModalVisible(false);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks); // Atualiza o estado com as tarefas modificadas
    setEditModalVisible(false); // Fecha o modal
  };

  const handleShowTasks = (day) => {
    setSelectedDate(day + 1);
    setCurrentEvent(null);
    setModalVisible(true);
  };

  const handleEditTask = (task) => {
    // Configura a tarefa a ser editada e abre o modal de edição
    setCurrentEvent(task);
    setEventTitle(task.title);
    setEventTime(task.time);
    setEventDescription(task.description);
    setEventCategory(task.category);
    setEventModalVisible(true);
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

  const tasksForSelectedDate = events.filter(event => event.date === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`);

  useEffect(() => {
    const fetchEvents = async () => {
      const userId = localStorage.getItem('ID'); // Obtém o ID do usuário logado
      if (!userId) {
        console.error('Usuário não autenticado.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8085/tasks?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchEvents();
  }, [currentMonth, currentYear]);

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
          const hasEvents = events.some(event => event.date === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day + 1).padStart(2, '0')}`);

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
                      <div className="modal-calendar-buttons">
                        <button onClick={() => handleEditTask(task)}>Editar</button>
                        <button id='exclu' onClick={() => handleDeleteEvent(task.id)}>Excluir</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="add-task-button" id='Adddtarefa' onClick={() => handleAddEvent(selectedDate - 1)}>Adicionar Tarefa</button>
              </div>
            ) : (
              <div className="no-tasks-message">
                Não há tarefas para este dia.
                <button className="add-task-button" id='Adddtarefa' onClick={() => handleAddEvent(selectedDate - 1)}>Adicionar Tarefa</button>
              </div>
            )}
            <button className="cancel" id='bttfechar' onClick={() => setModalVisible(false)}>Fechar</button>
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
            <textarea
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              placeholder="Categoria"
            />
            <div className="modal-calendar-buttons">
              <button onClick={handleSaveEvent}>
                {currentEvent ? 'Salvar' : 'Adicionar'}
              </button>
              {currentEvent && (
                <button
                  className="cancel"
                  onClick={() => handleDeleteEvent(currentEvent.id)}
                >
                  Excluir
                </button>
              )}
              <button
                className="cancel"
                onClick={() => setEventModalVisible(false)}
              >
                Fechar
              </button>
            </div>
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
            <textarea
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              placeholder="Categoria"
            />
            <div className="modal-calendar-buttons">
              <button onClick={handleSaveEvent}>
                {currentEvent ? 'Salvar' : 'Adicionar'}
              </button>
              {currentEvent && (
                <button
                  className="cancel"
                  onClick={() => handleDeleteEvent(currentEvent.id)}
                >
                  Excluir
                </button>
              )}
              <button
                className="cancel"
                onClick={() => {
                  setEventModalVisible(false);
                  setCurrentEvent(null); // Reseta a tarefa atual ao fechar
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-container">
          <p className="confirmation-text">Tarefa adicionada com sucesso!</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
