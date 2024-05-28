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
                    <TouchableOpacity onPress={editTask} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Editar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={addTask} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Tarefas para {selectedDate}</Text>
                        <FlatList
                            data={tasksForSelectedDate}
                            renderItem={renderTask}
                            keyExtractor={(item, index) => `${selectedDate}-${index}`}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={editModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <EditTaskScreen
                    task={editedTask}
                    onSave={(editedTask) => editTask(editedTask)}
                    onCancel={() => setEditModalVisible(false)}
                />
            </Modal>
            <TouchableOpacity onPress={() => navigation.navigate('Addtarefa')} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Adicionar</Text>
                    </TouchableOpacity>
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
    taskInputContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    input: {
        borderColor: 'green',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        color: 'white',
    },
    timePickerText: {
        paddingVertical: 10,
        color: 'green',
    },
    taskContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    taskDescription: {
        fontSize: 14,
        color: 'grey',
    },
    taskCategory: {
        fontSize: 14,
        color: 'green',
    },
    taskTime: {
        fontSize: 14,
        color: 'red',
    },
    addButton: {
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    taskDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: 'green',
        alignSelf: 'center',
        marginTop: 2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: '#191515',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    taskActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    taskActionText: {
        color: 'green',
        fontWeight: 'bold',
    },
});

export default TodoListScreen;

