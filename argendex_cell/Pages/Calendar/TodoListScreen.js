import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal, Alert, Animated } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EditTaskScreen from './EditTaskScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Importação correta do ícone
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const navigation = useNavigation();
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
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [slideAnim] = useState(new Animated.Value(-300)); // Inicialize fora da tela
    const [menuVisible, setMenuVisible] = useState(false);
    const [events, setEvents] = useState([]);
    


    // Novo estado para a pesquisa
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchModalVisible, setSearchModalVisible] = useState(false);


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

    React.useEffect(() => {
        const fetchTasks = async () => {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await fetch(`http://10.135.60.62:8085/tasks?user_id=${userId}`);
                    const data = await response.json();
                    const formattedTasks = {};
                    data.forEach(task => {
                        const taskDate = task.date;
                        if (!formattedTasks[taskDate]) {
                            formattedTasks[taskDate] = [];
                        }
                        formattedTasks[taskDate].push(task);
                    });
                    setTasks(formattedTasks);
                } catch (error) {
                    console.error('Erro ao carregar tarefas:', error);
                }
            }
        };
        fetchTasks();
    }, []);
    

      const addTask = async () => {
        const userId = await AsyncStorage.getItem('userId'); // Esta linha deve funcionar agora
        if (newTask && description && category && time && selectedDate && userId) { // Verifique se userId não é null
            const newTaskData = {
                title: newTask,
                description: description,
                category: category,
                date: selectedDate,
                time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                user_id: userId // Agora deve usar o userId obtido
            };
    
            try {
                const response = await fetch('http://10.135.40.26:8085/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTaskData)
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao salvar a tarefa.');
                }
    
                // Atualiza o estado local das tarefas
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
                setTasks(newTasks); // Atualiza as tarefas locais para a exibição da bolinha verde
    
                // Limpa os campos e fecha o modal
                setNewTask('');
                setDescription('');
                setCategory('');
                setTime(new Date());
                setNewTaskModalVisible(false);
                setSelectedDate('');
    
                // Exibir mensagem de sucesso
                setShowConfirmation(true);
                setTimeout(() => {
                    setShowConfirmation(false);
                }, 3000);
    
            } catch (error) {
                console.error('Erro ao salvar a tarefa:', error.message);
            }
        } else {
            console.error('Todos os campos são obrigatórios.');
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

        // Função para lidar com a pesquisa
        const handleSearch = () => {
            if (searchQuery.trim() !== '') {
                const results = [];
                Object.keys(tasks).forEach(date => {
                    tasks[date].forEach(task => {
                        if (task.title.includes(searchQuery) || task.description.includes(searchQuery)) {
                            results.push({ ...task, date });
                        }
                    });
                });
                setSearchResults(results);
                setSearchModalVisible(true);
            }
        };

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

        const renderSearchResult = ({ item }) => (
            <View style={styles.taskContainer}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Text style={styles.taskCategory}>{item.category}</Text>
                <Text style={styles.taskTime}>{item.time}</Text>
                <Text style={styles.taskDate}>Data: {item.date}</Text>
            </View>
        );

        const Drawer = createDrawerNavigator();

        const HomeScreen = () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        );

        const SettingsScreen = () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings Screen</Text>
            </View>
        );

        const App = () => (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
            </Drawer.Navigator>
        );

        const MenuIcon = () => {
            return (
                <View>
                    <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <FontAwesome5 name="bars" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            );
        };

        React.useLayoutEffect(() => {
            navigation.setOptions({

                headerStyle: {
                    backgroundColor: '#191515', // Definindo a cor verde para o header
                },
                headerTintColor: '#fff', // Definindo a cor do texto do header como branco
                headerTitleStyle: { // Estilo para o texto do título do header
                    fontWeight: 'bold',
                    fontSize: 30,
                },
            });

        }, [navigation]);


        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar Tarefas"
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

                <Modal
                    visible={newTaskModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setNewTaskModalVisible(false)}
                    setEvents={setEvents}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Adicionar Tarefa em {selectedDate}</Text>
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
                            <TouchableOpacity onPress={addTask} style={styles.addButton}>
                                <Text style={styles.addButtonText}>Adicionar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setNewTaskModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.closeButton, styles.spacedButton]}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setNewTaskModalVisible(true)} style={[styles.addButton, styles.spacedButton]}>
                                <Text style={styles.addButtonText}>Adicionar Mais Tarefas</Text>
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

                {/* Modal para mostrar os resultados da pesquisa */}
                <Modal
                    visible={searchModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setSearchModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Resultados da Pesquisa</Text>
                            {searchResults.length > 0 ? (
                                <FlatList
                                    data={searchResults}
                                    renderItem={renderSearchResult}
                                    keyExtractor={(item, index) => `${item.date}-${index}`}
                                />
                            ) : (
                                <Text style={styles.noResultsText}>Nenhuma tarefa encontrada.</Text>
                            )}
                            <TouchableOpacity onPress={() => setSearchModalVisible(false)} style={[styles.closeButton, styles.spacedButton]}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>



                {showConfirmation && (
                    <View style={styles.confirmationContainer}>
                        <Text style={styles.confirmationText}>Tarefa adicionada com sucesso!</Text>
                    </View>
                )}
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#191515',
            paddingTop: 20, // Adiciona espaço para a barra de pesquisa
        },
        searchInput: {
            borderColor: 'green',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            height: 40,
            color: 'white',
            width: 300,
            marginLeft: 50,
        },
        // Adicione a cor verde ao estilo da data
        taskDate: {
            fontSize: 14,
            color: 'green', // Alterado de preto para verde
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
            backgroundColor: 'red',
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
        spacedButton: {
            marginVertical: 5, // Adiciona espaçamento vertical entre os botões
        },
        confirmationContainer: {
            position: 'absolute',
            bottom: 0, // Posicionamento no final da tela
            left: 0,
            right: 0,
            backgroundColor: 'green',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        confirmationText: {
            color: 'white',
            fontWeight: 'bold',
        },
        noResultsText: {
            color: 'red', // Alterado de preto para vermelho
            textAlign: 'center',
            marginTop: 20, // Adiciona um espaçamento superior para centralizar a mensagem
        },
        menuContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 250,
            backgroundColor: '#3b3b3b',
            zIndex: 10,
        },
        menuButton: {
            position: 'absolute',
            top: 22,
            left: 20,
            zIndex: 10,
        },
        menuButtonText: {
            fontSize: 65,
            color: 'white',
        },

    });

    export default TodoListScreen;