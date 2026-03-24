import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, GraduationCap, Briefcase, Search, CheckCircle2 } from 'lucide-react-native';
import { useSupabase } from '../../hooks/useSupabase';
import { useUser } from '@clerk/clerk-expo';

const purposes = [
  { id: 'Student', dbId: 'student', title: 'Student', desc: 'Studying at a German university', icon: GraduationCap },
  { id: 'Working Professional', dbId: 'professional', title: 'Working Professional', desc: 'I have a work permit', icon: Briefcase },
  { id: 'Job Seeker', dbId: 'job_seeker', title: 'Job Seeker', desc: 'Looking for work or internships', icon: Search },
];

export default function PurposeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabase();
  const profile = useAppStore((state) => state.userProfile);
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);

  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(profile.purpose || null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedPurpose || !user) return;
    
    setLoading(true);
    try {
      const dbId = purposes.find(p => p.id === selectedPurpose)?.dbId;
      const supabase = await getAuthenticatedClient();
      
      const { error } = await supabase
        .from('users')
        .update({ purpose: dbId })
        .eq('id', user.id);

      if (error) throw error;

      updateUserProfile({ purpose: selectedPurpose });
      router.push('/onboarding/university' as any);
    } catch (err: any) {
      console.error('Error syncing purpose:', err);
      Alert.alert('Error', 'Failed to save your selection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navigation */}
      <View className="z-50 bg-white border-b border-outline-variant">
        <View className="flex-row justify-between items-center px-6 h-16 max-w-2xl mx-auto w-full">
          <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
            <ArrowLeft color="#1B4F72" size={24} />
          </TouchableOpacity>
          <Text className="font-headline text-xl font-bold tracking-tight text-primary uppercase">
            ANKUR
          </Text>
          <TouchableOpacity onPress={() => router.push('/onboarding/university' as any)}>
            <Text className="font-body text-sm font-medium text-on-surface-variant">
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        {/* Progress Bar at 33% */}
        <View className="w-full h-[2px] bg-outline-variant">
          <View className="h-full bg-primary" style={{ width: '33.3%' }} />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-6 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false}>
        <View className="py-10">
          <View className="mb-10">
            <Text className="font-headline text-[32px] leading-tight text-on-surface font-semibold">
              Why are you in Germany?
            </Text>
            <Text className="font-body text-[15px] text-on-surface-variant mt-3 leading-relaxed">
              Select the option that best describes your current visa or residency purpose.
            </Text>
          </View>

          {/* Choice Grid */}
          <View className="flex-col" style={{ gap: 16 }}>
            {purposes.map((p) => {
              const Icon = p.icon;
              const isSelected = selectedPurpose === p.id;
              
              return (
                <TouchableOpacity 
                  key={p.id}
                  onPress={() => setSelectedPurpose(p.id)}
                  activeOpacity={0.9}
                  className={`w-full text-left rounded-xl p-5 flex-row items-center transition-all ${
                     isSelected 
                       ? 'bg-selection-bg border-2 border-primary' 
                       : 'bg-white border-outline-variant border'
                  }`}
                  style={{ gap: 20 }}
                >
                  <View className="w-12 h-12 flex-col items-center justify-center">
                    <Icon color={isSelected ? "#1B4F72" : "#41474e"} size={32} strokeWidth={1.5} />
                  </View>
                  <View className="flex-1">
                    <Text className={`font-body text-[17px] font-bold ${
                      isSelected ? 'text-primary' : 'text-on-surface'
                    }`}>
                      {p.title}
                    </Text>
                    <Text
                      className="font-body text-[14px]"
                      style={{ color: isSelected ? 'rgba(27,79,114,0.7)' : '#41474e' }}
                    >
                      {p.desc}
                    </Text>
                  </View>
                  {isSelected && (
                    <View className="items-center justify-center">
                      <CheckCircle2 color="#1B4F72" size={24} fill="#1B4F72" stroke="#ffffff" />
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Decorative Element */}
          <View className="mt-12 flex-row justify-center pb-20">
            <View className="w-full max-w-xs h-40 bg-slate-50 rounded-2xl overflow-hidden border border-outline-variant opacity-50">
              {/* Optional Placeholder for the image */}
              <View className="flex-1 w-full bg-slate-200 justify-center items-center">
                 <Text className="font-body text-outline-variant font-bold text-xs uppercase tracking-widest">Landscape</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View className="p-6 max-w-2xl mx-auto w-full pb-8 bg-surface">
        <TouchableOpacity 
          onPress={handleContinue}
          disabled={!selectedPurpose || loading}
          className={`w-full py-4 rounded-xl items-center justify-center ${
            selectedPurpose && !loading ? 'bg-primary' : 'bg-surface-variant'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className={`font-body font-bold text-[16px] ${
              selectedPurpose ? 'text-white' : 'text-outline'
            }`}>
              Continue
            </Text>
          )}
        </TouchableOpacity>
        <Text className="text-center mt-4 font-body text-[12px] font-medium uppercase tracking-[0.1em] text-on-surface-variant opacity-60">
          Step 2 of 6
        </Text>
      </View>

    </SafeAreaView>
  );
}
