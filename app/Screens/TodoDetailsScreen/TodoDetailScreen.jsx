import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function TodoDetailScreen() {
    const {params} = useRoute();
    const todo = params.todo;
    const navigation = useNavigation();

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleUpdate = async () => {
    await updateTodo(todo.id, { title, description });
    navigation.goBack();
    };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    navigation.goBack();
   };


  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Button title="Update Todo" onPress={handleUpdate} />
      <Button title="Delete Todo" color="red" onPress={handleDelete} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    padding: 20 
},
  input: { 
    borderBottomWidth: 1, 
    marginBottom: 20, 
    fontSize: 16 
},
});