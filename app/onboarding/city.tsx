import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react-native';
import { useSupabase } from '../../hooks/useSupabase';
import { useUser } from '@clerk/clerk-expo';

const cities = [
  { id: 'Berlin', name: 'Berlin', emoji: '🇩🇪' },
  { id: 'Munich', name: 'Munich', emoji: '🇩🇪' },
  { id: 'Stuttgart', name: 'Stuttgart', emoji: '🇩🇪' },
  { id: 'Hamburg', name: 'Hamburg', emoji: '🇩🇪' },
  { id: 'Cologne', name: 'Cologne', emoji: '🇩🇪' },
  { id: 'Frankfurt', name: 'Frankfurt', emoji: '🇩🇪' },
  { id: 'Dusseldorf', name: 'Dusseldorf', emoji: '🇩🇪' },
  { id: 'Aachen', name: 'Aachen', emoji: '🇩🇪' },
];

export default function CityScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabase();
  const profile = useAppStore((state) => state.userProfile);
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);

  const [selectedCity, setSelectedCity] = useState<string | null>(profile.city || null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedCity || !user) return;
    
    setLoading(true);
    try {
      const supabase = await getAuthenticatedClient();
      
      const { error } = await supabase
        .from('users')
        .update({ city: selectedCity })
        .eq('id', user.id);

      if (error) throw error;

      updateUserProfile({ city: selectedCity });
      router.push('/onboarding/visa' as any);
    } catch (err: any) {
      console.error('Error syncing city:', err);
      Alert.alert('Error', 'Failed to save your selection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navigation Anchor */}
      <View className="z-50 flex-row justify-between items-center px-6 h-16 bg-white border-b border-[#E8E8E8]">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full -ml-3">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Fraunces' }} className="text-2xl font-bold text-[#1B4F72] uppercase tracking-tight">
          ANKUR
        </Text>
        <View className="w-10" />
      </View>

      {/* Main Content Canvas */}
      <ScrollView className="flex-1 px-6 pt-10 pb-32 max-w-xl mx-auto w-full" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        
        {/* Progress Bar (66%) */}
        <View className="w-full bg-surface-container-low h-1.5 rounded-full mb-12 overflow-hidden border border-[#E8E8E8]">
          <View className="bg-[#1B4F72] h-full" style={{ width: '66%' }} />
        </View>

        {/* Editorial Hero Section */}
        <View className="items-center mb-10">
          <Text style={{ fontFamily: 'Fraunces' }} className="italic text-[32px] leading-tight text-[#1B4F72] mb-4 text-center">
            Which city are you in?
          </Text>
          <Text className="font-sans text-slate-500 tracking-wide text-sm text-center" style={{ maxWidth: 280 }}>
            We'll tailor your relocation guide to your specific destination.
          </Text>
        </View>

        {/* Modern City Grid (2-column) */}
        <View className="w-full flex-row flex-wrap justify-between mb-8">
          {cities.map((city) => {
            const isSelected = selectedCity === city.id;
            return (
              <TouchableOpacity
                key={city.id}
                onPress={() => setSelectedCity(city.id)}
                className={`flex-row items-center justify-between px-5 py-4 border rounded-full mb-4 ${
                  isSelected ? 'border-[#1B4F72] bg-surface-container-low' : 'border-[#E8E8E8] bg-white'
                }`}
                style={{ width: '48%' }}
              >
                <Text className="font-sans font-medium text-[#1B4F72]">{city.name}</Text>
                <Text className="text-lg">{city.emoji}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Secondary Action */}
        <TouchableOpacity className="flex-row items-center gap-2 mb-12">
          <Text className="font-sans font-bold text-sm text-[#1B4F72] tracking-wider uppercase">
            Other city
          </Text>
          <ArrowRight color="#1B4F72" size={16} />
        </TouchableOpacity>

        {/* Aesthetic Map Inset (Editorial style) */}
        <View className="w-full rounded-[24px] overflow-hidden border border-[#E8E8E8] relative h-40 bg-slate-100 justify-end p-6">
           <View className="absolute inset-0 bg-white/40" />
           <View className="relative z-10">
             <Text style={{ fontFamily: 'Fraunces' }} className="italic text-base text-[#1B4F72]">
               Exploring the Heart of Europe
             </Text>
             <Text className="font-sans text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">
               Destination: Germany
             </Text>
           </View>
        </View>
      </ScrollView>

      {/* Bottom Action Anchor */}
      {selectedCity && (
        <View className="absolute bottom-0 left-0 w-full p-6 pb-12 border-t border-[#E8E8E8] bg-white/95 items-center">
          <TouchableOpacity 
            onPress={handleContinue}
            disabled={loading}
            className={`w-full max-w-xl py-5 bg-[#003857] rounded-full flex-row items-center justify-center shadow-lg ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-sans font-bold uppercase tracking-[0.15em] mr-2">
                  Next step
                </Text>
                <ChevronRight color="#ffffff" size={20} />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
