import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, ArrowRight, Calendar, PlaneLanding } from 'lucide-react-native';
import { useSupabase } from '../../hooks/useSupabase';
import { useUser } from '@clerk/clerk-expo';

export default function ArrivalScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabase();
  const profile = useAppStore((state) => state.userProfile);
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);

  const [arrivalStatus, setArrivalStatus] = useState<string | null>(profile.arrivalStatus || null);
  const [arrivalDate, setArrivalDate] = useState(profile.arrivalDate || '2023-10-24');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!arrivalStatus || !user) return;
    
    setLoading(true);
    try {
      const supabase = await getAuthenticatedClient();
      
      // Attempt to parse the date if possible, otherwise use a fallback or null
      // The schema expects a 'date' type.
      let dbDate = arrivalDate;
      if (arrivalStatus === 'already_here') {
        dbDate = new Date().toISOString().split('T')[0];
      } else if (isNaN(Date.parse(arrivalDate))) {
        dbDate = new Date().toISOString().split('T')[0];
      }

      const { error } = await supabase
        .from('users')
        .update({ 
          arrival_date: dbDate,
          onboarding_complete: true
        })
        .eq('id', user.id);

      if (error) throw error;

      updateUserProfile({ arrivalStatus, arrivalDate, onboardingComplete: true });
      router.push('/onboarding/preview' as any);
    } catch (err: any) {
      console.error('Error syncing arrival:', err);
      Alert.alert('Error', 'Failed to save your selection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        {/* TopAppBar Shell */}
        <View className="z-50 flex-row justify-between items-center px-6 h-16 bg-white border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full">
            <ArrowLeft color="#003857" size={24} />
          </TouchableOpacity>
          <View className="absolute left-0 right-0 items-center pointer-events-none">
            <Text style={{ fontFamily: 'Fraunces' }} className="text-2xl font-bold text-[#003857] tracking-tight">
              ANKUR
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/onboarding/preview' as any)}>
            <Text className="font-sans text-sm font-medium text-gray-500 px-4 py-2">
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator - 100% */}
        <View className="w-full h-1 bg-gray-100">
          <View className="h-full bg-[#003857] w-full" style={{ width: '100%' }} />
        </View>

        {/* Main Content Canvas */}
        <ScrollView className="flex-1 px-6 pt-12 max-w-xl mx-auto w-full" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
          
          {/* Headline Section */}
          <View className="mb-12 items-center text-center">
            <Text className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#003857]/60 mb-3">
              Step 6 of 6
            </Text>
            <Text style={{ fontFamily: 'Fraunces' }} className="text-4xl leading-tight text-[#003857] italic font-semibold text-center">
              When did you arrive?
            </Text>
          </View>

          {/* Selection Cards Grid */}
          <View className="flex-col mb-12" style={{ gap: 16 }}>
            {/* Already Here Card */}
            <TouchableOpacity 
              onPress={() => setArrivalStatus('already_here')}
              className={`p-8 border-2 rounded-2xl bg-white items-center text-center transition-all ${
                arrivalStatus === 'already_here' ? 'border-[#003857] bg-[#003857]/5' : 'border-gray-100'
              }`}
            >
              <Text style={{ fontFamily: 'Fraunces' }} className="text-2xl text-[#003857] font-medium mb-2">
                I'm already here
              </Text>
              <Text className="font-sans text-gray-500">I have landed in my new home</Text>
            </TouchableOpacity>

            {/* Arriving Soon Card */}
            <TouchableOpacity 
              onPress={() => setArrivalStatus('arriving_soon')}
              className={`p-8 border-2 rounded-2xl bg-white items-center text-center transition-all ${
                arrivalStatus === 'arriving_soon' ? 'border-[#003857] bg-[#003857]/5' : 'border-gray-100'
              }`}
            >
              <Text style={{ fontFamily: 'Fraunces' }} className="text-2xl text-[#003857] font-medium mb-2">
                Arriving soon
              </Text>
              <Text className="font-sans text-gray-500">I'm planning my move or in transit</Text>
            </TouchableOpacity>
          </View>

          {/* Date Picker Section */}
          {arrivalStatus === 'arriving_soon' && (
            <View className="mb-12 items-center">
              <Text className="font-sans text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">
                Select Date
              </Text>
              <View className="flex-row items-center justify-center py-4 border-b border-gray-200" style={{ gap: 16 }}>
                <Calendar color="#003857" size={24} />
                <TextInput 
                  value={arrivalDate}
                  onChangeText={setArrivalDate}
                  className="font-sans text-2xl text-[#003857] font-medium text-center bg-transparent border-0 p-0 m-0"
                  placeholder="Select date"
                  placeholderTextColor="#d1d5db"
                />
              </View>
              <Text className="text-xs text-gray-400 italic text-center mt-4">
                Your checklist will be tailored to this timeline.
              </Text>
            </View>
          )}

          {/* Decorative Info Section */}
          <View className="rounded-2xl bg-gray-50 p-10 flex-col items-center text-center border border-gray-100">
            <View className="w-20 h-20 rounded-full bg-white flex-col items-center justify-center mb-6 shadow-sm border border-gray-100">
              <PlaneLanding color="#166a59" size={32} />
            </View>
            <Text style={{ fontFamily: 'Fraunces' }} className="text-xl text-[#003857] font-medium mb-3">
              Ready to Start?
            </Text>
            <Text className="font-sans text-sm text-gray-600 leading-relaxed text-center" style={{ maxWidth: 260 }}>
              We'll generate a personalized archival guide for your first 90 days in Germany.
            </Text>
          </View>
        </ScrollView>

        {/* Fixed Bottom Action Shell */}
        {arrivalStatus && (
          <View className="absolute bottom-0 left-0 w-full p-6 pb-12 bg-white/90 items-center justify-center border-t border-gray-100">
            <TouchableOpacity 
              onPress={handleContinue}
              disabled={loading}
              className={`w-full max-w-xl bg-[#003857] py-5 rounded-2xl flex-row items-center justify-center ${loading ? 'opacity-70' : ''}`}
              style={{ shadowColor: '#003857', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text style={{ fontFamily: 'Fraunces' }} className="text-xl font-medium tracking-wide text-white mr-3">
                    Build My Checklist
                  </Text>
                  <ArrowRight color="#ffffff" size={24} />
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
