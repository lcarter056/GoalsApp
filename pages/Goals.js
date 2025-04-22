import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

export default function GoalsPage() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
 /*
  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
    }

    getCurrentLocation();
  }, []);
*/
  return (
    <View>
      <Text>Goal Page</Text>
     
    </View>
  );
}