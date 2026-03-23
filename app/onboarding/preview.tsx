import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { Menu, CheckCircle2, ChevronRight } from 'lucide-react-native';

const mockTasks = [
  { title: 'Register address (Anmeldung)', subtitle: 'Due in 9 days', dotColor: '#ba1a1a', subColor: '#ba1a1a' },
  { title: 'Open German bank account', subtitle: 'Ready to start', dotColor: '#0E6655', subColor: '#0E6655' },
  { title: 'Student health insurance', subtitle: 'Due in 12 days', dotColor: '#BA7517', subColor: '#BA7517' },
  { title: 'Enrolment at university', subtitle: 'Verified by Ankur', dotColor: '#0E6655', subColor: '#0E6655' },
  { title: 'Apply for transport pass', subtitle: 'Recommended first week', dotColor: '#0E6655', subColor: '#0E6655' },
];

export default function PreviewScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.userProfile);
  const setOnboarded = useAppStore((state) => state.setOnboarded);

  const handleFinish = () => {
    setOnboarded(true);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-6 h-16 bg-white border-b border-[#E8E8E8] z-50">
        <View className="flex-row items-center gap-4">
          <Menu color="#1B4F72" size={24} />
          <Text style={{ fontFamily: 'Fraunces' }} className="font-bold text-2xl tracking-tight text-[#1B4F72] ml-4">
            ANKUR
          </Text>
        </View>
        <View className="w-8 h-8 rounded-full overflow-hidden bg-surface-container border border-outline-variant">
           <View className="w-full h-full bg-slate-200" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        <View className="flex-col items-center px-6 py-12 relative overflow-hidden">
          
          <View className="max-w-xl w-full flex-col items-center text-center mb-12 relative z-10">
            <View className="bg-secondary-container px-4 py-1 rounded-full mb-2">
              <Text className="text-[#1f705f] font-sans text-xs font-bold uppercase tracking-widest">
                Step 10 of 10
              </Text>
            </View>
            <Text style={{ fontFamily: 'Fraunces' }} className="italic text-4xl text-primary leading-tight text-center mb-4">
              Your Germany checklist is ready
            </Text>
            <Text className="text-on-surface-variant font-sans text-lg text-center" style={{ maxWidth: 300 }}>
              We found 10 tasks personalised to <Text className="font-bold text-primary">{profile.city || 'Berlin'} + {profile.purpose || 'Student'}</Text>. Let's tackle them together.
            </Text>
          </View>

          {/* Summary Card */}
          <View className="w-full bg-surface-container-low rounded-[16px] p-8 border border-outline-variant mb-6 items-center flex-col">
            <CheckCircle2 color="#1B4F72" size={36} className="mb-4" />
            <Text style={{ fontFamily: 'Fraunces' }} className="text-xl text-primary mb-1 text-center">
              Your checklist for {profile.city || 'Berlin'}
            </Text>
            <Text className="font-sans text-sm uppercase tracking-widest text-on-surface-variant text-center">
              10 tasks to complete
            </Text>
          </View>

          {/* List Preview Card */}
          <View className="w-full bg-white border border-outline-variant rounded-[16px] overflow-hidden mb-12">
            <View className="flex-col">
              {mockTasks.map((task, i) => (
                <View key={i} className={`flex-row items-center p-5 ${i !== mockTasks.length - 1 ? 'border-b border-[#E8E8E8]' : ''}`}>
                  <View className="mr-4">
                    <View className="w-2 h-2 rounded-full" style={{ backgroundColor: task.dotColor }} />
                  </View>
                  <View className="flex-1">
                    <Text className="font-sans font-bold text-primary text-sm">{task.title}</Text>
                    <Text className="font-sans text-xs font-medium" style={{ color: task.subColor }}>{task.subtitle}</Text>
                  </View>
                  <ChevronRight color="#c1c7cf" size={20} />
                </View>
              ))}
            </View>
            <TouchableOpacity className="w-full py-4 items-center bg-surface-container-low border-t border-outline-variant">
              <Text className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-primary">
                See all 10 tasks
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* CTA Button */}
      <View className="absolute bottom-0 left-0 w-full p-6 pb-12 bg-white/95 items-center justify-center border-t border-[#E8E8E8]">
        <TouchableOpacity 
          onPress={handleFinish}
          className="w-full max-w-xl bg-primary py-5 rounded-[16px] items-center justify-center shadow-lg"
          style={{ shadowColor: '#1B4F72', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }}
        >
          <Text className="text-white font-sans font-bold uppercase tracking-widest text-sm">
            Let's go!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
