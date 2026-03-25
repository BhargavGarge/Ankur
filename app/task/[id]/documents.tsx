import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { TASKS } from '../../../constants/tasks';
import { useAppStore } from '../../../store/useAppStore';
import { useSupabase } from '../../../hooks/useSupabase';
import { useAuth } from '@clerk/clerk-expo';

export default function DocumentsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userId } = useAuth();
  const { getAuthenticatedClient } = useSupabase();
  const userTasks = useAppStore((state) => state.userTasks);
  const updateTaskProgress = useAppStore((state) => state.updateTaskProgress);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const task = useMemo(() => TASKS.find(t => t.id === id), [id]);
  const progress = userTasks[id as string];
  const docsReady = progress?.docs_ready || [];

  if (!task) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <Text className="font-headline text-xl text-primary mb-4">Task not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="bg-primary px-6 py-3 rounded-xl">
           <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const toggleDoc = async (docId: string) => {
    if (!userId || isUpdating) return;
    
    setIsUpdating(docId);
    const isReady = docsReady.includes(docId);
    const newDocsReady = isReady 
      ? docsReady.filter(d => d !== docId)
      : [...docsReady, docId];

    try {
      // 1. Update store immediately for snappy UI
      updateTaskProgress(task.id, { 
        docs_ready: newDocsReady,
        status: (progress?.status === 'todo' && newDocsReady.length > 0) ? 'in_progress' : progress?.status || 'todo'
      });

      // 2. Persist to Supabase
      const supabase = await getAuthenticatedClient();
      const { error } = await supabase
        .from('user_tasks')
        .update({ 
          docs_ready: newDocsReady,
          status: (progress?.status === 'todo' && newDocsReady.length > 0) ? 'in_progress' : progress?.status || 'todo'
        })
        .eq('user_id', userId)
        .eq('task_id', task.id);

      if (error) {
        console.error('Error updating task progress:', error);
        // Rollback on error
        updateTaskProgress(task.id, { docs_ready: docsReady });
      }
    } catch (err) {
       console.error('Failed to toggle doc:', err);
       updateTaskProgress(task.id, { docs_ready: docsReady });
    } finally {
      setIsUpdating(null);
    }
  };

  const completedCount = docsReady.length;
  const totalCount = task.documents.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Documents</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 w-full" showsVerticalScrollIndicator={false}>
        <View className="mb-10">
          <Text className="font-headline italic text-4xl text-primary mb-3">Required Papers</Text>
          <Text className="font-body text-base text-on-surface-variant leading-relaxed mb-6">
            Make sure you have all these documents printed and prepared before your appointment.
          </Text>

          <View
            className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden border"
            style={{ borderColor: 'rgba(232,232,232,0.3)' }}
          >
            <View className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
          </View>
          <Text className="mt-3 font-sans text-[10px] tracking-widest text-[#BA7517] uppercase font-bold text-right">
            {completedCount} of {totalCount} Ready
          </Text>
        </View>

        <View className="mb-10">
          {task.documents.map((doc) => {
             const isChecked = docsReady.includes(doc.id);
             const isDocUpdating = isUpdating === doc.id;

             return (
               <TouchableOpacity
                 key={doc.id}
                 onPress={() => toggleDoc(doc.id)}
                 disabled={isUpdating !== null && isUpdating !== doc.id}
                 className="border-b border-outline-variant p-5 flex-row items-center"
                 style={{ backgroundColor: isChecked ? 'rgba(232,241,248,0.3)' : '#ffffff' }}
               >
                 <View className={`w-6 h-6 rounded border items-center justify-center mr-4 ${isChecked ? 'bg-[#0E6655] border-[#0E6655]' : 'border-outline-variant bg-white'}`}>
                   {isDocUpdating ? (
                     <ActivityIndicator size="small" color={isChecked ? "#ffffff" : "#1B4F72"} />
                   ) : (
                     isChecked && <Check color="#ffffff" size={14} />
                   )}
                 </View>
                 <View className="flex-1 pr-4">
                   <Text className={`font-body text-[16px] font-bold mb-1 ${isChecked ? 'text-primary line-through opacity-70' : 'text-primary'}`}>{doc.name}</Text>
                   <Text className={`font-body text-[13px] ${isChecked ? 'text-on-surface-variant opacity-70' : 'text-on-surface-variant'}`}>{doc.detail}</Text>
                 </View>
               </TouchableOpacity>
             )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
