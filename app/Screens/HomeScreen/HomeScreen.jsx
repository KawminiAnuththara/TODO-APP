<<<<<<< HEAD
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Checkbox from 'expo-checkbox';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '@/components/Utills/Colors';
=======
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
>>>>>>> recover-lost-changes

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigation = useNavigation();
  const { user } = useUser();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://60a21a08745cd70017576014.mockapi.io/api/v1/todo');
      const json = await res.json();
      setTodos(json);
    } catch (error) {
      console.error("Fetching todos failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`https://60a21a08745cd70017576014.mockapi.io/api/v1/todo/${id}`, {
        method: 'DELETE',
      });
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      Alert.alert('Error', 'Failed to delete the item.');
    }
  };

  // Called when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [])
  );

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = ['#FFEBEE', '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5'];

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://60a21a08745cd70017576014.mockapi.io/api/v1/todo');
      const json = await res.json();
      setTodos(json);
    } catch (error) {
      console.error('Fetching todos failed', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle isDone for a todo
  const toggleTodoDone = async (id, currentValue) => {
    try {
      await fetch(`https://60a21a08745cd70017576014.mockapi.io/api/v1/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone: !currentValue }),
      });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, isDone: !currentValue } : todo))
      );
    } catch (err) {
      Alert.alert('Error', 'Failed to update task.');
    }
  };

  // Fetch todos on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [])
  );

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require('../../../assets/images/logo-black.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.userImageWrapper}>
          <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
        </View>
        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="log-out" size={34} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search" size={24} color="#333" />
        <TextInput placeholder="Search" style={styles.searchInput} clearButtonMode="always" />
      </View>

      {/* Todos List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id?.toString()}
        refreshing={loading}
        onRefresh={fetchTodos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoContainer}
            onPress={() => navigation.navigate('TodoDetailScreen', { todo: item })}
          >
            <View style={styles.todoInfoContainer}>
              <Checkbox value={item.isDone || false} disabled />
              <Text style={[styles.todoText, item.isDone && { textDecorationLine: 'line-through' }]}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodoScreen')}
      >
        <Icon name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
=======
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ImageBackground source={require('@/assets/images/fulldp.jpg')} style={styles.background}>
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

          {/* Todo List */}
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id?.toString()}
            refreshing={loading}
            onRefresh={fetchTodos}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[styles.todoContainer, { backgroundColor: colors[index % colors.length] }]}
                onPress={() => navigation.navigate('TodoDetailScreen', { todo: item })}
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
                        item.isDone && { textDecorationLine: 'line-through' },
                      ]}
                    >
                      {item.title}
                    </Text>
                    {item.createdAt && (
                      <Text style={styles.todoDate}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Text>
                    )}
                  </View>
                </View>
                <Icon name="chevron-right" size={24} color="#999" />
              </TouchableOpacity>
            )}
          />

          {/* Add Todo Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddTodoScreen')}
          >
            <Icon name="plus" size={28} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
>>>>>>> recover-lost-changes
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
<<<<<<< HEAD
=======
  background: { flex: 1 },
>>>>>>> recover-lost-changes
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
<<<<<<< HEAD
  },
  logo: { width: 100, height: 100 },
  userImageWrapper: {
    padding: 6,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userImage: { width: 55, height: 55, borderRadius: 28, marginLeft: -25 },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    padding: 5,
    borderRadius: 10,
    gap: 10,
    marginHorizontal: 10,
    marginBottom: 15
  },
  searchInput: { flex: 1, fontSize: 16 },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  todoText: {
    fontSize: 16,
    color: '#333'
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 15,
    elevation: 5
=======
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
    marginLeft: -25,
  },
  myList: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flexShrink: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  todoDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
>>>>>>> recover-lost-changes
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
<<<<<<< HEAD
  }
=======
    zIndex: 999,
  },
>>>>>>> recover-lost-changes
});
