import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Wallet, ChevronRight, AlertTriangle, CheckCircle2, Check } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';
import { TASKS } from '../../constants/tasks';

export default function ChecklistScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const userTasks = useAppStore((state) => state.userTasks);

  const filters = ['All', 'To Do', 'In Progress', 'Done'];

  const { totalTasks, doneCount, progressPercent, filteredTasks } = useMemo(() => {
    const total = TASKS.length;
    const done = Object.values(userTasks).filter(t => t.status === 'done').length;
    
    let filtered = TASKS.map(task => ({
      ...task,
      progress: userTasks[task.id] || { status: 'todo', docs_ready: [], steps_done: [] }
    }));

    if (filter === 'To Do') {
      filtered = filtered.filter(t => t.progress.status === 'todo');
    } else if (filter === 'In Progress') {
      filtered = filtered.filter(t => t.progress.status === 'in_progress');
    } else if (filter === 'Done') {
      filtered = filtered.filter(t => t.progress.status === 'done');
    }

    return {
      totalTasks: total,
      doneCount: done,
      progressPercent: total > 0 ? (done / total) * 100 : 0,
      filteredTasks: filtered
    };
  }, [userTasks, filter]);

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9fb]" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navigation Anchor */}
      <View className="flex-row items-center px-6 py-4 w-full bg-white border-b border-[#E8E8E8] z-50 h-16">
        <Wallet color="#1B4F72" size={24} className="mr-3" />
        <Text className="italic text-2xl tracking-tight text-[#1B4F72] font-headline">
          The Task Navigator
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-10" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        
        {/* Header Section */}
        <View className="mb-10">
          <Text className="text-[26px] font-bold text-primary mb-3 font-headline">
            My Checklist
          </Text>
          <View className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <View className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
          </View>
          <Text className="mt-3 font-sans text-xs tracking-widest text-outline uppercase font-bold">
            {Math.round(progressPercent)}% Completed
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} decelerationRate="fast" className="overflow-visible" contentContainerStyle={{ paddingHorizontal: 0 }}>
            {filters.map((f) => (
              <TouchableOpacity 
                key={f}
                onPress={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-full font-sans items-center justify-center border mr-3 ${
                  filter === f ? 'bg-primary border-primary' : 'bg-white border-[#E8E8E8]'
                }`}
              >
                <Text className={`text-sm font-bold whitespace-nowrap ${
                  filter === f ? 'text-white' : 'text-on-surface-variant'
                }`}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Task List Section */}
        <View className="mb-12">
          {filteredTasks.length === 0 ? (
            <View className="items-center justify-center py-20">
               <Text className="text-slate-400 font-sans italic">No tasks found in this category.</Text>
            </View>
          ) : (
            <View className="flex-col" style={{ gap: 16 }}>
              {filteredTasks.map((task) => {
                const isDone = task.progress.status === 'done';
                const isInProgress = task.progress.status === 'in_progress';
                const isUrgent = !isDone && task.daysToComplete <= 7;
                
                return (
                  <TouchableOpacity 
                    key={task.id} 
                    onPress={() => router.push(`/task/${task.id}` as any)} 
                    className="bg-white border border-[#E8E8E8] rounded-[16px] p-5 flex-row items-start"
                  >
                    <View className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 mr-4 ${
                      isDone ? 'bg-green-500' : (isUrgent ? 'bg-error' : 'bg-[#BA7517]')
                    }`} />
                    <View className="flex-1">
                      <View className="flex-row justify-between items-start mb-1">
                        <Text className={`font-sans font-bold text-primary text-base leading-tight flex-1 pr-2 ${isDone ? 'line-through opacity-60' : ''}`}>
                          {task.title}
                        </Text>
                        <ChevronRight color="#c1c7cf" size={24} className="-mt-1" />
                      </View>
                      <Text className={`font-sans text-sm text-on-surface-variant mb-4 ${isDone ? 'line-through opacity-60' : ''}`}>
                        {task.description.slice(0, 80)}...
                      </Text>
                      <View className="flex-row flex-wrap" style={{ gap: 8 }}>
                        {isDone ? (
                          <View className="flex-row items-center px-3 py-1 bg-secondary-container rounded-full">
                            <Check color="#1f705f" size={12} strokeWidth={3} className="mr-1" />
                            <Text className="text-[#1f705f] text-[10px] font-bold uppercase tracking-wider">
                              Done
                            </Text>
                          </View>
                        ) : (
                          <>
                            {isUrgent && (
                              <View className="flex-row items-center px-3 py-1 bg-error-container rounded-full">
                                <AlertTriangle color="#93000a" size={12} fill="#93000a" className="mr-1" />
                                <Text className="text-on-error-container text-[10px] font-bold uppercase tracking-wider">
                                  {task.daysToComplete < 0 ? 'Overdue!' : 'Urgent'}
                                </Text>
                              </View>
                            )}
                            <View className="px-3 py-1 bg-[#fff8e1] border border-[#BA7517]/20 rounded-full">
                              <Text className="text-[#BA7517] text-[10px] font-bold uppercase tracking-wider">
                                {task.daysToComplete <= 0 ? 'Due soon' : `Due in ${task.daysToComplete} days`}
                              </Text>
                            </View>
                            <View className={`px-3 py-1 rounded-full ${isInProgress ? 'bg-tertiary-fixed' : 'bg-surface-container-highest'}`}>
                              <Text className={`${isInProgress ? 'text-on-tertiary-fixed-variant' : 'text-outline'} text-[10px] font-bold uppercase tracking-wider`}>
                                {isInProgress ? 'In Progress' : 'To Do'}
                              </Text>
                            </View>
                          </>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
