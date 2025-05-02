import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ScreenOrientation from 'expo-screen-orientation';
import ProfilePage from './pages/Profile';
import ActivitiesPage from './pages/Activities';
import GoalsPage from './pages/Goals';
import ActivityPage from './pages/Activity';
import SettingsPage from './pages/Settings';
import LoginPage from './pages/LogIn';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GoalStack({setIsLoggedIn}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Goals" component={GoalsPage} />
      <Stack.Screen name="Settings">
        {(props) => <SettingsPage {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfilePage} />
    </Stack.Navigator>
  );
}

function ActivitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activities" component={ActivitiesPage} />
    </Stack.Navigator>
  );
}

function MainTabs({setIsLoggedIn}) {
  const hideTabBarOnScreens = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if (routeName === 'Settings') {
      return { display: 'none' };
    }
    return;
  };

  const renderTabIcon = (routeName, focused, color, size) => {
    let iconName = '';

    if (routeName === 'Goals') {
      iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
    } else if (routeName === 'Profile') {
      iconName = focused ? 'person' : 'person-outline';
    } else if (routeName === 'Activities') {
      iconName = focused ? 'walk' : 'walk-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  const setFavs = async () => {
    try {
      const favs = await AsyncStorage.getItem('FavActs');
      if(!favs){
        await AsyncStorage.setItem('FavActs', JSON.stringify([]));
      }
    }
    catch (error) {
    console.log('Error setting fav activites');
    }
    
  }
    useEffect(() => {
      
       async function getCurrentLocation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
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
       setFavs();
     }, []);
     
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: hideTabBarOnScreens(route),
        tabBarIcon: ({ focused, color, size }) =>
          renderTabIcon(route.name, focused, color, size),
        tabBarActiveTintColor: '#abc270',
        tabBarInactiveTintColor: '#5C4033',
      })}
    >
      <Tab.Screen name="Goals">
        {() => <GoalStack setIsLoggedIn={setIsLoggedIn}/>}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Activities" component={ActivitiesStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="MainTabs"> 
              {(props) => <MainTabs {...props} setIsLoggedIn={setIsLoggedIn}/>}
            </Stack.Screen> 
            <Stack.Screen
              name="Activity"
              component={ActivityPage}
              options={{headerShown: true}}
              initialParams={{
                long: long !== null ? JSON.stringify(long).substring(0, 7) : null,
                lat: lat !== null ? JSON.stringify(lat).substring(0, 7) : null,
              }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

