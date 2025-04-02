import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

// Define interface for FriendRequest type
interface FriendRequest {
  id: string;
  name: string;
  mutualFriends: number;
  image: string;
}

// Sample friend request data
const friendRequests: FriendRequest[] = [
  {
    id: '1',
    name: 'John Smith',
    mutualFriends: 3,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    mutualFriends: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '3',
    name: 'Michael Chen',
    mutualFriends: 2,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

export default function RequestsScreen() {
  const renderRequestItem = ({ item }: { item: FriendRequest }) => (
    <View style={styles.requestCard}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.profileImage} 
      />
      <View style={styles.requestInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.mutualText}>{item.mutualFriends} mutual friends</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        renderItem={renderRequestItem}
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
  requestCard: {
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
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mutualText: {
    fontSize: 14,
    color: '#687076',
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  declineButton: {
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  declineButtonText: {
    color: '#687076',
    fontWeight: '500',
    fontSize: 14,
  },
});