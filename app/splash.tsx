import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BookOpen } from 'lucide-react-native';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View className="flex-1 max-w-[390px] mx-auto w-full">
        {/* Top Section: Branding & Identity */}
        <View className="flex-1 items-center justify-center px-8 pt-12">
          {/* Logo */}
          <Text style={{ fontFamily: 'Fraunces' }} className="font-bold text-[52px] leading-tight text-[#1B4F72] tracking-tight text-center">
              ANKUR
          </Text>
          {/* Translation/Motto */}
          <Text className="mt-2 text-[#72787f] font-sans text-[16px] tracking-wide text-center">
              अंकुर · New Beginning
          </Text>
          {/* Tagline */}
          <Text className="mt-8 font-sans font-medium text-[18px] text-[#2C3E50] leading-snug text-center max-w-[260px]">
              Your Germany checklist, built for Indians.
          </Text>

          {/* Illustration Container */}
          <View className="mt-16 w-full flex-row justify-center items-end" style={{ gap: 16 }}>
            {/* Indian Passport Stylised */}
            <View className="w-24 h-32 border-2 border-[#1B4F72] rounded-lg bg-white flex-col items-center justify-center p-2 relative overflow-hidden">
              <View className="w-full h-full border border-[#1B4F72]/20 rounded flex-col items-center justify-center">
                <BookOpen color="#1B4F72" size={32} />
                <View className="mt-2 w-8 h-[2px] bg-[#1B4F72]/30" />
                <View className="mt-1 w-6 h-[2px] bg-[#1B4F72]/30" />
              </View>
            </View>
            
            {/* German Bürgeramt Building Stylised */}
            <View className="w-28 h-24 border-2 border-[#0E6655] rounded-lg bg-white flex-col items-center justify-end p-2 relative">
              <View className="w-full h-full border border-[#0E6655]/20 rounded-t flex-row flex-wrap items-start p-1" style={{ gap: 4 }}>
                <View className="w-3 h-3 border border-[#0E6655]/40" />
                <View className="w-3 h-3 border border-[#0E6655]/40" />
                <View className="w-3 h-3 border border-[#0E6655]/40" />
                <View className="w-3 h-3 border border-[#0E6655]/40" />
              </View>
              <View className="w-6 h-8 bg-[#0E6655]/10 border-t-2 border-l-2 border-r-2 border-[#0E6655] rounded-t mt-auto absolute bottom-2 self-center" />
            </View>
          </View>
        </View>

        {/* Bottom Section: Actions */}
        <View className="items-center justify-end px-8 pb-12">
          <View className="w-full mb-6">
            <TouchableOpacity 
              onPress={() => router.push('/onboarding/profile')}
              className="w-full bg-[#1B4F72] py-5 rounded-[16px] items-center justify-center mb-6"
            >
              <Text className="text-white font-sans font-semibold text-[16px]">
                Get Started
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => router.push('/auth/signin')}
              className="w-full flex-row items-center justify-center"
            >
              <Text className="text-[#2C3E50] font-sans text-[16px]">I already have an account </Text>
              <Text className="ml-2 font-bold text-[#2C3E50]">→</Text>
              <Text className="ml-1 text-[#2C3E50] underline text-[16px] font-sans" style={{ textDecorationColor: '#c1c7cf' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View className="h-4" />
        </View>
      </View>
    </SafeAreaView>
  );
}
