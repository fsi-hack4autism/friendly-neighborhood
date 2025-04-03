import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Question = {
  id: string;
  text: string;
  answer: string;
};

const initialQuestions: Question[] = [
  {
    id: '1',
    text: 'What are the main challenges you face with your child\'s communication skills?',
    answer: '',
  },
  {
    id: '2',
    text: 'What strategies have helped your child with sensory sensitivities?',
    answer: '',
  },
  {
    id: '3',
    text: 'What routines are important for your child\'s daily schedule?',
    answer: '',
  },
  {
    id: '4',
    text: 'What therapies or interventions have you tried, and which were most effective?',
    answer: '',
  },
  {
    id: '5',
    text: 'What are your child\'s special interests or talents?',
    answer: '',
  },
  {
    id: '6',
    text: 'What social situations are most challenging for your child?',
    answer: '',
  },
  {
    id: '7',
    text: 'What resources in your community have been most helpful?',
    answer: '',
  },
  {
    id: '8',
    text: 'What would you like other parents to know about your experience?',
    answer: '',
  },
  {
    id: '9',
    text: 'What are your biggest concerns for your child\'s future?',
    answer: '',
  },
  {
    id: '10',
    text: 'What kinds of support are you looking for from this community?',
    answer: '',
  },
];

export default function QuestionaireScreen() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const handleAnswerChange = (id: string, answer: string) => {
    setQuestions(
      questions.map(q => q.id === id ? { ...q, answer } : q)
    );
  };

  const handleSave = () => {
    // In a real app, this would save to a database or storage
    console.log('Saving answers:', questions);
    // Return to home screen
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.light.tint} />
        </TouchableOpacity>
        <Text style={styles.title}>Questionaire</Text>
      </View>
      
      <Text style={styles.subtitle}>
        Please answer the following questions to help us better understand your needs
      </Text>
      
      <ScrollView style={styles.scrollView}>
        {questions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.text}</Text>
            <TextInput
              style={styles.answerInput}
              multiline
              placeholder="Your answer..."
              value={question.answer}
              onChangeText={(text) => handleAnswerChange(question.id, text)}
              textAlignVertical="top"
            />
          </View>
        ))}
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Responses</Text>
        </TouchableOpacity>
        
        {/* Add extra space at bottom for keyboard */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.light.text,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});