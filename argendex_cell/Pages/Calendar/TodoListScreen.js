import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import useHeaderOptions from '../../components/Header.js'; // Importando o hook do header
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
    const [searchTerm, setSearchTerm] = useState('');

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
        }
    };

    const addTask = () => {
        if (newTask.trim() !== '') {
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
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => deleteTask() }
            ],
            { cancelable: false }
        );
    };

    const filterTasks = (tasks) => {
        if (searchTerm.trim() === '') {
            return tasks;
        }
        return tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.category.toLowerCase().includes(searchTerm.toLowerCase())
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

    const renderCustomDay = ({ date, state }) => {
        const dayOfWeek = new Date(date.year, date.month - 1, date.day).getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isSelected = date.dateString === selectedDate;
        const hasTasks = tasks[date.dateString];
        const isToday = date.dateString === new Date().toISOString().split('T')[0];

        return (
            <TouchableOpacity onPress={() => handleDayPress(date)}>
                <View style={{
                    backgroundColor: isSelected ? (isToday ? 'green' : isWeekend ? 'red' : 'green') : 'transparent',
                    borderRadius: 15,
                    padding: 5
                }}>
                    <Text style={{
                        color: isToday ? (isSelected ? 'black' : 'green') : state === 'disabled' ? 'grey' : isSelected ? (isWeekend ? 'black' : 'white') : isWeekend ? 'red' : 'white',
                        textAlign: 'center'
                    }}>
                        {date.day}
                    </Text>
                    {hasTasks && !isSelected && <View style={styles.taskDot} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
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
                    selectedDayTextColor: 'white',
                    todayTextColor: 'green',
                    dayTextColor: 'white',
                    textDisabledColor: 'grey',
                    dotColor: 'green',
                    selectedDotColor: 'white',
                    arrowColor: 'green',
                    monthTextColor: 'white',
                    textDayFontSize: 17,
                    textMonthFontSize: 25,
                    textDayHeaderFontSize: 15
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Pesquisar"
                placeholderTextColor="grey"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            {/* Restante do código */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191515',
    },
    calendario: {
        backgroundColor: '#191515',
    },
    // Restante dos estilos
});

export default TodoListScreen;
