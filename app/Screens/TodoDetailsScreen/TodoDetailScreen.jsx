import { deleteTodo, updateTodo } from '@/components/services/TodoApi';
import Colors from '@/components/Utills/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function TodoDetailScreen() {

  //initialize todo data
  const { params } = useRoute();
  const todo = params.todo;

  //navigation object for screen control
  const navigation = useNavigation();

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

   
  // update existing todo
  const handleUpdate = async () => {
    //check empty fields
    if (!title || !description) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
      return;
    }

    try {
      //call update API
      await updateTodo(todo.id, { title, description });
      Toast.show({
        type: 'success',
        text1: 'Todo updated successfully!',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Update failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to update todo',
      });
    }
  };

  // delete current todo
  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      Toast.show({
        type: 'success',
        text1: 'Todo deleted successfully!',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Delete failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to delete todo',
      });
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/fulldp.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.midContainer}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor="#fff"
          />
          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={[styles.buttonText, { color: '#000' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../../assets/images/image5.png')}
          style={styles.todoImage}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 20,
    fontSize: 18,
    borderColor: '#fff',
    color:'#fff'
  },
  background: {
    flex: 1,
  },
  updateButton: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  midContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    padding: 20,
    borderRadius: 20,
  },
  todoImage: {
    width: 300,
    height: 300,
    alignItems: 'center',
  },
});
