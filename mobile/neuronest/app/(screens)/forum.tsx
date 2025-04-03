import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  image: any; // In a real app, you'd use a proper image source type
};

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Sensory-Friendly Movie Night',
    description: 'A special screening with adjusted sound and lighting for children with sensory sensitivities.',
    location: 'The Grand Cinema, 123 Main St, New York, NY',
    date: 'April 15, 2025',
    time: '4:00 PM',
    image: require('../../assets/images/movie_night.png'), // Replace with appropriate images later
  },
  {
    id: '2',
    title: 'Autism Support Group Meeting',
    description: 'Monthly meeting for parents to share experiences and resources.',
    location: 'Community Center, 456 Oak Ave, San Francisco, CA',
    date: 'April 20, 2025',
    time: '6:30 PM',
    image: require('../../assets/images/support_group.jpeg'),
  },
  {
    id: '3',
    title: 'Inclusive Playground Meetup',
    description: 'Get together at the new inclusive playground designed for children of all abilities.',
    location: 'Sunshine Park, 789 Park Rd, Seattle, WA',
    date: 'May 1, 2025',
    time: '10:00 AM',
    image: require('../../assets/images/playground.jpeg'),
  },
  {
    id: '4',
    title: 'Special Needs Resource Fair',
    description: 'Connect with local organizations and specialists offering services for children with autism.',
    location: 'Convention Center, 321 Event Blvd, Phoenix, AZ',
    date: 'May 8, 2025',
    time: '9:00 AM - 3:00 PM',
    image: require('../../assets/images/resource_fair.jpeg'),
  },
];

export default function ForumScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Forum</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      
      <FlatList
        data={sampleEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} />
        )}
        style={styles.eventList}
        contentContainerStyle={styles.eventListContent}
      />
    </View>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => router.push({
        pathname: '/(screens)/event-detail',
        params: { id: event.id }
      })}
    >
      <Image source={event.image} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>{event.date} • {event.time}</Text>
        <Text style={styles.eventLocation}>{event.location}</Text>
        <Text numberOfLines={2} style={styles.eventDescription}>{event.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
    color: Colors.light.tint,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  placeholder: {
    width: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  eventList: {
    flex: 1,
  },
  eventListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.light.text,
  },
  eventDate: {
    fontSize: 14,
    color: Colors.light.tint,
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});