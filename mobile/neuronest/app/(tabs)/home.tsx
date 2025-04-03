import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function HomeScreen() {
  const handleNavigate = (screen: string) => {
    router.push(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        <Text style={styles.appName}>NeuroNest</Text>
      </View>
      
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Mary</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleNavigate('/(screens)/connect')}
        >
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleNavigate('/(screens)/questionaire')}
        >
          <Text style={styles.buttonText}>Questionaire</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleNavigate('/(screens)/profile')}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleNavigate('/(screens)/forum')}
        >
          <Text style={styles.buttonText}>Forum</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  appHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.tint,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.light.tint,
    width: '80%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});