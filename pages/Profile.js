import React, {useEffect, useState} from "react";
import { View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfilePage() {
 const [favs, setFavs] = useState([]);


  const getData = async () => {
    try {
     let favActivities = await AsyncStorage.getItem('FavActs');
     if (favActivities){
      setFavs(JSON.parse(favActivities));  
     } else {
      setFavs([]);
     }
      } catch (error){ 
        console.error('Error getting fav activities from profile page');
      }     
}


const removeActs = async (act) => {
    try {
      let currList = await AsyncStorage.getItem('FavActs');
      if (currList != null){
       currList =  JSON.parse(currList);
      }
      else {
        currList = [];
      }
      currList = currList.filter(item => item !== act);
      await AsyncStorage.setItem('FavActs', JSON.stringify(currList));
      
      await getData();
    } catch (error) {
      console.error('Error adding activity to the list');
    }

  
  
}
    useFocusEffect(
      React.useCallback(() => {
        getData();
    }, [])
  );

    return (
    <View>
      <Text>Profile Page</Text>
      <Text> Fav Activites </Text> 
        {favs.map((act, index) => (
           <View style={styles.row} key={index}>
              <Text style={styles.text}> {JSON.stringify(act)} </Text>
              <Button title="Unlike" onPress={() => removeActs(act)} />
            </View>
            ))}
    </View>
  );

};

const styles = StyleSheet.create({
  background: {
    paddingTop: 60,
    alignItems: 'center', 
    width: '100%',
    height: '100%', 
    backgroundColor: '#ABC270'
  },

  button: {     
        paddingRight: 200,
        alignItems: 'center',
        justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 20, 
    flexWrap: 'wrap',
    justifyContent: 'space-center'
  },
  col: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 13, 
    flexWrap: 'nowrap', 
  }, 
  text: {
    paddingTop: 20,
    color: '#3A1F04',
    maxWidth: '70%',
    fontSize: 20,
    marginRight: 10, 
  }
});