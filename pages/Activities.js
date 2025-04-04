import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { View, Text, Button } from 'react-native';
import fetchWeather from "../api/weather";

export default function ActivitiesPage() {
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather();
      setWeather(data);
    };

    getWeather(); 
  }, []);

  const loadPage = () => {
    navigate(`/Activity`);
  }
  return (
    <View>
      <Text>Activities Page</Text>

      <Button title="Exercise" onPress={loadPage}>  </Button>
      <Button title="Restaurant" onPress={console.log("HEF")}>  </Button>
      <Button title="Hang Out">  </Button>
      <Button title="Study Spot">  </Button>


      <Text>{JSON.stringify(weather)}</Text>
    </View>
  );
}  