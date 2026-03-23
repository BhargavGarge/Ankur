import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSignUp = () => {
    // Navigate straight to profile setup on successful sign up
    router.push('/onboarding/profile' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 items-center justify-center px-6 py-12 md:py-24 max-w-md mx-auto w-full">
            
            <View className="mb-12 items-center">
              <Text style={{ fontFamily: 'Fraunces' }} className="italic text-5xl tracking-tight text-[#1B4F72]">
                ANKUR
              </Text>
            </View>

            <View className="mb-10 items-center">
              <Text style={{ fontFamily: 'Fraunces' }} className="text-3xl font-medium text-on-surface mb-2 text-center">
                Create your Ankur account
              </Text>
              <Text className="font-sans text-on-surface-variant text-base text-center">
                Takes 30 seconds. Free forever.
              </Text>
            </View>

            <View className="w-full mb-8">
              <TouchableOpacity className="w-full flex-row items-center justify-center gap-3 py-4 px-4 bg-white border border-[#E8E8E8] rounded-[16px]">
                <View className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <Text className="text-[10px] font-bold">G</Text>
                </View>
                <Text className="text-on-surface font-sans font-semibold tracking-tight">
                  Sign up with Google
                </Text>
              </TouchableOpacity>
            </View>

            <View className="relative w-full mb-8 flex-row items-center">
              <View className="flex-grow border-t border-[#c1c7cf]" />
              <Text className="mx-4 font-sans text-xs uppercase tracking-widest text-[#72787f]">or</Text>
              <View className="flex-grow border-t border-[#c1c7cf]" />
            </View>

            <View className="w-full space-y-6 flex-col mb-12">
              <View className="flex-col mb-6">
                <Text className="font-sans text-xs uppercase tracking-[0.15em] font-bold text-[#72787f] block mb-1">
                  Email address
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="w-full bg-transparent px-0 py-3 text-on-surface font-sans text-lg border-b border-[#E8E8E8]"
                  style={{ borderBottomWidth: focusedInput === 'email' ? 2 : 1, borderBottomColor: focusedInput === 'email' ? '#1B4F72' : '#E8E8E8' }}
                  placeholder="alexander@humboldt.com"
                  placeholderTextColor="#c1c7cf"
                />
              </View>

              <View className="flex-col mb-10">
                <Text className="font-sans text-xs uppercase tracking-[0.15em] font-bold text-[#72787f] block mb-1">
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry
                  className="w-full bg-transparent px-0 py-3 text-on-surface font-sans text-lg border-b border-[#E8E8E8]"
                  style={{ borderBottomWidth: focusedInput === 'password' ? 2 : 1, borderBottomColor: focusedInput === 'password' ? '#1B4F72' : '#E8E8E8' }}
                  placeholder="••••••••"
                  placeholderTextColor="#c1c7cf"
                />
              </View>

              <TouchableOpacity onPress={handleSignUp} className="w-full bg-[#1B4F72] py-4 rounded-[16px] items-center justify-center">
                 <Text className="text-white text-base tracking-wide uppercase font-bold font-sans">
                   Continue
                 </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full mb-16 flex-row items-center justify-center mt-2">
              <Text className="font-sans text-sm text-on-surface-variant">
                Already have an account? 
              </Text>
              <TouchableOpacity onPress={() => router.replace('/auth/signin')}>
                <Text className="text-[#1B4F72] font-bold font-sans underline ml-1" style={{ textDecorationLine: 'underline', textDecorationColor: '#1B4F72' }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>

            <View className="max-w-xs mx-auto">
              <Text className="font-sans text-[11px] leading-relaxed text-[#72787f] text-center uppercase tracking-wider">
                By clicking "Continue", you agree to our <Text className="underline">Terms of Service</Text> and <Text className="underline">Privacy Policy</Text>.
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
