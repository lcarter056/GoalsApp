import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from './pages/Profile';
import ActivitiesPage from './pages/Activities';
import GoalsPage from './pages/Goals';
import ActivityPage from './pages/Activity';
import SettingsPage from './pages/Settings';
import * as Location from 'expo-location';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GoalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Goals" 
        component={GoalsPage} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsPage} 
      />
    </Stack.Navigator>
  );
}

export default function App() {

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

    useEffect(() => {
       async function getCurrentLocation() {
         
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
           setErrorMsg('Permission to access location was denied');
           return;
         }
   
         let location = await Location.getCurrentPositionAsync({});
         setLat(location.coords.latitude);
         setLong(location.coords.longitude);
       }
   
       getCurrentLocation();
     }, []);
     
  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Goals'>
          <Tab.Screen name='Goals' component={GoalStack} options={{headerShown:false}}/>
          <Tab.Screen name='Profile' component={ProfilePage} />
          <Tab.Screen name='Activity' component={ActivityPage} options={{ tabBarButton: () => null }} initialParams={{long: JSON.stringify(long).substring(0, 7), lat: JSON.stringify(lat).substring(0,7)}} //Coordinates hardcoded
          />
          <Tab.Screen name='Activities' component={ActivitiesPage}/>
        
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}



