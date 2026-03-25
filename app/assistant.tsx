import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Zap, Info, Send } from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';

/**
 * DEBUGGING TIP:
 * 1. If testing on Android Emulator: Use "http://10.0.2.2:3000/assistant"
 * 2. If testing on iOS Simulator: Use "http://localhost:3000/assistant"
 * 3. If testing on Physical Phone: Use your Computer's IP (e.g., "http://192.168.1.5:3000/assistant")
 * 4. If using the Cloud Backend: Use the "ais-dev..." URL below.
 */
const SERVER_URL = "http://localhost:3000/assistant";

export default function AssistantScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.userProfile) || {};
  const userTasks = useAppStore((state) => state.userTasks) || {};

  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', content: `Hello ${profile.name || 'there'}! I'm Ankur. How can I help you?` }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  // Auto-scroll logic
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isLoading]);

  const getContextStr = () => {
    try {
      const completed = Object.values(userTasks).filter((t: any) => t?.status === 'done').length;
      return `User: ${profile.name}, City: ${profile.city}, Progress: ${completed} tasks done.`;
    } catch (e) { return "Context unavailable"; }
  };

  const askAssistant = async (question: string, currentHistory: any[]) => {
    console.log("📡 Sending request to:", SERVER_URL);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          question,
          language: "English",
          context: getContextStr(),
          history: currentHistory.map(m => ({
            role: m.role,
            content: m.content
          })).slice(-6)
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server Error ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ AI Replied successfully");
      return data.answer;
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("❌ Fetch Error:", error.message);
      throw error;
    }
  };

  const handleSend = async () => {
    console.log("Btn Pressed. Input:", inputText);
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim()
    };

    // 1. Update UI immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      // 2. Call AI with the updated list
      const aiReply = await askAssistant(currentInput, updatedMessages);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiReply
      }]);
    } catch (err: any) {
      Alert.alert("Connection Error", "Could not reach Ankur. Check your internet or SERVER_URL.\n\n" + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-4 py-3 border-b border-slate-100 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()}><ArrowLeft color="#1B4F72" size={24} /></TouchableOpacity>
        <Zap color="#1B4F72" size={20} fill="#1B4F72" />
        <Text className="font-bold text-[#1B4F72] text-lg">Ankur Assistant</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4 pt-4"
          keyboardShouldPersistTaps="always" // CRITICAL FIX: Allows tapping button while keyboard is up
        >
          {messages.map((msg) => (
            <View key={msg.id} className={`mb-6 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <View className={`max-w-[85%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-[#1B4F72] rounded-tr-none' : 'bg-slate-100 rounded-tl-none'}`}>
                <Text className={`${msg.role === 'user' ? 'text-white' : 'text-slate-800'} text-[14px]`}>{msg.content}</Text>
              </View>
            </View>
          ))}

          {isLoading && (
            <View className="flex-row items-center gap-2 mb-8">
              <ActivityIndicator size="small" color="#1B4F72" />
              <Text className="text-xs italic text-slate-400">Ankur is thinking...</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View className="p-4 border-t border-slate-100 bg-white">
          <View className="flex-row items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4">
            <TextInput
              className="flex-1 py-3 text-slate-800"
              placeholder="Ask anything..."
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend} // Allows pressing "Enter" on keyboard
              multiline={false}
            />
            <TouchableOpacity
              onPress={() => {
                console.log("Send icon clicked");
                handleSend();
              }}
              disabled={!inputText.trim() || isLoading}
              style={{ opacity: (!inputText.trim() || isLoading) ? 0.5 : 1 }}
            >
              <View className="w-10 h-10 rounded-full bg-[#1B4F72] items-center justify-center">
                <Send color="#ffffff" size={18} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}