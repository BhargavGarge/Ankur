import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSignIn = () => {
    // In a real app, integrate auth here
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navigation */}
      <View className="flex-row items-center justify-between px-6 h-16 bg-white border-b border-[#E8E8E8]">
        <Text style={{ fontFamily: 'Fraunces' }} className="font-bold text-2xl tracking-tight text-[#1B4F72]">
          ANKUR
        </Text>
        <Text className="font-sans tracking-widest uppercase text-xs text-slate-500">
          Language: EN
        </Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 justify-center px-6 py-12 max-w-md mx-auto w-full">
            
            <View className="mb-12 items-center">
              <Text style={{ fontFamily: 'Fraunces' }} className="italic text-4xl text-primary mb-4 text-center">
                Welcome back
              </Text>
              <Text className="font-sans text-on-surface-variant text-lg text-center">
                Sign in to continue your journey.
              </Text>
            </View>

            <TouchableOpacity className="w-full flex-row flex items-center justify-center gap-3 px-6 py-4 border border-[#E8E8E8] rounded-[16px] bg-white mb-6">
               <View className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <Text className="text-[10px] font-bold">G</Text>
               </View>
               <Text className="font-sans font-semibold text-sm uppercase tracking-wider text-primary">
                 Continue with Google
               </Text>
            </TouchableOpacity>

            <View className="flex-row items-center py-4 mb-4">
              <View className="flex-grow border-t border-[#E8E8E8]" />
              <Text className="mx-4 font-sans text-xs uppercase tracking-[0.2em] text-slate-400">OR</Text>
              <View className="flex-grow border-t border-[#E8E8E8]" />
            </View>

            <View className="space-y-8 flex-col" style={{ gap: 24 }}>
              <View className="flex-col">
                <Text className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#1B4F72] ml-1 mb-1">
                  Email Address
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="w-full bg-transparent px-1 py-3 text-on-surface font-sans text-lg border-b border-[#E8E8E8]"
                  style={{ borderBottomWidth: focusedInput === 'email' ? 2 : 1, borderBottomColor: focusedInput === 'email' ? '#1B4F72' : '#E8E8E8' }}
                  placeholder="alexander@humboldt.com"
                  placeholderTextColor="#c1c7cf"
                />
              </View>

              <View className="flex-col">
                <View className="flex-row justify-between items-end mb-1">
                  <Text className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#1B4F72] ml-1">
                    Password
                  </Text>
                  <TouchableOpacity>
                    <Text className="font-sans font-bold text-[10px] uppercase tracking-widest text-slate-400">
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry
                  className="w-full bg-transparent px-1 py-3 text-on-surface font-sans text-lg border-b border-[#E8E8E8]"
                  style={{ borderBottomWidth: focusedInput === 'password' ? 2 : 1, borderBottomColor: focusedInput === 'password' ? '#1B4F72' : '#E8E8E8' }}
                  placeholder="••••••••••••"
                  placeholderTextColor="#c1c7cf"
                />
              </View>

              <TouchableOpacity onPress={handleSignIn} className="w-full bg-[#1B4F72] py-5 rounded-[16px] items-center mt-4">
                 <Text className="text-white font-sans font-bold text-sm uppercase tracking-widest">
                   Sign In
                 </Text>
              </TouchableOpacity>
            </View>

            <View className="pt-12 text-center border-t border-[#E8E8E8] mt-8 flex-row justify-center">
              <Text className="font-sans text-sm text-slate-500">
                New here?
              </Text>
              <TouchableOpacity onPress={() => router.replace('/auth/signup')}>
                <Text className="font-sans font-bold text-[#1B4F72] uppercase tracking-wider ml-1 underline" style={{ textDecorationLine: 'underline', textDecorationColor: '#1B4F72' }}>
                  Get started
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="p-8 pb-12 items-center bg-white border-t border-[#E8E8E8]">
        <Text className="text-slate-400 text-[10px] font-sans uppercase tracking-[0.2em] text-center">
          © 2024 ANKUR — YOUR MODERN ATTACHÉ FOR GLOBAL MOBILITY
        </Text>
      </View>
    </SafeAreaView>
  );
}
