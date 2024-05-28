import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useHeaderOptions from '../../components/Header.js'; // Importando o hook do header

const EditTaskScreen = ({ task, onSave, onCancel }) => {
    const [newTask, setNewTask] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [category, setCategory] = useState(task.category);
    const [time, setTime] = useState(new Date());

    const handleSave = () => {
        onSave({
            ...task,
            title: newTask,
            description,
            category,
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    };

    return (
        <View style={styles.container}>
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
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191515',
        padding: 20,
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
    saveButton: {
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EditTaskScreen;
