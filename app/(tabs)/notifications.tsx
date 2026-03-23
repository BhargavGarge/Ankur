import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ArrowLeft, Info, CalendarClock, CircleAlert } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Updates</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false}>
        <View className="mb-10 flex-row items-center gap-3">
          <Bell color="#1B4F72" size={32} />
          <Text className="font-headline italic text-4xl text-primary">Notifications</Text>
        </View>

        <View className="flex-row items-center gap-4 mb-6">
          <Text className="font-sans text-[11px] font-bold tracking-[0.2em] text-outline uppercase">New</Text>
          <View className="h-[1px] flex-1 bg-outline-variant" />
        </View>
        
        <View className="bg-white border text-left border-outline-variant rounded-2xl p-5 mb-3 flex-row gap-4 relative overflow-hidden">
           <View className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#BA7517]" />
           <View className="mt-1 ml-1">
             <CircleAlert color="#BA7517" size={20} />
           </View>
           <View className="flex-1">
             <Text className="font-body text-[15px] font-bold text-primary mb-1">Verify Your Address</Text>
             <Text className="font-body text-[13px] text-on-surface-variant leading-snug mb-2">
               You moved to Berlin 7 days ago. You must complete your Anmeldung (City Registration) within the next 7 days to avoid penalties.
             </Text>
             <Text className="font-sans text-[10px] font-bold tracking-widest uppercase text-outline">2 Hours Ago</Text>
           </View>
        </View>

        <View className="flex-row items-center gap-4 mb-6 mt-6">
          <Text className="font-sans text-[11px] font-bold tracking-[0.2em] text-outline uppercase">Earlier</Text>
          <View className="h-[1px] flex-1 bg-outline-variant" />
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 mb-3 flex-row gap-4 opacity-70">
           <View className="mt-1">
             <CalendarClock color="#1B4F72" size={20} />
           </View>
           <View className="flex-1">
             <Text className="font-body text-[15px] font-bold text-primary mb-1">Appointment Reminder</Text>
             <Text className="font-body text-[13px] text-on-surface-variant leading-snug mb-2">
               Your appointment at the Bürgeramt Mitte is scheduled for tomorrow at 10:30 AM. Don't forget your passport!
             </Text>
             <Text className="font-sans text-[10px] font-bold tracking-widest uppercase text-outline">Yesterday</Text>
           </View>
        </View>

        <View className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 mb-3 flex-row gap-4 opacity-70">
           <View className="mt-1">
             <Info color="#0E6655" size={20} />
           </View>
           <View className="flex-1">
             <Text className="font-body text-[15px] font-bold text-primary mb-1">Welcome to Ankur</Text>
             <Text className="font-body text-[13px] text-on-surface-variant leading-snug mb-2">
               Your profile has been created. Start ticking off items on your checklist to get settled in Germany.
             </Text>
             <Text className="font-sans text-[10px] font-bold tracking-widest uppercase text-outline">Oct 12</Text>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
