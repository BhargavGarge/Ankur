import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { TASKS } from '../../constants/tasks';
import Svg, { Circle } from 'react-native-svg';
import { ChevronRight, CheckSquare, MessageSquare, MapPin, Bell } from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.userProfile);
  const userTasks = useAppStore((state) => state.userTasks);

  const radius = 65;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate real progress
  const { totalTasks, doneTasks, progressPercent } = useMemo(() => {
    const total = TASKS.length;
    const done = Object.values(userTasks).filter(t => t.status === 'done').length;
    return {
      totalTasks: total,
      doneTasks: done,
      progressPercent: total > 0 ? (done / total) : 0
    };
  }, [userTasks]);

  const strokeDashoffset = circumference - progressPercent * circumference;

  const currentDisplayDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  // Find the next task (the first one that isn't 'done')
  const nextTask = useMemo(() => {
    return TASKS.find(task => {
      const progress = userTasks[task.id];
      return !progress || progress.status !== 'done';
    }) || TASKS[0];
  }, [userTasks]);

  const nextTaskProgress = userTasks[nextTask.id];

  // Residence Permit Countdown Logic
  const residencePermitData = userTasks['residence-permit']?.data;
  const expiryDateStr = residencePermitData?.permit_expiry;
  
  const countdownInfo = useMemo(() => {
    if (!expiryDateStr) return null;
    
    const expiryDate = new Date(expiryDateStr);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { days: 0, status: 'EXPIRED', color: '#ef4444' };
    if (daysLeft <= 30) return { days: daysLeft, status: 'URGENT', color: '#ef4444' };
    if (daysLeft <= 90) return { days: daysLeft, status: 'WARNING', color: '#f97316' };
    if (daysLeft <= 180) return { days: daysLeft, status: 'SOON', color: '#1B4F72' };
    
    return { days: daysLeft, status: 'OK', color: '#10b981' };
  }, [expiryDateStr]);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9fb" />
      
      {/* TopAppBar Execution */}
      <View className="z-50 flex-row justify-between items-center px-6 h-16 bg-white border-b border-[#E8E8E8]">
        <View className="flex-col">
          <Text className="text-[14px] text-slate-500 font-sans">
            Good morning, {profile.name || 'User'}
          </Text>
          <Text className="text-[12px] text-slate-400 font-sans">
            {currentDisplayDate}
          </Text>
        </View>
        <View className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Text className="text-white font-bold text-sm">
            {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'U'}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Residence Permit Countdown Alert */}
        {countdownInfo && (countdownInfo.status !== 'OK') && (
          <TouchableOpacity 
            onPress={() => router.push('/task/residence-permit' as any)}
            className="mb-8 rounded-3xl p-5 flex-row items-center border"
            style={{ 
              backgroundColor: countdownInfo.status === 'URGENT' || countdownInfo.status === 'EXPIRED' ? '#fef2f2' : '#fff7ed',
              borderColor: countdownInfo.color + '40'
            }}
          >
            <View className="w-12 h-12 rounded-full items-center justify-center mr-4" style={{ backgroundColor: countdownInfo.color + '20' }}>
              <Bell color={countdownInfo.color} size={24} />
            </View>
            <View className="flex-1">
              <Text className="font-sans text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: countdownInfo.color }}>
                {countdownInfo.status} REMINDER
              </Text>
              <Text className="font-headline text-lg text-slate-900 leading-tight">
                {countdownInfo.days} days until visa expiry
              </Text>
              <Text className="font-sans text-[12px] text-slate-500 mt-1">
                {countdownInfo.status === 'SOON' ? 'Time to check appointment dates.' : 'Book your appointment immediately.'}
              </Text>
            </View>
            <ChevronRight color={countdownInfo.color} size={20} />
          </TouchableOpacity>
        )}

        {/* Progress Hero Section */}
        <View className="flex-col items-center justify-center py-4 mb-8">
          <View className="relative w-[140px] h-[140px]">
            <Svg height="140" width="140" style={{ transform: [{ rotate: '-90deg' }] }}>
              <Circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#E8E8E8"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <Circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#1B4F72"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <View className="absolute inset-0 flex-col items-center justify-center">
              <Text className="font-black text-4xl text-primary font-headline">
                {doneTasks}/{totalTasks}
              </Text>
              <Text className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
                Tasks
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-between mb-8" style={{ gap: 12 }}>
          <View className="flex-1 bg-white border border-[#E8E8E8] rounded-2xl p-3 flex-col items-center">
             <Text className="text-xl font-bold text-primary">{doneTasks}</Text>
             <Text className="text-[11px] text-slate-500 uppercase tracking-tight mt-1">done</Text>
          </View>
          <View className="flex-1 bg-white border border-[#E8E8E8] rounded-2xl p-3 flex-col items-center">
             <Text className="text-xl font-bold text-primary">{totalTasks - doneTasks}</Text>
             <Text className="text-[11px] text-slate-500 uppercase tracking-tight mt-1">to do</Text>
          </View>
          <View className="flex-1 bg-white border border-[#E8E8E8] rounded-2xl p-3 flex-col items-center text-center">
             <Text className="text-xl font-bold text-primary">
               {nextTask.daysToComplete}
             </Text>
             <Text className="text-[11px] text-slate-500 leading-none mt-1">days left</Text>
          </View>
        </View>

        {/* Urgent Task Card */}
        <View className="mb-8">
          <Text className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Up Next
          </Text>
          <View className="bg-white border-[#E8E8E8] border rounded-2xl overflow-hidden" style={{ borderLeftWidth: 3, borderLeftColor: '#1B4F72' }}>
             <View className="p-5 flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <View className="flex-row items-center gap-2 mb-2">
                    <Text style={{ fontFamily: 'Fraunces' }} className="font-bold text-lg text-primary">
                      {nextTask.title}
                    </Text>
                    {nextTask.daysToComplete <= 10 && (
                      <View className="bg-red-50 px-2 py-0.5 rounded-full border border-red-100 flex-row items-center justify-center ml-2">
                         <Text className="text-red-600 text-[10px] font-bold uppercase tracking-wider">
                           Due in {nextTask.daysToComplete}d
                         </Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-[13px] text-slate-600 leading-relaxed">
                    {nextTask.description}
                  </Text>
                </View>
                <ChevronRight color="#cbd5e1" size={24} className="mt-1" />
             </View>
             <TouchableOpacity 
               onPress={() => router.push(`/task/${nextTask.id}` as any)}
               className="w-full border-t border-[#E8E8E8] py-3 items-center justify-center bg-white active:bg-slate-50"
             >
                <Text className="text-primary font-bold text-[12px] uppercase tracking-widest">
                  {nextTaskProgress?.status === 'in_progress' ? 'Continue Task' : 'View Task'}
                </Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Tasks */}
        <View className="mb-8">
          <Text className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            More Tasks
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} decelerationRate="fast" snapToInterval={152} contentContainerStyle={{ paddingLeft: 0, paddingRight: 24 }}>
            {TASKS.filter(t => t.id !== nextTask.id).map(task => {
              const progress = userTasks[task.id];
              const isDone = progress?.status === 'done';
              
              return (
                <TouchableOpacity 
                  key={task.id}
                  onPress={() => router.push(`/task/${task.id}` as any)}
                  className={`${isDone ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-200'} border rounded-xl px-4 py-3 flex-col min-w-[140px] mr-3`}
                >
                  <Text className={`text-[13px] font-bold ${isDone ? 'text-green-800' : 'text-slate-700'} mb-1`}>{task.title}</Text>
                  <Text className={`text-[11px] ${isDone ? 'text-green-600' : 'text-slate-500'}`}>
                    {isDone ? 'Completed' : `${task.daysToComplete} days left`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Quick Actions Grid */}
        <View className="mb-12">
          <Text className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Tools & Support
          </Text>
          <View className="flex-row flex-wrap justify-between" style={{ gap: 16 }}>
            <TouchableOpacity onPress={() => router.push('/checklist')} className="bg-white border border-[#E8E8E8] rounded-2xl p-5 flex-col items-center justify-center" style={{ width: '47%' }}>
               <CheckSquare color="#1B4F72" size={28} className="mb-3" />
               <Text className="text-[12px] font-bold text-slate-700 font-sans uppercase tracking-wider">
                 Checklist
               </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push('/assistant')} className="bg-white border border-[#E8E8E8] rounded-2xl p-5 flex-col items-center justify-center" style={{ width: '47%' }}>
               <MessageSquare color="#1B4F72" size={28} className="mb-3" />
               <Text className="text-[12px] font-bold text-slate-700 font-sans uppercase tracking-wider">
                 Assistant
               </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/map')} className="bg-white border border-[#E8E8E8] rounded-2xl p-5 flex-col items-center justify-center" style={{ width: '47%' }}>
               <MapPin color="#1B4F72" size={28} className="mb-3" />
               <Text className="text-[12px] font-bold text-slate-700 font-sans uppercase tracking-wider">
                 Offices
               </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/notifications')} className="bg-white border border-[#E8E8E8] rounded-2xl p-5 flex-col items-center justify-center" style={{ width: '47%' }}>
               <Bell color="#1B4F72" size={28} className="mb-3" />
               <Text className="text-[12px] font-bold text-slate-700 font-sans uppercase tracking-wider">
                 Alerts
               </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
