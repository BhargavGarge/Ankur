import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Check, Save } from 'lucide-react-native';
import { TASKS } from '../../../constants/tasks';
import { useAppStore } from '../../../store/useAppStore';
import { useSupabase } from '../../../hooks/useSupabase';
import { useAuth } from '@clerk/clerk-expo';

export default function TaskFieldsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userId } = useAuth();
  const { getAuthenticatedClient } = useSupabase();
  const userTasks = useAppStore((state) => state.userTasks);
  const updateTaskProgress = useAppStore((state) => state.updateTaskProgress);

  const task = TASKS.find(t => t.id === id);
  const progress = userTasks[id as string];
  
  const [formData, setFormData] = useState<Record<string, any>>(progress?.data || {});
  const [isSaving, setIsSaving] = useState(false);

  if (!task || !task.fields) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <Text className="font-headline text-xl text-primary mb-4">No fields for this task</Text>
        <TouchableOpacity onPress={() => router.back()} className="bg-primary px-6 py-3 rounded-full">
           <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSave = async () => {
    if (!userId) return;
    setIsSaving(true);
    
    try {
      const supabase = await getAuthenticatedClient();
      
      // Update local store
      updateTaskProgress(id as string, { data: formData });

      // Persist to Supabase
      const { error } = await supabase
        .from('user_tasks')
        .update({ data: formData })
        .eq('user_id', userId)
        .eq('task_id', id);

      if (error) throw error;
      
      router.back();
    } catch (err: any) {
      console.error('Error saving task data:', err);
      Alert.alert('Error', 'Failed to save information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Information</Text>
        <TouchableOpacity onPress={handleSave} disabled={isSaving}>
           {isSaving ? <ActivityIndicator size="small" color="#1B4F72" /> : <Save color="#1B4F72" size={24} />}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 w-full" showsVerticalScrollIndicator={false}>
        <View className="mb-10">
          <Text className="font-headline italic text-4xl text-primary mb-3">Task Details</Text>
          <Text className="font-body text-base text-on-surface-variant leading-relaxed">
            Fill in the details below to keep track of your {task.title} information.
          </Text>
        </View>

        <View className="flex-col gap-6">
          {task.fields.map((field) => (
            <View key={field.id} className="flex-col">
              <Text className="font-sans text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                {field.label}
              </Text>
              
              {field.type === 'select' ? (
                <View className="flex-row flex-wrap gap-2">
                  {field.options?.map(opt => (
                    <TouchableOpacity 
                      key={opt}
                      onPress={() => handleInputChange(field.id, opt)}
                      className={`px-4 py-2 rounded-xl border ${formData[field.id] === opt ? 'bg-primary border-primary' : 'bg-white border-outline-variant'}`}
                    >
                      <Text className={`font-sans text-sm ${formData[field.id] === opt ? 'text-white font-bold' : 'text-slate-600'}`}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View className="bg-white border border-outline-variant rounded-2xl p-4">
                  <TextInput
                    className="font-sans text-base text-primary"
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
                    value={formData[field.id]?.toString() || ''}
                    onChangeText={(val) => handleInputChange(field.id, val)}
                    keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                  />
                </View>
              )}
            </View>
          ))}
        </View>

        <View className="mt-12 mb-20">
          <TouchableOpacity 
            onPress={handleSave}
            disabled={isSaving}
            className="bg-primary w-full py-4 rounded-2xl items-center flex-row justify-center"
          >
            {isSaving ? <ActivityIndicator color="#fff" /> : (
              <>
                <Check color="#fff" size={20} className="mr-2" />
                <Text className="text-white font-bold text-lg">Save Information</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
