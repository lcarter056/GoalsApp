import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfilePage from './pages/Profile';
import ActivitiesPage from './pages/Activities';
import GoalsPage from './pages/Goals';
//weather api additions 
//import weatherData from './api/weather';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRoutrName='Goals'>
        <Tab.Screen name='Goals' component={GoalsPage} />
        <Tab.Screen name='Profile' component={ProfilePage} />
        <Tab.Screen name='Activities' component={ActivitiesPage} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
   
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
