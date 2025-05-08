import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { apiurl } from "./request_response";
import {useRouter} from "expo-router"

const API_URL = apiurl+'chatbot'; 
const ChatPage = () => {
  const router = useRouter()
  const [messages, setMessages] = useState([{
    id: '1',
    text: 'Hello! Welcome to Coding Money. My name is Sam. What\'s your name?',
    isUser: false,
    createdAt: new Date()
  }]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    try {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        createdAt: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setLoading(true);

      // Send to backend using Axios
      const response = await axios.post(API_URL, {
        userInput: inputText
      });

      // Add bot response
      const botMessage = {
        id: Date.now().toString() + '-bot',
        text: response.data.response,
        isUser: false,
        createdAt: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'Sorry, there was an error processing your request';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network error - please check your connection';
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString() + '-error',
        text: errorMessage,
        isUser: false,
        createdAt: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const Message = ({ message }) => (
    <View style={[
      styles.messageContainer,
      message.isUser ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={message.isUser ? styles.userText : styles.botText}>
        {message.text}
      </Text>
      <Text style={styles.time}>
        {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    
    <SafeAreaView style={styles.container}>
      <View style ={styles.header}>
      <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={50} color="black" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Message message={item} />}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask your  question..."
            placeholderTextColor="#888"
            onSubmitEditing={handleSend}
            multiline
            blurOnSubmit={false}
            editable={!loading}
          />
          <TouchableOpacity 
            style={[styles.sendButton, (!inputText.trim() || loading) && styles.disabledButton]}
            onPress={handleSend}
            disabled={!inputText.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="send" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* <Navigationbar/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop:22,
  },
  flex: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  botText: {
    color: '#333',
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  header: {
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:12
  },
  backButton: {
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
    width:50,
    height:50,
    borderRadius:"50%",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
});

export default ChatPage;