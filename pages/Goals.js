import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, SectionList, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Ionicons} from '@expo/vector-icons';

export default function GoalsPage({navigation}) { 
  const [personalGoals, setPersonalGoals] = useState([
    {id: '1', text: 'Drink water', checked: false },
    {id: '2', text: 'Walk for 15 minutes', checked: false},
  ]); 
  
  const [academicGoals, setAcademicGoals] = useState([
    {id: '1', text: 'Find study spot', checked:false},
    {id: '2', text: 'Study for 30min',checked:false},
  ]); 
  
  const [progress, setProgress] = useState(0);
  const [newPersonalGoal, setNewPersonalGoal] = useState('');
  const [newAcademicGoal, setNewAcademicGoal] = useState('');


  const toggleItem = (sectionKey, id) => {
    const setter = sectionKey === 'Personal' ? setPersonalGoals : setAcademicGoals;

    setter((prev) => 
      prev.map((item) => 
          item.id === id ? {...item, checked: !item.checked} : item
    )
  );
};

  const removeItem = (sectionKey, id) => {
    const setter = sectionKey === 'Personal' ? setPersonalGoals : setAcademicGoals;
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const addGoal = (sectionKey) => {
    const text =
      sectionKey === 'Personal' ? newPersonalGoal.trim() : newAcademicGoal.trim();
    if (text === '') return;

    const newGoalObj = {
      id: Date.now().toString(),
      text,
      checked: false,
    };

    if (sectionKey === 'Personal') {
      setPersonalGoals((prev) => [...prev, newGoalObj]);
      setNewPersonalGoal('');
    } else {
      setAcademicGoals((prev) => [...prev, newGoalObj]);
      setNewAcademicGoal('');
    }
  };

  useEffect(() => {
    const allGoals = [...personalGoals, ...academicGoals];
    const total = allGoals.length;
    const checked = allGoals.filter((goal) => goal.checked).length;
    const percent = total > 0 ? (checked / total) * 100 : 0;
    setProgress(percent);
  }, [personalGoals, academicGoals]);

  const sections = [
    {
      title: 'Personal:',
      data: [...personalGoals, {isInput: true}],
      key: 'Personal',
      inputValue: newPersonalGoal,
      setInputValue: setNewPersonalGoal,
    },
    {
      title: 'Academic:',
      data: [...academicGoals, {isInput: true}],
      key: 'Academic',
      inputValue: newAcademicGoal,
      setInputValue: setNewAcademicGoal,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerConntainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.subtitle}>Let's Get Started!</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings', {
          username:'goalSetter', password: 'goals',
        })}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <AnimatedCircularProgress
        size={150}
        width={15}
        fill={progress}
        tintColor="#5C4033"
        backgroundColor="#788546"
        padding={15}
      >
       {(fill) => (<Text style={{ color: '#5C4033', fontSize: 20,fontWeight: 'bold' }}>{Math.round(fill)}%
      </Text>)}
      </AnimatedCircularProgress>
      <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.id ?? 'input-${index}'}
          renderSectionHeader={({section}) => (
            <Text style={styles.listTitle}>{section.title}</Text>
          )}
          renderItem={({item, section}) => 
            item.isInput ? (
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder='New Goal...'
                  style={styles.input}
                  value={section.inputValue}
                  onChangeText={section.setInputValue}
                />
                 <Button title='Add Goal' onPress={() => addGoal(section.key)} color='#788546' />
          </View>
      ) : (
          <View style={styles.goalRow}>
            <View style={{flex: 1}}>
              <BouncyCheckbox
                size={25}
                fillColor="#5C4033"
                unfillColor="#FFFFFF"
                text={item.text}
                isChecked={item.checked}
                onPress={() => toggleItem(section.key, item.id)}
                textStyle={styles.checkboxText}
                style={styles.checkbox}
              />
            </View>
            <TouchableOpacity
              onPress={() => removeItem(section.key, item.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeText}>x</Text>
            </TouchableOpacity> 
          </View>
        )
      }
      style={styles.list}
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#abc270',
    alignItems: 'center',
    padding: 20,
  },
  headerConntainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    alignItems: 'left',
  },
  counter: {
    fontSize: 18,
    marginBottom: 10,
   
  },
  subtitle: {
    fontSize: 20
  },
  list: {
    marginTop: 10,
    width: '100%',
    
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 5,
    paddingHorizontal: 10,
    color: '#5C4033',
  },
  checkbox: {
    marginVertical: 5,
    paddingLeft: 10,
  },
  checkboxText: {
    textDecorationLine: 'none',
    color:"#fff"
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
  removeText: {
    fontSize: 18,
    color: '#5C4033',
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5C4033',
  },
});
  /*const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null); */
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