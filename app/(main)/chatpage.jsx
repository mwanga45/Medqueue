import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  Button, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform 
} from 'react-native';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello!', isUser: false, createdAt: new Date() },
    { id: '2', text: 'Hi there!', isUser: true, createdAt: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        createdAt: new Date()
      }]);
      setInputText('');
    }
  };

  const Message = ({ message }) => (
    <View style={[
      styles.messageContainer,
      message.isUser ? styles.userMessage : styles.otherMessage
    ]}>
      <Text style={message.isUser ? styles.userText : styles.otherText}>
        {message.text}
      </Text>
      <Text style={styles.time}>
        {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            onSubmitEditing={handleSend}
            multiline
            blurOnSubmit={false}
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  flex: { flex: 1 },
  listContent: { padding: 16 },
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 2,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 2,
  },
  userText: { color: 'white', fontSize: 16 },
  otherText: { color: 'black', fontSize: 16 },
  time: {
    fontSize: 12,
    color: '#ffffff99',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputWrapper: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
});

export default ChatPage;

/* Additional Features (Uncomment to use):

1. Message Persistence:
useEffect(() => {
  const load = async () => {
    const saved = await AsyncStorage.getItem('chat');
    if (saved) setMessages(JSON.parse(saved));
  };
  load();
}, []);

useEffect(() => {
  AsyncStorage.setItem('chat', JSON.stringify(messages));
}, [messages]);

2. Real-time Updates:
useEffect(() => {
  const ws = new WebSocket('wss://yourserver.com');
  ws.onmessage = (e) => {
    setMessages(prev => [...prev, JSON.parse(e.data)]);
  };
  return () => ws.close();
}, []);

3. Image Support:
// Add to inputWrapper:
<TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
  <Text>📷</Text>
</TouchableOpacity>

// Handle image selection and add to messages
*/