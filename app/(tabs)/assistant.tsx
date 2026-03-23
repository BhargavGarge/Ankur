import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Zap, Trash2, Info, BookOpen, Send } from 'lucide-react-native';

export default function AssistantScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [lang, setLang] = useState('English');

  return (
    <SafeAreaView className="flex-1 bg-white overflow-hidden" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* TopAppBar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-[#E8E8E8] z-50">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()} className="text-[#1B4F72]">
             <ArrowLeft color="#1B4F72" size={24} />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <Zap color="#1B4F72" size={20} fill="#1B4F72" />
            <Text className="font-sans font-bold text-[#1B4F72] text-base">
               Ankur Assistant
            </Text>
          </View>
        </View>
        <TouchableOpacity className="text-slate-500">
           <Trash2 color="#64748b" size={24} />
        </TouchableOpacity>
      </View>

      {/* Context Banner */}
      <View className="w-full bg-[#a5f2db]/30 px-4 py-2 flex-row items-center gap-2 border-b border-[#E8E8E8]">
         <Info color="#166a59" size={16} />
         <Text className="text-[12px] font-medium text-[#1f705f] tracking-tight">
            Context: Berlin · Student Visa · Anmeldung task
         </Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Main Chat Area */}
        <ScrollView className="flex-1 px-4 pt-6 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          
          <View className="flex-col gap-8 pb-8">
            {/* User Message */}
            <View className="flex-row justify-end">
              <View className="max-w-[85%] bg-primary rounded-2xl p-4" style={{ borderTopRightRadius: 4 }}>
                 <Text className="text-[14px] leading-relaxed font-medium text-white font-sans">
                   My landlord is refusing to give me the Wohnungsgeberbestätigung. What can I do?
                 </Text>
              </View>
            </View>

            {/* AI Message Column */}
            <View className="flex-col gap-4">
              {/* AI Response Card */}
              <View className="max-w-[90%] bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden" style={{ borderTopLeftRadius: 4 }}>
                 <View className="px-4 pt-4 pb-2 flex-row items-center gap-2">
                    <View className="w-8 h-8 rounded-full bg-primary flex-col items-center justify-center">
                       <Text style={{ fontFamily: 'Fraunces' }} className="text-white font-bold text-sm">A</Text>
                    </View>
                    <Text className="text-xs font-bold uppercase tracking-wider text-primary font-sans">
                       Ankur
                    </Text>
                 </View>
                 <View className="px-4 py-2 flex-col">
                    <Text className="text-[14px] leading-relaxed text-on-surface mb-3 font-sans">
                      That is unfortunately common. Here is what you can do:
                    </Text>
                    
                    <View className="flex-col" style={{ gap: 12 }}>
                       <View className="flex-row gap-3 pr-4">
                          <Text className="font-bold text-primary font-sans">1.</Text>
                          <Text className="text-[14px] text-on-surface font-sans">Send a written request via email — create a paper trail</Text>
                       </View>
                       <View className="flex-row gap-3 pr-4">
                          <Text className="font-bold text-primary font-sans">2.</Text>
                          <Text className="text-[14px] text-on-surface font-sans">Cite §19 BMG — landlords are legally required to provide this</Text>
                       </View>
                       <View className="flex-row gap-3 pr-4">
                          <Text className="font-bold text-primary font-sans">3.</Text>
                          <Text className="text-[14px] text-on-surface font-sans">Contact your local Mieterverein (tenants association) for free legal help</Text>
                       </View>
                    </View>
                 </View>
                 
                 <View className="px-4 py-3 bg-[#f3f3f6]/50 border-t border-[#E8E8E8] flex-row items-center gap-2 mt-2">
                    <BookOpen color="#166a59" size={14} />
                    <Text className="text-[11px] font-semibold text-[#166a59] uppercase tracking-widest font-sans">
                       Sources: BMG §19, Berlin Bürgeramt
                    </Text>
                 </View>
              </View>

              {/* Language Toggle Pill */}
              <View className="flex-row items-center gap-3 px-1">
                 <Text className="text-[12px] font-bold text-slate-500 uppercase tracking-wide font-sans">
                   Reply in:
                 </Text>
                 <View className="flex-row bg-[#edeef0] border border-[#E8E8E8] rounded-full p-1 gap-1">
                    <TouchableOpacity onPress={() => setLang('English')} className={`px-4 py-1 rounded-full ${lang === 'English' ? 'bg-primary' : ''}`}>
                       <Text className={`text-[11px] font-bold uppercase tracking-wider font-sans ${lang === 'English' ? 'text-white' : 'text-slate-500'}`}>
                         English
                       </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLang('Hinglish')} className={`px-4 py-1 rounded-full ${lang === 'Hinglish' ? 'bg-primary' : ''}`}>
                       <Text className={`text-[11px] font-bold uppercase tracking-wider font-sans ${lang === 'Hinglish' ? 'text-white' : 'text-slate-500'}`}>
                         Hinglish
                       </Text>
                    </TouchableOpacity>
                 </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Area */}
        <View className="absolute bottom-0 left-0 w-full px-4 pb-6 pt-4 bg-white border-t border-[#E8E8E8]">
           <View className="max-w-2xl mx-auto flex-row items-center flex-1 gap-3 bg-white border border-[#E8E8E8] rounded-2xl px-4 py-2 shadow-sm">
             <TextInput 
               value={inputText}
               onChangeText={setInputText}
               className="flex-1 bg-transparent text-[14px] font-sans py-2"
               placeholder="Ask anything about Germany..."
               placeholderTextColor="#94a3b8"
             />
             <TouchableOpacity className="w-10 h-10 rounded-full bg-primary flex-col items-center justify-center">
                <Send color="#ffffff" size={18} fill="#ffffff" />
             </TouchableOpacity>
           </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
