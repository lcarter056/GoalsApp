import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function SettingsPage({ route, setIsLoggedIn }) {
  const { username, password } = route.params;
  const handleLogout = () => {
    setIsLoggedIn(false);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{username}</Text>

      <Text style={styles.label}>Password:</Text>
      <Text style={styles.value}>{password}</Text>

      <View style={styles.logoutButton}>
        <Button title='Logout' onPress={handleLogout} color="#d9534f"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    marginTop: 8,
    color: 'gray',
  },
  logoutButton: {
    marginTop: 40,
  },
});

