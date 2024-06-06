import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import useHeaderOptions from '../../components/HeaderCalender.js';
import EditTaskScreen from './EditTaskScreen';

// Configuração de localidade (opcional)
LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const TodoListScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [savedTaskSuccess, setSavedTaskSuccess] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (tasks[day.dateString]) {
      const sortedTasks = [...tasks[day.dateString]].sort((a, b) => {
        const [aHours, aMinutes] = a.time.split(':').map(Number);
        const [bHours, bMinutes] = b.time.split(':').map(Number);
        return aHours - bHours || aMinutes - bMinutes;
      });
      setTasksForSelectedDate(sortedTasks);
      setModalVisible(true);
    } else {
      setNewTaskModalVisible(true);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '' && description.trim() !== '' && category.trim() !== '') {
      const newTasks = { ...tasks };
      if (!newTasks[selectedDate]) {
        newTasks[selectedDate] = [];
      }
      newTasks[selectedDate].push({
        title: newTask,
        description,
        category,
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setTasks(newTasks);
      setNewTask('');
      setDescription('');
      setCategory('');
      setTime(new Date());
      setNewTaskModalVisible(false);
      setSelectedDate('');
      setSavedTaskSuccess(true); // Mostra a mensagem de sucesso
      setTimeout(() => setSavedTaskSuccess(false), 3000); // Esconde a mensagem após 3 segundos
    } else {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
    }
  };

  const editTask = (editedTask) => {
    const updatedTasks = { ...tasks };
    updatedTasks[selectedDate][selectedTaskIndex] = editedTask;
    setTasks(updatedTasks);
    setSelectedTaskIndex(null);
    setEditModalVisible(false);
  };

  const deleteTask = () => {
    const updatedTasks = { ...tasks };
    updatedTasks[selectedDate].splice(selectedTaskIndex, 1);
    if (updatedTasks[selectedDate].length === 0) {
      delete updatedTasks[selectedDate]; // Remove a entrada do objeto se não houver mais tarefas para o dia selecionado
    }
    setTasks(updatedTasks);
    setSelectedTaskIndex(null);
  };

  const handleEditTask = (index) => {
    setEditedTask(tasksForSelectedDate[index]);
    setSelectedTaskIndex(index);
    setEditModalVisible(true);
  };

  const handleDeleteTask = (index) => {
    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => deleteTask()
        }
      ],
      { cancelable: false }
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      Alert.alert('Erro', 'A barra de pesquisa não pode estar vazia.');
      return;
    }
    const results = [];
    Object.keys(tasks).forEach((date) => {
      tasks[date].forEach((task) => {
        if (task.title.includes(searchQuery) || task.description.includes(searchQuery) || task.category.includes(searchQuery)) {
          results.push({ ...task, date });
        }
      });
    });
    setSearchResults(results);
    setSearchModalVisible(true);
  };

  useHeaderOptions();

  const renderCustomDay = ({ date, state }) => {
    const dayOfWeek = new Date(date.year, date.month - 1, date.day).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isSelected = date.dateString === selectedDate;
    const hasTasks = tasks[date.dateString];
    const isToday = date.dateString === new Date().toISOString().split('T')[0];
    return (
      <TouchableOpacity onPress={() => handleDayPress(date)}>
        <View
          style={{
            backgroundColor: isSelected ? (isToday ? 'green' : isWeekend ? 'red' : 'green') : 'transparent',
            borderRadius: 15,
            padding: 5
          }}
        >
          <Text
            style={{
              color: isToday ? (isSelected ? 'black' : 'green') : state === 'disabled' ? 'grey' : isSelected ? (isWeekend ? 'black' : 'white') : isWeekend ? 'red' : 'white',
              textAlign: 'center'
            }}
          >
            {date.day}
          </Text>
          {hasTasks && !isSelected && <View style={styles.taskDot} />}
        </View>
      </TouchableOpacity>
    );
  };

  const renderTask = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <Text style={styles.taskCategory}>{item.category}</Text>
      <Text style={styles.taskTime}>{item.time}</Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.taskActionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.taskActionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchResult = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
      <Text style={styles.taskCategory}>{item.category}</Text>
      <Text style={styles.taskTime}>{item.time}</Text>
      <Text style={styles.taskDate}>Data: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar tarefas..."
        placeholderTextColor="grey"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <Calendar
        style={styles.calendario}
        dayComponent={(props) => renderCustomDay(props)}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'green' },
          [new Date().toISOString().split('T')[0]]: { selected: false, marked: false },
          ...Object.keys(tasks).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: 'green' };
            return acc;
          }, {})
        }}
        theme={{
          calendarBackground: '#191515',
          textSectionTitleColor: 'green',
          selectedDayBackgroundColor: 'green',
          selectedDayTextColor: 'black',
          todayTextColor: 'green',
          dayTextColor: 'white',
          textDisabledColor: 'grey',
          arrowColor: 'green',
          monthTextColor: 'white',
          indicatorColor: 'green',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 25,
          textDayHeaderFontSize: 16
        }}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Tarefas para {selectedDate}</Text>
            <FlatList data={tasksForSelectedDate} renderItem={renderTask} keyExtractor={(item, index) => index.toString()} />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={newTaskModalVisible} animationType="slide" transparent={true} onRequestClose={() => setNewTaskModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionar Tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Título da Tarefa"
              placeholderTextColor="grey"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              placeholderTextColor="grey"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Categoria"
              placeholderTextColor="grey"
              value={category}
              onChangeText={setCategory}
            />
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text style={styles.timeButtonText}>Selecionar Hora: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setTime(selectedTime);
                }}
              />
            )}
            <TouchableOpacity onPress={addTask}>
              <Text style={styles.addButton}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNewTaskModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={editModalVisible} animationType="slide" transparent={true} onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalBackground}>
          <EditTaskScreen task={editedTask} onSave={(updatedTask) => editTask(updatedTask)} onCancel={() => setEditModalVisible(false)} />
        </View>
      </Modal>
      <Modal visible={searchModalVisible} animationType="slide" transparent={true} onRequestClose={() => setSearchModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Resultados da Pesquisa</Text>
            {searchResults.length > 0 ? (
              <FlatList data={searchResults} renderItem={renderSearchResult} keyExtractor={(item, index) => index.toString()} />
            ) : (
              <Text style={styles.noResultsText}>Nenhuma tarefa encontrada.</Text>
            )}
            <TouchableOpacity onPress={() => setSearchModalVisible(false)}>
              <Text style={styles.modalCloseButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {savedTaskSuccess && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>Tarefa adicionada com sucesso!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191515',
    alignItems: 'center', // Align center horizontally
  },
  searchInput: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: '80%'
  },
  calendario: {
    height: 'auto',
    width: 450
  },
  taskDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'green',
    alignSelf: 'center'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#191515',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjusted width
    maxHeight: '80%', // Maximum height
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white'
  },
  modalCloseButton: {
    color: 'green',
    marginTop: 10,
    fontSize: 16
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%' // Adjusted width
  },
  taskTitle: {
    fontSize: 18,
    color: 'white'
  },
  taskDescription: {
    fontSize: 14,
    color: 'grey'
  },
  taskCategory: {
    fontSize: 14,
    color: 'grey'
  },
  taskTime: {
    fontSize: 14,
    color: 'grey'
  },
  taskDate: {
    fontSize: 14,
    color: 'grey'
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  taskActionText: {
    color: 'green'
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%'
  },
  timeButtonText: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10
  },
  addButton: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10
  },
  cancelButton: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10
  },
  noResultsText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },
  successMessage: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5
  },
  successMessageText: {
    color: 'white'
  }
});

export default TodoListScreen;
