import React, { useState } from "react";
import { TextInput, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, Image, View, Alert } from "react-native";
import styles from "./Style_Add.js";
import useHeaderOptions from '../../components/Header.js'; // Importando o hook do header
import { DateTimePicker } from "@react-native-community/datetimepicker";
import axios from 'axios'; // Importação do Axios para fazer requisições HTTP

const Addtarefa = ({ navigation }) => {
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

    const userID = 1; // Substitua pelo ID do usuário autenticado

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

    const addTask = async () => {
        if (newTask.trim() !== '') {
            const newTaskObject = {
                title: newTask,
                description,
                category,
                time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            const newTasks = { ...tasks };
            if (!newTasks[selectedDate]) {
                newTasks[selectedDate] = [];
            }
            newTasks[selectedDate].push(newTaskObject);
            setTasks(newTasks);
            setNewTask('');
            setDescription('');
            setCategory('');
            setTime(new Date());

            // Enviar a tarefa para o backend
            try {
                await axios.post('http://10.135.60.8:8085/adicionar_tarefa', {
                    data: selectedDate,
                    hora: newTaskObject.time,
                    titulo: newTaskObject.title,
                    id_usuario: userID
                });
                Alert.alert('Sucesso', 'Tarefa adicionada com sucesso!');
            } catch (error) {
                console.error('Erro ao adicionar tarefa:', error);
                Alert.alert('Erro', 'Não foi possível adicionar a tarefa.');
            }
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

    useHeaderOptions();

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

    return (
        <View style={styles.taskInputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Nova Tarefa"
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
                <Text style={styles.timePickerText}>Escolher Horário: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) {
                            setTime(selectedTime);
                        }
                    }}
                />
            )}
            {selectedTaskIndex !== null ? (
                <TouchableOpacity onPress={() => editTask(editedTask)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Editar</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={addTask} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Addtarefa;
