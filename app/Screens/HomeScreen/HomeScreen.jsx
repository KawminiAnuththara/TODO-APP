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

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigation = useNavigation();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = ['#D9BDBD', '#AEC8E7', '#B4D1B1', '#E8C99D', '#C3A4D6'];



  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://60a21a08745cd70017576014.mockapi.io/api/v1/todo');
      const json = await res.json();
       const sorted = json.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTodos(sorted);
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
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ImageBackground source={require('@/assets/images/fulldp.jpg')} style={styles.background}>
        <SafeAreaView style={styles.container}>
          
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handleSignOut}>
              <Icon name="chevron-left" size={34} color="#000" />
            </TouchableOpacity>
            <View style={styles.userImageWrapper}>
              <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            </View>
          </View>

          <Text style={styles.myList}>My ToDo List 📃</Text>

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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    marginBottom: 20,
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
    fontSize: 18,
    color: '#333',
    fontWeight:'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  todoDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
    zIndex: 999,
  },
});
