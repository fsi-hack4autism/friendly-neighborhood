import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

// Define interface for Friend type
interface Friend {
  id: string;
  name: string;
  lastActive: string;
  image: string;
}

// Sample friends data
const friends: Friend[] = [
  {
    id: '1',
    name: 'Emily Davis',
    lastActive: '2 hours ago',
    image: 'https://randomuser.me/api/portraits/women/81.jpg',
  },
  {
    id: '2',
    name: 'David Wilson',
    lastActive: '5 minutes ago',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: '3',
    name: 'Jessica Brown',
    lastActive: 'Just now',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    id: '4',
    name: 'Robert Taylor',
    lastActive: '1 day ago',
    image: 'https://randomuser.me/api/portraits/men/91.jpg',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    lastActive: '4 hours ago',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

export default function FriendsScreen() {
  const router = useRouter();
  
  const handleMessagePress = (friend: Friend) => {
    router.push({
      pathname: '/(screens)/chat',
      params: { 
        name: friend.name,
        image: friend.image
      }
    });
  };

  const renderFriendItem = ({ item }: { item: Friend }) => (
    <View style={styles.friendCard}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.profileImage} 
      />
      <View style={styles.friendInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastActiveText}>Active: {item.lastActive}</Text>
      </View>
      <TouchableOpacity 
        style={styles.messageButton}
        onPress={() => handleMessagePress(item)}
      >
        <Text style={styles.messageButtonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Friends</Text>
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.light.text,
  },
  listContainer: {
    paddingBottom: 20,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastActiveText: {
    fontSize: 14,
    color: '#687076',
  },
  messageButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  messageButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});