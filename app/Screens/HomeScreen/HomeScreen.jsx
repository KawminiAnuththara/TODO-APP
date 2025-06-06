import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Checkbox from 'expo-checkbox';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '@/components/Utills/Colors';

export default function HomeScreen() {
  const { signOut } = useAuth();
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
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  }
});
