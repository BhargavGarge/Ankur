import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const router = useRouter();
  const { isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const [loading, setLoading] = useState(false);

  const onGoogleSignInPress = useCallback(async () => {
    setLoading(true);
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // After sign in, the InitialLayout will automatically redirect to the 
        // correct screen based on onboarding status.
      }
    } catch (err: any) {
      console.error('OAuth error', err);
      Alert.alert('Error', 'Google sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [startOAuthFlow]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View className="flex-1 items-center justify-center px-6 py-12 max-w-md mx-auto w-full">
        
        <View className="mb-12 items-center">
          <Text style={{ fontFamily: 'Fraunces' }} className="italic text-5xl tracking-tight text-[#1B4F72]">
            ANKUR
          </Text>
        </View>

        <View className="mb-10 items-center">
          <Text style={{ fontFamily: 'Fraunces' }} className="text-3xl font-medium text-on-surface mb-2 text-center">
            Welcome back to Ankur
          </Text>
          <Text className="font-sans text-on-surface-variant text-base text-center px-4">
            Sign in securely with your Google account.
          </Text>
        </View>

        <View className="w-full mb-12">
          <TouchableOpacity 
            onPress={onGoogleSignInPress}
            disabled={loading || !isLoaded}
            className={`w-full flex-row items-center justify-center gap-3 py-5 px-4 ${loading ? 'bg-slate-50' : 'bg-white'} border border-[#E8E8E8] rounded-[24px] shadow-sm`}
            style={{ elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 }}
          >
            {loading ? (
              <ActivityIndicator color="#1B4F72" />
            ) : (
              <>
                <View className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                  <Text className="text-[10px] font-bold font-sans">G</Text>
                </View>
                <Text className="text-[#1B4F72] font-sans font-bold text-lg tracking-tight">
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View className="w-full flex-row items-center justify-center mt-12">
          <Text className="font-sans text-sm text-slate-500">
            Don't have an account? 
          </Text>
          <TouchableOpacity onPress={() => router.replace('/auth/signup')}>
            <Text className="text-[#1B4F72] font-bold font-sans underline ml-2">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}
