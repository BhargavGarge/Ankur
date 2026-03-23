import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="auth/signin" />
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="onboarding/profile" />
        <Stack.Screen name="onboarding/purpose" />
        <Stack.Screen name="onboarding/university" />
        <Stack.Screen name="onboarding/city" />
        <Stack.Screen name="onboarding/visa" />
        <Stack.Screen name="onboarding/arrival" />
        <Stack.Screen name="onboarding/preview" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="task/[id]" />
        <Stack.Screen name="task/[id]/documents" />
        <Stack.Screen name="task/[id]/office" />
        <Stack.Screen name="task/[id]/done" />
        <Stack.Screen name="assistant" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
