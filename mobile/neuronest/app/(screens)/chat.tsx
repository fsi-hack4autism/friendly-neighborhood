import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// Define interfaces for message types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'friend';
  timestamp: string;
}

export default function ChatScreen() {
  const { name, image } = useLocalSearchParams();
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi Mary! How are you doing today?',
      sender: 'friend',
      timestamp: '10:03 AM'
    },
    {
      id: '2',
      text: "I'm doing well, thanks for asking! How about you?",
      sender: 'user',
      timestamp: '10:05 AM'
    },
    {
      id: '3',
      text: "Great! I was wondering if you'd like to join our community playdate this weekend?",
      sender: 'friend',
      timestamp: '10:07 AM'
    },
    {
      id: '4',
      text: 'That sounds wonderful! What time and where?',
      sender: 'user',
      timestamp: '10:10 AM'
    },
    {
      id: '5',
      text: "It's at Sunshine Park, Saturday at 2pm. Several families from the support group will be there.",
      sender: 'friend',
      timestamp: '10:12 AM'
    },
  ]);

  const sendMessage = () => {
    if (inputMessage.trim().length === 0) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
  };
  
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'user' ? styles.userMessage : styles.friendMessage
    ]}>
      <Text style={[
        styles.messageText,
        { color: item.sender === 'user' ? '#fff' : '#333' }
      ]}>
        {item.text}
      </Text>
      <Text style={[
        styles.timestamp,
        { color: item.sender === 'user' ? 'rgba(255,255,255,0.7)' : '#999' }
      ]}>
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <Stack.Screen
        options={{
          title: name as string,
          headerRight: () => (
            <Image
              source={{ uri: image as string }}
              style={styles.headerProfileImage}
            />
          ),
        }}
      />
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted={false}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
          style={styles.textInput}
          multiline
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerProfileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: Colors.light.tint,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  friendMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: Colors.light.tint,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});