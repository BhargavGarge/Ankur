import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Clock, MapPin, ExternalLink, CalendarDays } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';

export default function OfficeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Office Info</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false}>
        <View className="mb-10">
          <Text className="font-headline italic text-4xl text-primary mb-3">Bürgeramt Mitte</Text>
          <Text className="font-body text-base text-on-surface-variant leading-relaxed mb-6">
            The central citizen's registration office. Appointments are strictly required.
          </Text>
        </View>

        <View className="bg-white border border-outline-variant rounded-2xl mb-8 overflow-hidden">
           <View className="p-5 border-b border-outline-variant flex-row gap-4 items-start">
             <MapPin color="#1B4F72" size={20} className="mt-1" />
             <View>
               <Text className="font-body font-bold text-primary mb-1">Address</Text>
               <Text className="font-body text-[14px] text-on-surface-variant">Karl-Marx-Allee 31</Text>
               <Text className="font-body text-[14px] text-on-surface-variant">10178 Berlin</Text>
             </View>
           </View>

           <View className="p-5 border-b border-outline-variant flex-row gap-4 items-start bg-surface-container-lowest">
             <Clock color="#0E6655" size={20} className="mt-1" />
             <View>
               <Text className="font-body font-bold text-primary mb-1">Opening Hours</Text>
               <Text className="font-body text-[14px] text-on-surface-variant mb-1">Mon: 08:00 - 15:00</Text>
               <Text className="font-body text-[14px] text-on-surface-variant mb-1">Tue: 11:00 - 18:00</Text>
               <Text className="font-body text-[14px] text-on-surface-variant">Wed - Fri: 08:00 - 13:00</Text>
             </View>
           </View>
        </View>

        <View className="flex-row items-center gap-4 mb-6">
          <Text className="font-sans text-[11px] font-bold tracking-[0.2em] text-outline uppercase">Actions</Text>
          <View className="h-[1px] flex-1 bg-outline-variant" />
        </View>

        <View className="mb-4">
          <Button 
            label="Book Appointment" 
            iconSuffix={<CalendarDays color="white" size={16} />}
            onPress={() => {}} 
          />
        </View>
        
        <View className="mb-10">
          <Button 
            label="Open in Google Maps" 
            variant="ghost"
            iconSuffix={<ExternalLink color="#1B4F72" size={16} />}
            onPress={() => {}} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
