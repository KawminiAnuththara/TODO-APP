import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function AddTodoScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigation = useNavigation();

    const handleAdd = async () => {
    if (!title || !description) return alert("Please fill all fields");
    await addTodo({ title, description });
    navigation.goBack();
    };

  return (
    <View style={styles.container}>
      <TextInput placeholder='Title' value={title} onChangeText={setTitle} style={styles.input}/>
      <TextInput placeholder='Description' value={description} onChangeText={setDescription} style={styles.input}/>
      <TouchableOpacity onPress={handleAdd}>
        <Text>Add Todo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    padding: 20 
},
  input: { 
    borderBottomWidth: 1, 
    marginBottom: 15, 
    fontSize: 16 
},
});