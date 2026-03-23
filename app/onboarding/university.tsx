import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Search, ChevronRight, Info, ArrowRight } from 'lucide-react-native';

const universities = [
  { id: 'tum', name: 'Technical University of Munich', city: 'Munich, Germany' },
  { id: 'lmu', name: 'Ludwig Maximilian University', city: 'Munich, Germany' },
  { id: 'heidelberg', name: 'Heidelberg University', city: 'Heidelberg, Germany' },
  { id: 'humboldt', name: 'Humboldt University of Berlin', city: 'Berlin, Germany' },
  { id: 'rwth', name: 'RWTH Aachen University', city: 'Aachen, Germany' },
  { id: 'fu', name: 'Free University of Berlin', city: 'Berlin, Germany' },
  { id: 'kit', name: 'Karlsruhe Institute of Technology', city: 'Karlsruhe, Germany' },
];

export default function UniversityScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.userProfile);
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUni, setSelectedUni] = useState<string | null>(profile.university || null);
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    if (selectedUni) {
      updateUserProfile({ university: selectedUni });
      router.push('/onboarding/city' as any);
    }
  };

  const filteredUnis = universities.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        {/* TopAppBar */}
        <View className="z-50 bg-white border-b border-[#E8E8E8]">
          <View className="flex-row justify-between items-center px-6 h-16 w-full">
            <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
              <ArrowLeft color="#1B4F72" size={24} />
            </TouchableOpacity>
            
            <View className="absolute w-full items-center pointer-events-none">
              <Text style={{ fontFamily: 'Fraunces' }} className="text-2xl font-bold text-[#1B4F72] text-center">
                ANKUR
              </Text>
            </View>

            <TouchableOpacity onPress={() => router.push('/onboarding/city' as any)}>
              <Text className="font-sans tracking-wide text-sm text-[#1B4F72] font-bold px-3 py-1">
                Skip
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Progress Bar (50%) */}
          <View className="w-full h-1 bg-surface-container-low">
            <View className="h-full bg-primary" style={{ width: '50%' }} />
          </View>
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1 px-6 pt-8 w-full" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
          {/* Question Section */}
          <View className="mb-10">
            <Text style={{ fontFamily: 'Fraunces' }} className="text-[32px] leading-tight text-primary italic font-serif">
              Which university are you at?
            </Text>
          </View>

          {/* Clean Search Bar */}
          <View className="mb-8 relative">
            <Text className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
              Search Institution
            </Text>
            <View className="flex-row items-center border-b border-[#E8E8E8] pb-3" style={{ borderBottomColor: isFocused ? '#003857' : '#E8E8E8', borderBottomWidth: isFocused ? 2 : 1 }}>
              <Search color="#94a3b8" size={20} className="mr-3" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Type name or city..."
                placeholderTextColor="#cbd5e1"
                className="flex-1 bg-transparent text-lg font-sans text-on-surface"
              />
            </View>
          </View>

          {/* University List */}
          <View className="border-t border-[#E8E8E8]">
            {filteredUnis.map((uni) => {
              const isSelected = selectedUni === uni.name;
              return (
                <TouchableOpacity 
                  key={uni.id}
                  onPress={() => setSelectedUni(uni.name)}
                  className={`flex-row items-center justify-between py-5 border-b border-[#E8E8E8] transition-colors ${
                    isSelected ? 'bg-surface-container-low' : 'bg-white'
                  }`}
                >
                  <View className="flex-[0.9]">
                    <Text className={`font-sans text-[17px] font-bold ${isSelected ? 'text-primary' : 'text-primary'}`}>
                      {uni.name}
                    </Text>
                    <Text className="font-sans text-[14px] text-slate-400 mt-0.5">
                      {uni.city}
                    </Text>
                  </View>
                  <ChevronRight color={isSelected ? "#1B4F72" : "#cbd5e1"} size={24} />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Guidance Snippet */}
          <View className="mt-12 p-6 rounded-2xl bg-surface-container-low border border-[#E8E8E8]">
            <View className="flex-row items-start gap-4">
              <View className="bg-primary rounded-full p-2 mt-1 items-center justify-center">
                <Info color="#ffffff" size={16} />
              </View>
              <View className="flex-1 pl-3">
                <Text style={{ fontFamily: 'Fraunces' }} className="italic text-lg text-primary mb-1">
                  Guide Snippet
                </Text>
                <Text className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Can't find your university? Ensure you're searching with the official English or German name. If it's a new institution, you can enter it manually in the next step.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Bottom Action Area */}
        {selectedUni && (
          <View
            pointerEvents="box-none"
            className="absolute bottom-0 left-0 w-full p-6 pb-12 items-end justify-end"
            style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
          >
            <TouchableOpacity
              onPress={handleContinue}
              className="bg-primary px-10 py-4 rounded-2xl flex-row items-center"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 10 }}
            >
              <Text className="text-white font-sans font-bold uppercase tracking-[0.15em] mr-3">
                Continue
              </Text>
              <ArrowRight color="#ffffff" size={20} />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
