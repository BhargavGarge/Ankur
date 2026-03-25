import '../global.css';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ClerkProvider, ClerkLoaded, useAuth, useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

import { useAppStore } from '../store/useAppStore';
import { useSupabase } from '../hooks/useSupabase';

function InitialLayout() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();
  const { getAuthenticatedClient } = useSupabase();
  const updateUserProfile = useAppStore((state) => state.updateUserProfile);
  const setOnboarded = useAppStore((state) => state.setOnboarded);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setIsSyncing(false);
      return;
    }

    const syncProfile = async () => {
      if (isSignedIn && userId && user) {
        try {
          const supabase = await getAuthenticatedClient();

          // Try to fetch existing profile
          let { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

          // If no profile exists, create one using Google data
          if (error && error.code === 'PGRST116') {
            const { data: newData, error: upsertError } = await supabase
              .from('users')
              .upsert({
                id: userId,
                name: user.firstName || user.fullName || 'User',
                avatar_url: user.imageUrl,
                onboarding_complete: false,
              })
              .select()
              .single();

            if (upsertError) {
              console.error('Error creating initial profile:', upsertError);
            } else {
              data = newData;
            }
          } else if (error) {
            console.error('Error fetching profile:', error.message, error.code, error.hint);
            if (error.code === 'PGRST301') {
              console.warn('JWT Decoding Error: Please ensure your Supabase JWT Secret matches the Clerk "supabase" template signing key.');
            }
          }

          if (data) {
            updateUserProfile({
              name: data.name,
              purpose: data.purpose,
              city: data.city,
              visaType: data.visa_type,
              arrivalDate: data.arrival_date,
              onboardingComplete: data.onboarding_complete,
            });
            setOnboarded(data.onboarding_complete);

            // Fetch user tasks
            const { data: tasksData, error: tasksError } = await supabase
              .from('user_tasks')
              .select('*')
              .eq('user_id', userId);

            if (!tasksError) {
              const { TASKS } = await import('../constants/tasks');

              if (tasksData && tasksData.length > 0) {
                // Map existing tasks
                const mappedTasks = tasksData.map(t => ({
                  id: t.task_id,
                  status: t.status as 'todo' | 'in_progress' | 'done',
                  docs_ready: t.docs_ready || [],
                  steps_done: t.steps_done || [],
                  deadline: t.deadline,
                  data: t.data || {}
                }));

                // Check for missing tasks (newly added to TASKS constant)
                const existingTaskIds = new Set(mappedTasks.map(t => t.id));
                const missingTasks = TASKS.filter(task => !existingTaskIds.has(task.id));

                if (missingTasks.length > 0) {
                  const initialMissingTasks = missingTasks.map(task => ({
                    user_id: userId,
                    task_id: task.id,
                    status: 'todo',
                    docs_ready: [],
                    steps_done: [],
                    data: {}
                  }));

                  const { data: addedTasks, error: addError } = await supabase
                    .from('user_tasks')
                    .insert(initialMissingTasks)
                    .select();

                  if (!addError && addedTasks) {
                    addedTasks.forEach(t => {
                      mappedTasks.push({
                        id: t.task_id,
                        status: t.status as 'todo' | 'in_progress' | 'done',
                        docs_ready: t.docs_ready || [],
                        steps_done: t.steps_done || [],
                        deadline: t.deadline,
                        data: t.data || {}
                      });
                    });
                  }
                }

                useAppStore.getState().setUserTasks(mappedTasks);
              } else {
                // Initialize default tasks if none exist
                const { TASKS } = await import('../constants/tasks');
                const initialTasks = TASKS.map(task => ({
                  user_id: userId,
                  task_id: task.id,
                  status: 'todo',
                  docs_ready: [],
                  steps_done: [],
                  data: {}
                }));

                const { data: newTasks, error: initError } = await supabase
                  .from('user_tasks')
                  .insert(initialTasks)
                  .select();

                if (!initError && newTasks) {
                  const mappedTasks = newTasks.map(t => ({
                    id: t.task_id,
                    status: t.status as 'todo' | 'in_progress' | 'done',
                    docs_ready: t.docs_ready || [],
                    steps_done: t.steps_done || [],
                    deadline: t.deadline,
                    data: t.data || {}
                  }));
                  useAppStore.getState().setUserTasks(mappedTasks);
                }
              }
            }
          }
        } catch (err) {
          console.error('Failed to sync profile:', err);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    syncProfile();
  }, [isSignedIn, isLoaded, userId, user]);

  const onboardingComplete = useAppStore((state) => state.userProfile.onboardingComplete);

  useEffect(() => {
    if (!isLoaded || isSyncing) return;

    const segment = segments[0] as string | undefined;
    const inAuthGroup = segment === 'auth' || segment === 'splash' || segment === undefined;
    const inOnboardingGroup = segment === 'onboarding';

    if (isSignedIn && (inAuthGroup || inOnboardingGroup)) {
      if (onboardingComplete) {
        if (inAuthGroup || inOnboardingGroup) {
          router.replace('/(tabs)');
        }
      } else if (!inOnboardingGroup) {
        // Skip profile step and go to purpose since we sync name from Google
        router.replace('/onboarding/purpose');
      }
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace('/splash');
    }
  }, [isSignedIn, isLoaded, segments, onboardingComplete, isSyncing]);

  if (!isLoaded || (isSignedIn && isSyncing)) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#1B4F72" />
      </View>
    );
  }

  return (
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
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <InitialLayout />
        <StatusBar style="dark" />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
