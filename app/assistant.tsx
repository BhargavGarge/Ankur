import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Zap, Info, Send, BookOpen } from 'lucide-react-native';

export default function AssistantScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState([
     { id: '1', role: 'user', content: 'My landlord is refusing to give me the Wohnungsgeberbestätigung. What can I do?' },
     { id: '2', role: 'assistant', content: 'That is unfortunately common. Here is what you can do:' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), role: 'user', content: inputText }]);
    setInputText('');
    // Mock response
    setTimeout(() => {
       setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'I am Ankur, a simulated assistant! Please implement Supabase APIs here.' }]);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-container-lowest">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Top Navbar */}
      <View className="bg-white border-b border-outline-variant flex-row justify-between items-center px-4 py-3 z-50">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()} className="text-primary p-1">
            <ArrowLeft color="#1B4F72" size={24} />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <Zap color="#1B4F72" size={20} fill="#1B4F72" />
            <Text className="font-sans font-bold text-primary text-base">Ankur Assistant</Text>
          </View>
        </View>
      </View>

      {/* Context Banner */}
      <View className="w-full bg-[#a5f2db]/30 px-4 py-2 flex-row items-center gap-2 border-b border-outline-variant">
        <Info color="#166a59" size={16} />
        <Text className="text-[12px] font-medium text-[#1f705f] tracking-tight">
          Context: Berlin · Student Visa · Anmeldung task
        </Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false}>
          {messages.map((msg, idx) => (
             msg.role === 'user' ? (
               <View key={msg.id} className="flex-row justify-end mb-8">
                 <View className="max-w-[85%] bg-primary rounded-2xl rounded-tr-none px-4 py-3">
                   <Text className="text-[14px] leading-relaxed font-body text-white">
                     {msg.content}
                   </Text>
                 </View>
               </View>
             ) : (
               <View key={msg.id} className="flex-col gap-4 mb-8">
                 <View className="flex-col max-w-[90%] bg-surface-container-lowest border border-outline-variant rounded-2xl rounded-tl-none overflow-hidden">
                   <View className="px-4 pt-4 pb-2 flex-row items-center gap-2">
                     <View className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                       <Text className="text-white font-headline font-bold text-sm">A</Text>
                     </View>
                     <Text className="text-xs font-bold uppercase tracking-wider text-primary">Ankur</Text>
                   </View>
                   <View className="px-4 py-2">
                     <Text className="text-[14px] leading-relaxed text-on-surface mb-3 font-body">
                       {msg.content}
                     </Text>
                     {idx === 1 && (
                       <View className="space-y-3">
                         <View className="flex-row gap-3 mb-2">
                           <Text className="font-bold text-primary">1.</Text>
                           <Text className="text-[14px] text-on-surface flex-1">Send a written request via email — create a paper trail</Text>
                         </View>
                         <View className="flex-row gap-3 mb-2">
                           <Text className="font-bold text-primary">2.</Text>
                           <Text className="text-[14px] text-on-surface flex-1">Cite §19 BMG — landlords are legally required to provide this</Text>
                         </View>
                         <View className="flex-row gap-3">
                           <Text className="font-bold text-primary">3.</Text>
                           <Text className="text-[14px] text-on-surface flex-1">Contact your local Mieterverein (tenants association) for free legal help</Text>
                         </View>
                       </View>
                     )}
                   </View>
                   {idx === 1 && (
                     <View className="px-4 py-3 border-t border-outline-variant flex-row items-center gap-2" style={{ backgroundColor: 'rgba(243,243,246,0.5)' }}>
                       <BookOpen size={14} color="#166a59" />
                       <Text className="text-[11px] font-bold text-[#166a59] uppercase tracking-widest">
                         Sources: BMG §19, Berlin Bürgeramt
                       </Text>
                     </View>
                   )}
                 </View>
               </View>
             )
          ))}
          <View className="h-20" />
        </ScrollView>

        <View className="w-full px-4 pb-6 pt-2 border-t" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(232,232,232,0.3)' }}>
          <View className="max-w-2xl mx-auto flex-row items-center gap-3 bg-white border border-outline-variant rounded-2xl px-4 py-2 shadow-sm">
            <TextInput 
              className="flex-1 bg-transparent border-none text-[14px] py-3 text-on-surface font-body" 
              placeholder="Ask anything about Germany..." 
              placeholderTextColor="#9ca3af"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity onPress={handleSend} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Send color="#ffffff" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
