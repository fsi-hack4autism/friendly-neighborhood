import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

export default function HomeScreen() {
  const handleNavigate = (screen: string) => {
    router.push(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        <Image 
          source={require('../../assets/images/neuronest.png')}
          style={styles.appLogo}
        />
        <Text style={styles.appName}>NeuroNest</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome Mary</Text>
          <Image 
            source={require('../../assets/images/mary.jpg')}
            style={styles.profilePic}
          />
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
    marginBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.light.tint,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20, // Add top padding to move content down from app header
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 15,
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
    width: '100%',
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