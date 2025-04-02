import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type User = {
  id: string;
  name: string;
  image: string;
  rank: number;
  descriptions?: string[];
};

const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rank: 5,
    descriptions: [
      'Has a 7 year old son with autism',
      'Experienced with sensory processing techniques',
      'Lives nearby in your neighborhood'
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rank: 4,
    descriptions: [
      'Special education teacher',
      'Runs a support group for parents'
    ]
  },
  {
    id: '3',
    name: 'Alicia Rodriguez',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rank: 4
  },
  {
    id: '4',
    name: 'David Wilson',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    rank: 3,
    descriptions: [
      'Occupational therapist with 10+ years experience',
      'Specializes in autism spectrum disorders'
    ]
  },
  {
    id: '5',
    name: 'Emma Thompson',
    image: 'https://randomuser.me/api/portraits/women/24.jpg',
    rank: 2
  },
  {
    id: '6',
    name: 'James Lee',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    rank: 1
  }
];

export default function ConnectScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.light.tint} />
        </TouchableOpacity>
        <Text style={styles.title}>Connect</Text>
      </View>
      
      <Text style={styles.subtitle}>Suggested connections for you</Text>
      
      <ScrollView style={styles.scrollView}>
        {users.sort((a, b) => b.rank - a.rank).map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: user.image }} 
                style={styles.userImage} 
              />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                {user.descriptions && (
                  <View style={styles.descriptionsContainer}>
                    {user.descriptions.map((desc, index) => (
                      <Text key={index} style={styles.description}>• {desc}</Text>
                    ))}
                  </View>
                )}
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.rankBadge, {
              backgroundColor: getRankColor(user.rank)
            }]}>
              <Text style={styles.rankText}>{user.rank}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const getRankColor = (rank: number) => {
  switch(rank) {
    case 5: return '#2A9D8F'; // green
    case 4: return '#4EA8DE'; // blue
    case 3: return '#7678ED'; // purple
    case 2: return '#F4A261'; // orange
    case 1: return '#E76F51'; // red
    default: return Colors.light.tint;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
    textAlign: 'center',
    marginRight: 28, // Balance the back button width
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: Colors.light.text,
  },
  descriptionsContainer: {
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: Colors.light.icon,
    marginBottom: 2,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  rankText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  connectButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});