import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

// Configuração de localidade (opcional)
LocaleConfig.locales['pt'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const TodoListScreen = () => {

    const [selectedDate, setSelectedDate] = useState('');
    const [tasks, setTasks] = useState({});
    const [newTask, setNewTask] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
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

    const renderTask = ({ item }) => (
        <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskCategory}>{item.category}</Text>
            <Text style={styles.taskTime}>{item.time}</Text>
        </View>
    );



    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendario}
                onDayPress={handleDayPress}
                markedDates={{
                    ...Object.keys(tasks).reduce((acc, date) => {
                        acc[date] = { marked: true, dotColor: 'green' };
                        return acc;
                    }, {}),
                    [selectedDate]: { selected: true, marked: true, selectedColor: 'green' }
                }}
                theme={{
                    calendarBackground: '#191515',
                    textSectionTitleColor: 'green',
                    selectedDayBackgroundColor: 'white',
                    selectedDayTextColor: 'white',
                    todayTextColor: 'green',
                    dayTextColor: 'white', // Cor dos números
                    textDisabledColor: 'red',
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
                    placeholderTextColor="grey" // Definindo diretamente a cor do placeholder
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    placeholderTextColor="grey" // Definindo diretamente a cor do placeholder
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Categoria"
                    placeholderTextColor="grey" // Definindo diretamente a cor do placeholder
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
                <TouchableOpacity onPress={addTask} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks[selectedDate] || []}
                renderItem={renderTask}
                keyExtractor={(item, index) => `${selectedDate}-${index}`}
            />
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
        color: 'white', // Cor do texto de entrada
        placeholderTextColor: 'grey' // Cor do texto do placeholder
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
        backgroundColor: 'green', // Cor de fundo do botão
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white', // Cor do texto do botão
        fontWeight: 'bold',
    },
});

export default TodoListScreen;
