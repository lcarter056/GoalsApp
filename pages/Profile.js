import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function ProfilePage() {
  const [favoriteActivities, setFavoriteActivities] = useState([
    { id: '1', name: 'Run at Olmos Park', checked: true },
    { id: '2', name: 'Study at Nowhere Cafe', checked: true },
    { id: '3', name: 'Morning Yoga', checked: true },
    { id: '4', name: 'Read at Library', checked: true },
  ]);

  const toggleCheck = (id) => {
    setFavoriteActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, checked: !activity.checked } : activity
      )
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.avatarContainer}>
           <Image
              source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
              style={styles.avatar}
            />
           <View style={styles.infoRow}>
              <Text style={styles.name}>Username</Text>
              <View style={styles.streakContainer}> 
                <Text style={styles.streak}>🔥</Text>
                <Text style={styles.streakText}>3</Text>
              </View>
            </View>
          </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Activities:</Text>
        <FlatList
          data={favoriteActivities.filter(item => item.checked)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.activityRow} onPress={() => toggleCheck(item.id)}>
              <Icon name="heart" size={20} color="#ff4d4d" style={styles.heartIcon} />
              <Text style={styles.activityItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    width: '100%',
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  infoRow: {
    flexDirection: 'row',
    width: '60%',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'left',
    marginLeft: -10,
    marginTop: 10,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streak: {
    fontSize: 20,
    marginRight: 4,
    marginTop: 10,
  },
  streakText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff4d4d',
    marginTop: 10,
  },
  section: {
    flex: 1,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 30,
  },
  heartIcon: {
    marginRight: 15,
    color: '#fda769'
  },
  activityItem: {
    fontSize: 16,
  },
});

