import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';

const DOCS = [
  { id: '1', name: 'Passport or ID Card', detail: 'Must be valid for at least 6 months.' },
  { id: '2', name: 'Wohnungsgeberbestätigung', detail: 'Signed landlord confirmation form.' },
  { id: '3', name: 'Anmeldeformular', detail: 'Completed registration form (signed).' },
  { id: '4', name: 'Visa Documentation', detail: 'Required if non-EU citizen.' }
];

export default function DocumentsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (docId: string) => {
    setChecked(prev => ({...prev, [docId]: !prev[docId]}));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = (completedCount / DOCS.length) * 100;

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Documents</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false}>
        <View className="mb-10">
          <Text className="font-headline italic text-4xl text-primary mb-3">Required Papers</Text>
          <Text className="font-body text-base text-on-surface-variant leading-relaxed mb-6">
            Make sure you have all these documents printed and prepared before your appointment.
          </Text>

          <View
            className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden border"
            style={{ borderColor: 'rgba(232,232,232,0.3)' }}
          >
            <View className="h-full bg-primary" style={{ width: `${progress}%` }} />
          </View>
          <Text className="mt-3 font-sans text-[10px] tracking-widest text-[#BA7517] uppercase font-bold text-right">
            {completedCount} of {DOCS.length} Ready
          </Text>
        </View>

        <View className="mb-10">
          {DOCS.map((doc) => {
             const isChecked = checked[doc.id];
             return (
               <TouchableOpacity
                 key={doc.id}
                 onPress={() => toggleCheck(doc.id)}
                 className="border-b border-outline-variant p-5 flex-row items-center"
                 style={{ backgroundColor: isChecked ? 'rgba(232,241,248,0.3)' : '#ffffff' }}
               >
                 <View className={`w-6 h-6 rounded border items-center justify-center mr-4 ${isChecked ? 'bg-[#0E6655] border-[#0E6655]' : 'border-outline-variant bg-white'}`}>
                   {isChecked && <Check color="#ffffff" size={14} />}
                 </View>
                 <View className="flex-1 pr-4">
                   <Text className={`font-body text-[16px] font-bold mb-1 ${isChecked ? 'text-primary line-through opacity-70' : 'text-primary'}`}>{doc.name}</Text>
                   <Text className={`font-body text-[13px] ${isChecked ? 'text-on-surface-variant opacity-70' : 'text-on-surface-variant'}`}>{doc.detail}</Text>
                 </View>
               </TouchableOpacity>
             )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
