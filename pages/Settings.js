import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsPage({ route }) {
  const { username, password } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{username}</Text>

      <Text style={styles.label}>Password:</Text>
      <Text style={styles.value}>{password}</Text>
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
});

