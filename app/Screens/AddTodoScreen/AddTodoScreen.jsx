import { addTodo } from "@/components/services/TodoApi";
import Colors from "@/components/Utills/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function AddTodoScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  //add new todo to database
  const handleSubmit = async () => {
    //check empty fields
    if (!title || !description) {
      Toast.show({
        type: "error",
        text1: "All fields are required",
      });
      return;
    }

    try {
      //send todo to backend with current timestamp
      await addTodo({ 
        title, 
        description,
        createdAt: new Date().toISOString(), 
      });
      Toast.show({
        type: "success",
        text1: "Todo added successfully!",
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Todo add failed!",
      });
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/fulldp.jpg')} // adjust path as needed
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.midContainer}>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#fff"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            placeholderTextColor="#fff"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.todoButton}>
            <Text style={styles.buttonText}>Add Todo</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../../assets/images/image6.png")}
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
    paddingHorizontal: 20,
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 15,
    fontSize: 18,
    borderColor: "#fff",
  },
  todoButton: {
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    alignItems: "center",
  },
  background: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
  },
  midContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    padding: 50,
    borderRadius: 20,
  },
  todoImage: {
    width: 300,
    height: 300,
  },
});
