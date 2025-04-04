import React, {useState, useEffect} from "react";
import { View, Text, Button } from 'react-native';
import fetchWeather from "../api/weather";

export default function ActivitiesPage() {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather();
      setWeather(data);
    };

    getWeather(); 
  }, []);

  return (
    <View>
      <Text>Activity Page</Text>


      <Text>{JSON.stringify(weather)}</Text>
    </View>
  );
}  