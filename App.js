import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from './pages/Profile';
import ActivitiesPage from './pages/Activities';
import GoalsPage from './pages/Goals';
import ActivityPage from './pages/Activity';
import * as Location from 'expo-location';

const Tab = createBottomTabNavigator();


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
        <Tab.Screen name='Goals' component={GoalsPage}/>
        <Tab.Screen name='Settings' component={ActivityPage} options={{ tabBarButton: () => null }} 
        />
        <Tab.Screen name='Profile' component={ProfilePage} />
        <Tab.Screen name='Activity' component={ActivityPage} options={{ tabBarButton: () => null }} initialParams={{long: JSON.stringify(long).substring(0, 7), lat: JSON.stringify(lat).substring(0,7)}} //Coordinates hardcoded
        />
        <Tab.Screen name='Activities' component={ActivitiesPage}/>
       
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
   
  );
}



