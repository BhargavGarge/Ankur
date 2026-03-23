import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, Check, Share, ArrowRight } from 'lucide-react-native';

export default function TaskCompleteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white relative" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-6 h-16 w-full bg-white border-b border-[#E8E8E8] z-50">
        <TouchableOpacity onPress={() => router.push('/(tabs)')} className="p-2 -ml-2 text-slate-500">
           <X color="#64748b" size={24} />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Newsreader' }} className="text-2xl font-bold text-[#1B4F72]">
           Task Complete
        </Text>
        <View className="w-8" /> {/* Spacer */}
      </View>

      <ScrollView className="flex-1 w-full max-w-md mx-auto px-6 py-8 flex-col" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        
        {/* Celebration Animation Area */}
        <View className="relative w-full h-64 flex-col items-center justify-center overflow-visible">
          {/* Confetti Pseudo Elements */}
          <View className="absolute inset-0 z-0 opacity-80" pointerEvents="none">
            <View className="absolute w-2 h-4 rounded-sm bg-[#1B4F72] top-0 left-1/4" style={{ transform: [{ rotate: '12deg' }] }} />
            <View className="absolute w-2 h-4 rounded-sm bg-[#166a59] top-10 right-1/4" style={{ transform: [{ rotate: '-45deg' }] }} />
            <View className="absolute w-2 h-2 rounded-full bg-[#BA7517] top-5 left-1/3" style={{ transform: [{ rotate: '12deg' }] }} />
            <View className="absolute w-2 h-4 rounded-sm bg-[#1B4F72] bottom-10 left-10" style={{ transform: [{ rotate: '90deg' }] }} />
            <View className="absolute w-2 h-4 rounded-sm bg-[#166a59] top-20 right-10" style={{ transform: [{ rotate: '12deg' }] }} />
            <View className="absolute w-2 h-4 rounded-sm bg-[#BA7517] bottom-0 left-1/2" style={{ transform: [{ rotate: '-12deg' }] }} />
            <View className="absolute w-4 h-4 rounded-sm bg-[#1B4F72] top-5 right-1/3" style={{ transform: [{ rotate: '45deg' }] }} />
          </View>

          <View className="z-10 bg-[#0E6655] w-24 h-24 rounded-full flex-col items-center justify-center border-[6px] border-white" style={{ shadowColor: '#c1c7cf', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 3, elevation: 2 }}>
             <Check color="#ffffff" size={48} strokeWidth={3} />
          </View>
          <View className="mt-4">
             <Text style={{ fontFamily: 'Newsreader' }} className="text-[28px] font-bold text-[#1B4F72] tracking-tight text-center">
               Anmeldung
             </Text>
          </View>
        </View>

        {/* Celebration Copy */}
        <View className="items-center mt-6 flex-col">
          <Text style={{ fontFamily: 'Newsreader' }} className="text-[36px] font-bold text-[#1B4F72] leading-tight text-center mb-2">
            Task complete!
          </Text>
          <Text className="text-[16px] italic text-slate-600 leading-relaxed text-center font-sans">
            Germans do it with paperwork. You just proved you can too.
          </Text>
        </View>

        {/* Progress Update Card */}
        <View className="w-full mt-12 bg-white border border-[#E8E8E8] rounded-3xl p-8 items-center justify-center flex-col">
          <Text className="font-sans text-[12px] font-bold tracking-[0.05em] text-slate-500 uppercase mb-4 text-center">
            YOUR PROGRESS
          </Text>
          <View className="flex-row items-baseline justify-center gap-2 mb-1">
            <Text style={{ fontFamily: 'Newsreader' }} className="text-[40px] font-bold text-[#1B4F72] leading-none text-center">
              4 of 10
            </Text>
          </View>
          <Text className="font-sans text-[13px] text-slate-500 mb-6 text-center">tasks completed</Text>
          <View className="w-full h-2.5 bg-[#e7e8ea] rounded-full overflow-hidden mb-4 relative">
             <View className="absolute left-0 top-0 h-full bg-[#1B4F72] rounded-full" style={{ width: '40%' }} />
          </View>
          <Text className="font-sans text-[13px] text-slate-500 text-center">
            You are doing amazingly. 6 more to go.
          </Text>
        </View>

        {/* Next Task Prompt */}
        <View className="w-full mt-10">
          <View className="flex-row flex items-center gap-2 mb-3">
            <Text className="font-sans text-[12px] font-bold text-[#1B4F72]">
              Up next →
            </Text>
          </View>
          <View className="bg-white border border-[#E8E8E8] rounded-xl p-5 relative overflow-hidden" style={{ borderLeftWidth: 3, borderLeftColor: '#1B4F72' }}>
             <View className="flex-col pr-8 mb-4">
               <Text className="font-sans text-[16px] font-bold text-[#2E3132] mb-1">
                 Open a German bank account
               </Text>
               <Text className="font-sans text-[13px] text-slate-500">
                 You will need your Anmeldung certificate for this.
               </Text>
             </View>
             <TouchableOpacity className="flex-row justify-end items-center gap-1">
                <Text className="font-sans text-[13px] font-bold text-[#1B4F72]">
                  Start this task
                </Text>
                <ArrowRight color="#1B4F72" size={14} />
             </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 p-6 flex-col max-w-md mx-auto w-full z-40 border-t border-transparent" style={{ gap: 12 }}>
         <TouchableOpacity className="w-full flex-row items-center justify-center gap-2 h-12 border border-[#1B4F72] rounded-2xl bg-white">
            <Share color="#1B4F72" size={20} />
            <Text className="text-[#1B4F72] font-sans font-semibold text-[14px]">
              Share your progress
            </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => router.push('/(tabs)/checklist')} className="w-full bg-[#1B4F72] rounded-2xl h-14 flex-row items-center justify-center">
            <Text className="text-white font-sans font-bold text-[16px]">
              Continue
            </Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
