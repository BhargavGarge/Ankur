import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Share as RNShare } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, Check, Share, ArrowRight } from 'lucide-react-native';
import { useAppStore } from '../../../store/useAppStore';
import { TASKS } from '../../../constants/tasks';
import { useSupabase } from '../../../hooks/useSupabase';
import { useAuth } from '@clerk/clerk-expo';

export default function TaskCompleteScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { userId } = useAuth();
  const { getAuthenticatedClient } = useSupabase();
  const userTasks = useAppStore((state) => state.userTasks);
  const updateTaskProgress = useAppStore((state) => state.updateTaskProgress);

  const task = useMemo(() => TASKS.find(t => t.id === id), [id]);

  // Mark task as done in background
  useEffect(() => {
    const markDone = async () => {
      if (!userId || !id || userTasks[id as string]?.status === 'done') return;

      try {
        updateTaskProgress(id as string, { status: 'done' });
        const supabase = await getAuthenticatedClient();
        await supabase
          .from('user_tasks')
          .update({ status: 'done', completed_at: new Date().toISOString() })
          .eq('user_id', userId)
          .eq('task_id', id);
      } catch (err) {
        console.error('Failed to mark task as done:', err);
      }
    };
    markDone();
  }, [id, userId]);

  // Calculate overall progress
  const { doneCount, totalCount, nextTask } = useMemo(() => {
    const total = TASKS.length;
    const done = Object.values(userTasks).filter(t => t.status === 'done').length;
    
    // Find next todo task
    const next = TASKS.find(t => {
      const p = userTasks[t.id];
      return t.id !== id && (!p || p.status !== 'done');
    });

    return { 
      doneCount: done, 
      totalCount: total,
      nextTask: next
    };
  }, [userTasks, id]);

  const progressPercent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  const handleShare = async () => {
    try {
      await RNShare.share({
        message: `I just completed the ${task?.title} task on Ankur! 🌿 One step closer to settling in Germany.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-6 h-16 w-full bg-white border-b border-[#E8E8E8] z-50">
        <TouchableOpacity onPress={() => router.push('/(tabs)')} className="p-2 -ml-2 text-slate-500">
           <X color="#64748b" size={24} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#1B4F72] font-headline">
           Task Complete
        </Text>
        <View className="w-8" /> {/* Spacer */}
      </View>

      <ScrollView className="flex-1 w-full px-6 py-8 flex-col" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        
        {/* Celebration Animation Area */}
        <View className="relative w-full h-64 flex-col items-center justify-center overflow-visible">
          <View className="z-10 bg-[#0E6655] w-24 h-24 rounded-full flex-col items-center justify-center border-[6px] border-white" style={{ elevation: 2 }}>
             <Check color="#ffffff" size={48} strokeWidth={3} />
          </View>
          <View className="mt-4">
             <Text className="text-[28px] font-bold text-[#1B4F72] tracking-tight text-center font-headline">
               {task?.title || 'Task'}
             </Text>
          </View>
        </View>

        {/* Celebration Copy */}
        <View className="items-center mt-6 flex-col">
          <Text className="text-[36px] font-bold text-[#1B4F72] leading-tight text-center mb-2 font-headline">
            Well done!
          </Text>
          <Text className="text-[16px] italic text-slate-600 leading-relaxed text-center font-sans">
            Germans do it with paperwork. You just proved you can too.
          </Text>
        </View>

        {/* Progress Update Card */}
        <View className="w-full mt-12 bg-white border border-[#E8E8E8] rounded-3xl p-8 items-center justify-center flex-col">
          <Text className="font-sans text-[12px] font-bold tracking-[0.05em] text-slate-500 uppercase mb-4 text-center">
            YOUR PROGRESS
          </Text>
          <View className="flex-row items-baseline justify-center gap-2 mb-1">
            <Text className="text-[40px] font-bold text-[#1B4F72] leading-none text-center font-headline">
              {doneCount} of {totalCount}
            </Text>
          </View>
          <Text className="font-sans text-[13px] text-slate-500 mb-6 text-center">tasks completed</Text>
          <View className="w-full h-2.5 bg-[#e7e8ea] rounded-full overflow-hidden mb-4 relative">
             <View className="absolute left-0 top-0 h-full bg-[#1B4F72] rounded-full" style={{ width: `${progressPercent}%` }} />
          </View>
          <Text className="font-sans text-[13px] text-slate-500 text-center">
            {doneCount === totalCount 
              ? "You've completed all essential tasks! 🌿" 
              : `You are doing amazingly. ${totalCount - doneCount} more to go.`}
          </Text>
        </View>

        {/* Next Task Prompt */}
        {nextTask && (
          <View className="w-full mt-10">
            <View className="flex-row flex items-center gap-2 mb-3">
              <Text className="font-sans text-[12px] font-bold text-[#1B4F72]">
                Up next →
              </Text>
            </View>
            <View className="bg-white border border-[#E8E8E8] rounded-xl p-5 relative overflow-hidden" style={{ borderLeftWidth: 3, borderLeftColor: '#1B4F72' }}>
               <View className="flex-col pr-8 mb-4">
                 <Text className="font-sans text-[16px] font-bold text-[#2E3132] mb-1">
                   {nextTask.title}
                 </Text>
                 <Text className="font-sans text-[13px] text-slate-500">
                   {nextTask.description.slice(0, 60)}...
                 </Text>
               </View>
               <TouchableOpacity 
                 onPress={() => router.push(`/task/${nextTask.id}` as any)}
                 className="flex-row justify-end items-center gap-1"
               >
                  <Text className="font-sans text-[13px] font-bold text-[#1B4F72]">
                    Start this task
                  </Text>
                  <ArrowRight color="#1B4F72" size={14} />
               </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 p-6 flex-col w-full z-40 border-t border-transparent">
         <TouchableOpacity 
           onPress={handleShare}
           className="w-full flex-row items-center justify-center h-12 border border-[#1B4F72] rounded-2xl bg-white mb-3"
         >
            <Share color="#1B4F72" size={20} className="mr-2" />
            <Text className="text-[#1B4F72] font-sans font-semibold text-[14px]">
              Share your progress
            </Text>
         </TouchableOpacity>
         <TouchableOpacity 
           onPress={() => router.push('/(tabs)')} 
           className="w-full bg-[#1B4F72] rounded-2xl h-14 flex-row items-center justify-center">
            <Text className="text-white font-sans font-bold text-[16px]">
              Back to Dashboard
            </Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
