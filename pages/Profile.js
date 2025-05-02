import React, { useState } from "react";
import { View, Text , Button , StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ProfilePage() {
  const [favs, setFavs] = useState([]);

  const getData = async () => {
    try {
      let favActivities = await AsyncStorage.getItem("FavActs");
      if (favActivities) {
        setFavs(JSON.parse(favActivities));
      } else {
        setFavs([]);
      }
    } catch (error) {
      console.error("Error getting fav activities from profile page", error);
    }
  };

  const removeActs = async (act) => {
    try {
      let currList = await AsyncStorage.getItem("FavActs");
      if (currList != null) {
        currList = JSON.parse(currList);
      } else {
        currList = [];
      }
      currList = currList.filter((item) => item !== act);
      await AsyncStorage.setItem("FavActs", JSON.stringify(currList));
      await getData();
    } catch (error) {
      console.error("Error removing activity from the list", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
    getData();
    }, [])
  );

  return (
    <>
    <View style={styles.container}>
        <View style={styles.avatarContainer}>
           <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/290/290022.png' }}
              style={styles.avatar}
            />
           <View style={styles.infoRow}>
              <Text style={styles.name}>goalSetter</Text>
              <View style={styles.streakContainer}> 
                <Text style={styles.streak}>🪴</Text>
                <Text style={styles.streakText}>3</Text>
              </View>
            </View>
          </View>
        </View>
    

      <View style={styles.section} >
        <Text style={styles.sectionTitle}>Favorite Activities:</Text>
        {favs.length === 0 ? (
          <Text style={styles.noFavsText}>No favorites yet.</Text>
        ) : (
          <FlatList
            data={favs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.activityRow}>
                <TouchableOpacity onPress={() => removeActs(item)}>
                <Icon
                  name="heart"
                  size={20}
                  color="#fff"
                  style={styles.heartIcon}
                />
                </TouchableOpacity>
                <Text style={styles.activityItem}>{item}</Text>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#abc270",
    alignItems: "center"
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    width: "100%"
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90
  },
  infoRow: {
    flexDirection: "row",
    width: "60%",
    marginLeft: 10,
    justifyContent: "space-between"
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "left",
    marginLeft: -10,
    marginTop: 10,
    color:'#5C4033'
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  streak: {
    fontSize: 20,
    marginRight: 4,
    marginTop: 10
  },
  streakText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10
  },
  section: {
    flex: 1,
    width: "100%",
    backgroundColor:'#abc270',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
    paddingHorizontal: 10,
    color: '#5C4033',
    marginLeft: 15
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 10
  },
  heartIcon: {
    marginLeft: 25
  },
  activityItem: {
    fontSize: 16,
    flex: 1,
    marginLeft: 15,
    color:'#5C4033'
  },
  noFavsText: {
    paddingHorizontal: 10,
    fontStyle: "italic",
    color: "#5C4033",
    marginLeft: 30,
  }
});
