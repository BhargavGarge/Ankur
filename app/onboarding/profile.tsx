import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Camera } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.userProfile);
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);

  const [name, setName] = useState(profile.name || '');
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    if (name.trim()) {
      updateUserProfile({ name: name.trim() });
      router.push('/onboarding/purpose' as any);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Top Navigation Shell */}
        <View className="z-50 bg-white">
          {/* Progress Bar */}
          <View className="w-full h-[2px] bg-outline-variant">
            <View className="h-full bg-primary" style={{ width: '16.6%' }} />
          </View>
          
          {/* Nav Controls */}
          <View className="flex-row justify-between items-center px-6 h-14">
            <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
              <ArrowLeft color="#1B4F72" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/onboarding/purpose' as any)}>
              <Text className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content Canvas */}
        <View className="flex-1 flex-col pt-10 pb-32 px-6 max-w-md mx-auto w-full">
          <View className="flex-col items-center">
            {/* Profile Photo Circle */}
            <View className="relative flex-col items-center mb-16">
              <TouchableOpacity className="w-24 h-24 rounded-full border border-dashed border-slate-300 flex-col items-center justify-center bg-slate-50">
                <Camera color="#94a3b8" size={32} />
              </TouchableOpacity>
              <Text className="mt-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Tap to upload
              </Text>
            </View>

            {/* Question Heading */}
            <View className="w-full mb-12">
              <Text className="font-headline italic text-[28px] leading-tight text-primary">
                What should we call you?
              </Text>
            </View>

            {/* Underline Input */}
            <View className="w-full">
              <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                First Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your first name"
                placeholderTextColor="#cbd5e1"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full border-b py-3 font-sans text-lg text-on-surface ${
                  isFocused ? 'border-primary border-b-2' : 'border-outline-variant border-b'
                }`}
                autoCapitalize="words"
              />
            </View>
          </View>
        </View>

        {/* Fixed Bottom Action Container */}
        <View className="absolute bottom-0 left-0 w-full p-6 bg-white pb-10">
          <TouchableOpacity 
            onPress={handleContinue}
            disabled={!name.trim()}
            className={`w-full py-4 px-6 rounded-xl flex-row justify-center items-center ${
              name.trim() ? 'bg-primary' : 'bg-surface-variant'
            }`}
          >
            <Text className={`font-sans font-bold uppercase tracking-[0.15em] text-xs ${
              name.trim() ? 'text-white' : 'text-outline'
            }`}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
