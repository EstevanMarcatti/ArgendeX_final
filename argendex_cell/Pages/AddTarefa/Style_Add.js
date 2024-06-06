import { ImageBackground, StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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



