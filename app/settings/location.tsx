import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';

const cities = ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Stuttgart', 'Düsseldorf'];

export default function LocationSettingsScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.userProfile);
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);
  
  const [selectedCity, setSelectedCity] = useState<string | null>(profile.city || null);

  const handleSave = () => {
    if (selectedCity) {
      updateUserProfile({ city: selectedCity });
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Change City</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false}>
        <View className="mb-10">
          <Text className="font-headline italic text-4xl text-primary mb-3">Your Location</Text>
          <Text className="font-body text-base text-on-surface-variant leading-relaxed">
            Update your jurisdiction to fetch the correct local office addresses and registration forms.
          </Text>
        </View>

        <View className="mb-8">
          {cities.map((city) => {
             const isSelected = selectedCity === city;
             return (
               <TouchableOpacity 
                 key={city}
                 onPress={() => setSelectedCity(city)}
                 className={`w-full text-left rounded-xl p-5 flex-row items-center transition-all border ${
                   isSelected ? 'bg-selection-bg border-primary border-2' : 'bg-white border-outline-variant'
                 } mb-3`}
               >
                 <View className="flex-1 pr-4">
                   <Text className="font-body text-base font-bold text-primary">{city}</Text>
                 </View>
                 <View className={`w-6 h-6 rounded-full border items-center justify-center ${isSelected ? 'border-primary' : 'border-outline-variant'}`}>
                   {isSelected && <CheckCircle2 color="#1B4F72" size={20} />}
                 </View>
               </TouchableOpacity>
             );
          })}
        </View>
        <View className="h-10" />
      </ScrollView>

      {/* Sticky Footer */}
      <View className="absolute bottom-0 w-full px-6 pt-4 pb-12 bg-white border-t border-outline-variant">
        <Button 
          label="Save Changes" 
          onPress={handleSave} 
          disabled={!selectedCity || selectedCity === profile.city}
        />
      </View>
    </SafeAreaView>
  );
}
