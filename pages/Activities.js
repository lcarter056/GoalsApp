import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


export default function ActivitiesPage() {

  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [time, setTime] = useState([{label: 'Morning', value: 'Morning'},
    {label: 'Afternoon', value: 'Afternoon'},
    {label: 'Evening', value: 'Evening'}
  ]);

//GPS fix: 4-6 okay, <4 good, >9
  const loadPage = (page) => {
    let valueTag = value;
    if (valueTag == null){
      valueTag = "Evening";
    }
    navigation.navigate(`Activity` , {title : page, time : valueTag});
  }

  return (
    <View style={styles.background}>
  <Text style={{ color: '#5C4033', fontWeight: 'bold', fontSize: 23, paddingBottom: 30, marginTop: -30 }}>Choose an Activity Category!</Text>
    <View style = {styles.dropDown}>
      <DropDownPicker style={styles.dropDown} items={time} open={open} 
      value={value} setOpen={setOpen} setValue={setValue} onChange={item => {setValue(item.value)}}
        setItems={setTime} dropDownContainerStyle={styles.label} labelStyle={{color: '#5C4033', fontWeight: 'bold'}} textStyle={{color: '#5C4033'}} placeholder="Select time"
      >
      </DropDownPicker>
      </View>
      <TouchableOpacity style= {styles.button}
         onPress={() => loadPage('Exercise')}> 
        <Text style={{ color: 'white', fontSize: 18 }} >Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity style= {styles.button}
       onPress={() => loadPage('Restaurant')}>
        <Text style={{ color: 'white', fontSize: 18 }}>Restaurant</Text>
      </TouchableOpacity>
      <TouchableOpacity style= {styles.button}
       onPress={() => loadPage('Hang Out')}>  
       <Text style={{ color: 'white', fontSize: 18 }}>Hang out</Text>
      </TouchableOpacity>
      <TouchableOpacity style= {styles.button}
      onPress={() => loadPage('Study Spot')}>
        <Text style={{ color: 'white', fontSize: 18 }}>Study Spot</Text>
      </TouchableOpacity>
    </View>

  );

}  

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%',
    height: '100%', 
    backgroundColor: '#ABC270'
  },

  button: {     
        height: 55, 
        marginTop: 40,
        backgroundColor:'#6D803C',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
  },

  dropDown: {
    width: 140,
    backgroundColor: '#FFD996', 
    borderColor: '#6D803C', 
  }, 

  dropDownContainer: {
    width: 40
  }, 
  
  label: {
    backgroundColor: '#FFD996', 
  }

});