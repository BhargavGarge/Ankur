import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, GraduationCap, Briefcase, Search, Globe, ChevronRight, Check, Info } from 'lucide-react-native';

const visaTypes = [
  { id: 'Student Visa', title: 'Student Visa', desc: 'Degree-seeking, language course, or exchange', icon: GraduationCap },
  { id: 'Work Permit', title: 'Work Permit', desc: 'Employment, Freelance, or Blue Card', icon: Briefcase },
  { id: 'Job Seeker Visa', title: 'Job Seeker Visa', desc: 'Opportunity card or 6-month seeking permit', icon: Search },
  { id: 'EU Citizen', title: 'EU Citizen (no visa)', desc: 'Freedom of movement for EU/EEA nationals', icon: Globe },
];

export default function VisaScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.userProfile);
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);

  const [selectedVisa, setSelectedVisa] = useState<string | null>(profile.visaType || null);

  const handleContinue = () => {
    if (selectedVisa) {
      updateUserProfile({ visaType: selectedVisa });
      router.push('/onboarding/arrival' as any);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* TopAppBar */}
      <View className="z-50 flex-row justify-between items-center px-6 h-16 bg-white border-b border-[#E8E8E8] w-full">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        
        <View className="absolute w-full items-center pointer-events-none">
          <Text style={{ fontFamily: 'Fraunces' }} className="italic text-3xl text-[#1B4F72]">
            ANKUR
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/onboarding/arrival' as any)}>
          <Text className="font-sans tracking-wide text-sm text-slate-500 px-4 py-2">
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar (83.3%) */}
      <View className="w-full h-1 bg-surface-container-low">
        <View className="h-full bg-primary" style={{ width: '83.3%' }} />
      </View>

      {/* Main Content Canvas */}
      <ScrollView className="flex-1 px-6 pt-10 pb-32 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        
        <View className="mb-8 items-start">
          <Text className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Step 5 of 6
          </Text>
          <Text style={{ fontFamily: 'Fraunces' }} className="italic text-[28px] leading-tight text-[#1B4F72]">
            What is your visa type?
          </Text>
          <Text className="font-sans text-sm tracking-wide text-slate-500 mt-3">
            Select the permit that aligns with your primary reason for relocation to Germany.
          </Text>
        </View>

        {/* Visa Options Grid */}
        <View className="flex-col gap-4">
          {visaTypes.map((visa) => {
            const Icon = visa.icon;
            const isSelected = selectedVisa === visa.id;
            
            return (
              <TouchableOpacity
                key={visa.id}
                onPress={() => setSelectedVisa(visa.id)}
                activeOpacity={0.9}
                className={`flex-col items-center justify-center p-8 bg-white rounded-[16px] mb-4 
                  ${isSelected ? 'border-2 border-[#1B4F72]' : 'border border-[#E8E8E8]'}
                `}
              >
                <View className="mb-4">
                  <Icon color="#1B4F72" size={36} strokeWidth={1.5} />
                </View>
                <Text className="font-sans font-bold text-[#1B4F72] text-lg mb-2 text-center">
                  {visa.title}
                </Text>
                <Text className="font-sans text-xs text-slate-500 text-center" style={{ maxWidth: 200 }}>
                  {visa.desc}
                </Text>
                <View className="mt-4 flex flex-row items-center justify-center h-6">
                  {isSelected ? (
                    <Check color="#1B4F72" size={24} strokeWidth={3} />
                  ) : (
                    <ChevronRight color="#cbd5e1" size={24} />
                  )}
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Descriptive Editorial Snippet */}
        <View className="mt-12 p-6 rounded-[16px] bg-surface-container-low border border-[#E8E8E8]">
          <View className="flex-row items-start gap-3">
            <Info color="#0E6655" size={24} />
            <View className="flex-1 pl-2">
              <Text style={{ fontFamily: 'Fraunces' }} className="italic text-lg text-[#1B4F72] mb-1">
                Expert Tip
              </Text>
              <Text className="font-sans text-sm text-slate-600 leading-relaxed">
                Choosing the right visa category ensures your <Text className="font-bold">Ankur Guide</Text> generates the exact document checklist required by the German embassy in your home country.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Area */}
      {selectedVisa && (
        <View className="absolute bottom-0 left-0 w-full bg-white/95 border-t border-[#E8E8E8] px-6 py-4 pb-8 items-center">
          <TouchableOpacity 
            onPress={handleContinue}
            className="w-full max-w-2xl bg-[#1B4F72] py-4 rounded-[16px] items-center justify-center"
          >
            <Text className="text-white font-sans font-bold tracking-widest uppercase text-sm">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
