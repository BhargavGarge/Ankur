import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import Svg, { Circle } from 'react-native-svg';
import { ChevronRight, CheckSquare, MessageSquare, MapPin, Bell } from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.userProfile);

  const radius = 65;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (3 / 10) * circumference;

  const currentDisplayDate = 'Monday, 24 October';

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
            {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'RK'}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
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
              <Text style={{ fontFamily: 'Fraunces' }} className="font-black text-4xl text-primary">
                3/10
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
             <Text className="text-xl font-bold text-primary">3</Text>
             <Text className="text-[11px] text-slate-500 uppercase tracking-tight mt-1">done</Text>
          </View>
          <View className="flex-1 bg-white border border-[#E8E8E8] rounded-2xl p-3 flex-col items-center">
             <Text className="text-xl font-bold text-primary">7</Text>
             <Text className="text-[11px] text-slate-500 uppercase tracking-tight mt-1">to do</Text>
          </View>
          <View className="flex-1 bg-white border border-[#E8E8E8] rounded-2xl p-3 flex-col items-center text-center">
             <Text className="text-xl font-bold text-primary">9</Text>
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
                      Anmeldung
                    </Text>
                    <View className="bg-red-50 px-2 py-0.5 rounded-full border border-red-100 flex-row items-center justify-center ml-2">
                       <Text className="text-red-600 text-[10px] font-bold uppercase tracking-wider">
                         Due in 9d
                       </Text>
                    </View>
                  </View>
                  <Text className="text-[13px] text-slate-600 leading-relaxed">
                    Register your permanent address at the local Bürgeramt office.
                  </Text>
                </View>
                <ChevronRight color="#cbd5e1" size={24} className="mt-1" />
             </View>
             <TouchableOpacity 
               onPress={() => router.push('/task/1')}
               className="w-full border-t border-[#E8E8E8] py-3 items-center justify-center bg-white active:bg-slate-50"
             >
                <Text className="text-primary font-bold text-[12px] uppercase tracking-widest">
                  View task
                </Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming deadlines */}
        <View className="mb-8">
          <Text className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Upcoming deadlines
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} decelerationRate="fast" snapToInterval={152} contentContainerStyle={{ paddingLeft: 24, paddingRight: 24 }}>
            <View className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex-col min-w-[140px] mr-3">
              <Text className="text-[13px] font-bold text-red-800 mb-1">Bank Account</Text>
              <Text className="text-[11px] text-red-600">3 days left</Text>
            </View>
            <View className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex-col min-w-[140px] mr-3">
              <Text className="text-[13px] font-bold text-amber-800 mb-1">Health Insurance</Text>
              <Text className="text-[11px] text-amber-600">12 days left</Text>
            </View>
            <View className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex-col min-w-[140px]">
              <Text className="text-[13px] font-bold text-slate-700 mb-1">Phone Plan</Text>
              <Text className="text-[11px] text-slate-500">21 days left</Text>
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions Grid */}
        <View className="mb-12">
          <Text className="font-sans text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
            Quick Actions
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
