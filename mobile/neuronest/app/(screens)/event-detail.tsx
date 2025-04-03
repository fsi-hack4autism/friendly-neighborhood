import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

type Comment = {
  id: string;
  userName: string;
  text: string;
  time: string;
};

type EventDetails = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  image: any;
  comments: Comment[];
};

// Sample events data with comments
const eventsData: Record<string, EventDetails> = {
  '1': {
    id: '1',
    title: 'Sensory-Friendly Movie Night',
    description: 'A special screening with adjusted sound and lighting for children with sensory sensitivities. The theater will maintain low lighting during the movie, and the sound will be kept at a lower level than typical screenings. There will also be a quiet space available for breaks if needed.',
    location: 'The Grand Cinema, 123 Main St, New York, NY',
    date: 'April 15, 2025',
    time: '4:00 PM',
    image: require('../../assets/images/movie_night.png'),
    comments: [
      {
        id: '101',
        userName: 'Sarah J.',
        text: 'Will there be designated quiet areas for children who need breaks during the movie?',
        time: '2 days ago',
      },
      {
        id: '102',
        userName: 'Event Host',
        text: 'Yes, we\'ll have a quiet room adjacent to the theater where families can take breaks if needed.',
        time: '1 day ago',
      },
      {
        id: '103',
        userName: 'Michael T.',
        text: 'My son loved the last event like this! Looking forward to attending again.',
        time: '12 hours ago',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Autism Support Group Meeting',
    description: 'Monthly meeting for parents to share experiences and resources. This month we\'ll have a guest speaker who specializes in communication strategies for non-verbal children.',
    location: 'Community Center, 456 Oak Ave, San Francisco, CA',
    date: 'April 20, 2025',
    time: '6:30 PM',
    image: require('../../assets/images/support_group.jpeg'),
    comments: [
      {
        id: '201',
        userName: 'Patricia M.',
        text: 'Is childcare provided during the meeting?',
        time: '3 days ago',
      },
      {
        id: '202',
        userName: 'Event Host',
        text: 'Yes, we offer supervised activities for children during the session.',
        time: '2 days ago',
      },
    ],
  },
  '3': {
    id: '3',
    title: 'Inclusive Playground Meetup',
    description: 'Get together at the new inclusive playground designed for children of all abilities. This playground features sensory-friendly equipment, wheelchair accessible play structures, and quiet zones.',
    location: 'Sunshine Park, 789 Park Rd, Seattle, WA',
    date: 'May 1, 2025',
    time: '10:00 AM',
    image: require('../../assets/images/playground.jpeg'),
    comments: [
      {
        id: '301',
        userName: 'David L.',
        text: 'Is there shade available at the playground? My daughter is sensitive to direct sunlight.',
        time: '1 week ago',
      },
      {
        id: '302',
        userName: 'Emma R.',
        text: 'Yes, there are several shaded areas and a covered pavilion nearby!',
        time: '6 days ago',
      },
      {
        id: '303',
        userName: 'Alex K.',
        text: 'We\'ll bring some extra sunscreen to share just in case.',
        time: '2 days ago',
      },
    ],
  },
  '4': {
    id: '4',
    title: 'Special Needs Resource Fair',
    description: 'Connect with local organizations and specialists offering services for children with autism. There will be representatives from therapy centers, educational programs, recreational activities, and support networks.',
    location: 'Convention Center, 321 Event Blvd, Phoenix, AZ',
    date: 'May 8, 2025',
    time: '9:00 AM - 3:00 PM',
    image: require('../../assets/images/resource_fair.jpeg'),
    comments: [
      {
        id: '401',
        userName: 'Jennifer P.',
        text: 'Will there be presentations or just booths to visit?',
        time: '5 days ago',
      },
      {
        id: '402',
        userName: 'Event Host',
        text: 'We\'ll have both! Hourly presentations in the main hall, plus over 40 exhibitor booths.',
        time: '4 days ago',
      },
      {
        id: '403',
        userName: 'Robert M.',
        text: 'Is there a schedule of the presentations available?',
        time: '3 days ago',
      },
      {
        id: '404',
        userName: 'Event Host',
        text: 'We\'ll post the full schedule next week. Stay tuned!',
        time: '2 days ago',
      },
    ],
  },
};

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [newComment, setNewComment] = useState('');
  
  // Get the event data based on the ID
  const event = id ? eventsData[id] : null;
  
  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    // In a real app, you would add the comment to the database
    // For now we're just clearing the input
    setNewComment('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.light.tint} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.contentContainer}>
        <FlatList
          data={[{ key: 'details' }, ...event.comments]}
          keyExtractor={(item) => 'key' in item ? item.key : item.id}
          renderItem={({ item }) => {
            if ('key' in item) {
              // Render event details section with the image included at the top
              return (
                <View>
                  <Image source={event.image} style={styles.eventImage} />
                  <View style={styles.contentPadding}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date} • {event.time}</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>
                    
                    <View style={styles.divider} />
                    
                    <Text style={styles.commentsHeader}>Discussion ({event.comments.length})</Text>
                  </View>
                </View>
              );
            } else {
              // Render comment
              return (
                <View style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUser}>{item.userName}</Text>
                    <Text style={styles.commentTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
              );
            }
          }}
          style={styles.contentList}
          contentContainerStyle={styles.contentListInner}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, newComment.trim() === '' && styles.sendButtonDisabled]} 
          onPress={handleAddComment}
          disabled={newComment.trim() === ''}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 24,
    color: Colors.light.tint,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 30,
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
  },
  contentList: {
    flex: 1,
  },
  contentListInner: {
    paddingBottom: 20,
  },
  contentPadding: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,
    color: Colors.light.tint,
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  eventDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 15,
  },
  commentItem: {
    marginHorizontal: 20,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  commentTime: {
    fontSize: 14,
    color: '#999',
  },
  commentText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});