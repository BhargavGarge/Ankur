import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Heart, ArrowLeft, ExternalLink } from 'lucide-react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">About</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center py-10 mb-6">
          <View className="w-24 h-24 bg-selection-bg rounded-full mb-6 items-center justify-center border" style={{ borderColor: 'rgba(27,79,114,0.2)' }}>
            <Text className="font-headline italic text-5xl text-primary -translate-y-[2px]">A</Text>
          </View>
          <Text className="font-headline text-2xl text-primary font-bold tracking-tight mb-2">Ankur</Text>
          <Text className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#BA7517]">Version 1.0.0</Text>
        </View>

        <View className="flex-row items-center gap-4 mb-6">
          <Text className="font-sans text-[11px] font-bold tracking-[0.2em] text-outline uppercase">Our Story</Text>
          <View className="h-[1px] flex-1 bg-outline-variant" />
        </View>
        <Text className="font-body text-base text-on-surface-variant mb-10 leading-relaxed">
          Relocating to Germany is meant to be exciting, but the overwhelming bureaucracy often turns the dream into a stressful ordeal. 
          {'\n\n'}
          Ankur was built to simplify this transition—translating complex and stressful checklists into clear, actionable steps for students and professionals.
        </Text>

        <View className="flex-row items-center gap-4 mb-6">
          <Text className="font-sans text-[11px] font-bold tracking-[0.2em] text-outline uppercase">Open Source</Text>
          <View className="h-[1px] flex-1 bg-outline-variant" />
        </View>
        <Text className="font-body text-base text-on-surface-variant mb-8 leading-relaxed">
          Our checklists and guides are globally open source. We profoundly believe that critical information for immigrants should be free, accessible, and community-driven. 
        </Text>

        <TouchableOpacity className="bg-white border text-left border-outline-variant rounded-2xl p-5 flex-row items-center mb-10 w-full justify-between">
           <Text className="font-body text-primary font-bold">Contribute on GitHub</Text>
           <ExternalLink color="#1B4F72" size={20} />
        </TouchableOpacity>

        <View className="flex-row items-center justify-center bg-surface-container-low p-6 rounded-2xl border" style={{ borderColor: 'rgba(232,232,232,0.5)' }}>
          <Text className="font-body text-sm font-medium text-on-surface-variant mr-2">Built with </Text>
          <Heart color="#0E6655" size={16} fill="#0E6655" />
          <Text className="font-body text-sm font-medium text-on-surface-variant ml-2"> for Expats</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
