import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Sample questionnaire responses - in a real app, these would come from storage/database
const profileAnswers = {
  name: "Mary Johnson",
  image: "https://randomuser.me/api/portraits/women/65.jpg",
  location: "Seattle, WA",
  memberSince: "January 2024",
  questionsAnswered: [
    {
      question: "What are the main challenges you face with your child's communication skills?",
      answer: "My son Alex has difficulty expressing his needs verbally and often gets frustrated when we don't understand him. He's recently started using a communication app which has been helpful."
    },
    {
      question: "What are your child's special interests or talents?",
      answer: "Alex is absolutely fascinated by trains and transportation systems. He can memorize entire bus schedules and has an amazing ability to remember routes. He also loves drawing detailed maps."
    },
    {
      question: "What therapies or interventions have you tried, and which were most effective?",
      answer: "We've tried speech therapy, occupational therapy, and ABA. The occupational therapy has been the most effective for us, especially for sensory processing issues."
    },
    {
      question: "What social situations are most challenging for your child?",
      answer: "Large gatherings with lots of noise are very overwhelming. Birthday parties and family reunions are particularly difficult without proper preparation and breaks."
    },
    {
      question: "What kinds of support are you looking for from this community?",
      answer: "I'm looking for other parents who understand the day-to-day challenges and can share practical advice. I'm also interested in finding inclusive activities in our area."
    }
  ],
  interests: ["Special education advocacy", "Sensory-friendly activities", "Parent support groups"]
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.light.tint} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profileAnswers.image }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileAnswers.name}</Text>
            <Text style={styles.profileLocation}>{profileAnswers.location}</Text>
            <Text style={styles.profileMember}>Member since {profileAnswers.memberSince}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {profileAnswers.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About My Journey</Text>
          
          {profileAnswers.questionsAnswered.map((item, index) => (
            <View key={index} style={styles.questionAnswer}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push('/(screens)/questionaire')}
        >
          <Text style={styles.editButtonText}>Edit Responses</Text>
        </TouchableOpacity>
        
        {/* Add extra space at bottom */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
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
    marginBottom: 24,
    paddingHorizontal: 16,
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
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: Colors.light.icon,
    marginBottom: 2,
  },
  profileMember: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.light.text,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#E8F4F8',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  interestText: {
    color: Colors.light.tint,
    fontSize: 14,
  },
  questionAnswer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 6,
  },
  answer: {
    fontSize: 15,
    color: Colors.light.text,
    lineHeight: 22,
  },
  editButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});