<<<<<<< Updated upstream
import { useAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
=======
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ImageBackground,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "@/components/Utills/Colors";
>>>>>>> Stashed changes

export default function HomeScreen() {
  const { signOut } = useAuth();
  const navigation = useNavigation();
<<<<<<< Updated upstream
=======
  const { user } = useUser();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFF3E0", "#F3E5F5"];

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://60a21a08745cd70017576014.mockapi.io/api/v1/todo"
      );
      const json = await res.json();
      setTodos(json);
    } catch (error) {
      console.error("Fetching todos failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle isDone
  const toggleTodoDone = async (id, currentValue) => {
    try {
      await fetch(
        `https://60a21a08745cd70017576014.mockapi.io/api/v1/todo/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDone: !currentValue }),
        }
      );
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isDone: !currentValue } : todo
        )
      );
    } catch (err) {
      Alert.alert("Error", "Failed to update task.");
    }
  };

  // On screen focus, fetch todos
  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [])
  );
>>>>>>> Stashed changes

  // Logout
  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
<<<<<<< Updated upstream
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
=======
    <View style={{flex:1}}>
    
      <StatusBar style="light" />
      <ImageBackground
      source={require('@/assets/images/fulldp.jpg')} // adjust path as needed
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="menu" size={34} color="#000" />
        </TouchableOpacity>
        <View style={styles.userImageWrapper}>
          <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
        </View>
        
      </View>
      <Text style={styles.myList}>My ToDo List</Text>

      {/* Todos List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id?.toString()}
        refreshing={loading}
        onRefresh={fetchTodos}
        renderItem={({ item,index }) => (
          <TouchableOpacity
            style={[styles.todoContainer, {backgroundColor:colors[index % colors.length]}]}
            onPress={() =>
              navigation.navigate("TodoDetailScreen", { todo: item })
            }
          >
            <View style={styles.todoInfoContainer}>
              <Checkbox
                value={item.isDone || false}
                onValueChange={() => toggleTodoDone(item.id, item.isDone)}
              />
              <View>
                <Text
                  style={[
                    styles.todoText,
                    item.isDone && { textDecorationLine: "line-through" },
                  ]}
                >
                  {item.title}
                </Text>
                {item.createdAt && (
                  <Text style={styles.todoDate}>
                    {new Date(item.createdAt).toLocaleDateString()}{" "}
                    {/* Or use .toLocaleString() */}
                  </Text>
                )}
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        )}
      />

      {/*  Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTodoScreen")}
      >
        <Icon name="plus" size={28} color="white" />
      </TouchableOpacity>
      </SafeAreaView>
      </ImageBackground>
    
    </View>
    
>>>>>>> Stashed changes
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
=======
  container: { flex: 1, },
  background:{
    flex:1
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    
  },
  logo: { 
    width: 100, 
    height: 100 
  },
  userImageWrapper: {
    padding: 6,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userImage: { 
    width: 55, 
    height: 55, 
    borderRadius: 28, 
    marginLeft: -25 
  },
  myList: {
    fontFamily:'Poppins-Bold',
    fontSize :24,
    textAlign:'center',
    padding:10,
    marginBottom:10,
    fontWeight:'bold'
  },
  searchInput: { flex: 1, fontSize: 16 },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: "center",
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flexShrink: 1,
>>>>>>> Stashed changes
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
<<<<<<< Updated upstream
  },
});
=======
    color: "#333",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 50,
    elevation: 4,
    zIndex:999
  },
  todoDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  
});
>>>>>>> Stashed changes
