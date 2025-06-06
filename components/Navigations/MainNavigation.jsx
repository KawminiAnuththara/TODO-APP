import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/app/Screens/HomeScreen/HomeScreen';
import AddTodoScreen from '@/app/Screens/AddTodoScreen/AddTodoScreen';
import TodoDetailScreen from '@/app/Screens/TodoDetailsScreen/TodoDetailScreen';


const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} options={{ title: 'Add Todo' }} />
      <Stack.Screen name="TodoDetailScreen" component={TodoDetailScreen} options={{ title: 'Todo Detail' }} />
    </Stack.Navigator>
  );
}
