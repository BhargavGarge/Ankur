import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { FileText, MapPin, Sparkles, ArrowLeft, ChevronRight } from 'lucide-react-native';
import { TASKS } from '../../constants/tasks';
import { useAppStore } from '../../store/useAppStore';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const userTasks = useAppStore((state) => state.userTasks);

  const task = TASKS.find(t => t.id === id);
  const progress = userTasks[id as string];

  if (!task) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <Text className="font-headline text-xl text-primary mb-4">Task not found</Text>
        <Button label="Go Back" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const isDone = progress?.status === 'done';

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <TouchableOpacity onPress={() => router.back()} className="-ml-2 p-2 rounded-full">
          <ArrowLeft color="#1B4F72" size={24} />
        </TouchableOpacity>
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Task Overview</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 w-full" showsVerticalScrollIndicator={false}>
        <View className="mb-10">
          <View className="flex-row items-center mb-3">
            <Text className="font-headline italic text-4xl text-primary flex-1">{task.title}</Text>
            {isDone && (
              <View className="bg-green-100 px-3 py-1 rounded-full border border-green-200">
                <Text className="text-green-700 text-[10px] font-bold uppercase tracking-wider">Completed</Text>
              </View>
            )}
          </View>
          <Text className="font-body text-base text-on-surface-variant leading-relaxed">
            {task.description}
          </Text>
        </View>

        <View className="flex-row items-center gap-4 mb-6">
          <Text className="font-sans text-[11px] font-bold tracking-[0.2em] text-outline uppercase">Steps to Complete</Text>
          <View className="h-[1px] flex-1 bg-outline-variant" />
        </View>
        
        <TouchableOpacity 
          onPress={() => router.push(`/task/${id}/documents` as any)}
          className="bg-white border text-left border-outline-variant rounded-2xl p-5 flex-row items-center mb-3"
        >
          <View className="w-12 h-12 bg-surface-container-lowest rounded-full items-center justify-center border border-outline-variant mr-4">
            <FileText color="#1B4F72" size={20} />
          </View>
          <View className="flex-1 pr-4">
            <Text className="font-body text-base font-bold text-primary mb-1">Documents Checklist</Text>
            <Text className="font-body text-[13px] text-on-surface-variant">
              {progress?.docs_ready?.length || 0} of {task.documents.length} papers gathered
            </Text>
          </View>
          <ChevronRight color="#c1c7cf" size={20} />
        </TouchableOpacity>

        {task.fields && task.fields.length > 0 && (
          <TouchableOpacity 
            onPress={() => router.push(`/task/${id}/fields` as any)}
            className="bg-white border text-left border-outline-variant rounded-2xl p-5 flex-row items-center mb-3"
          >
            <View className="w-12 h-12 bg-surface-container-lowest rounded-full items-center justify-center border border-outline-variant mr-4">
              <Sparkles color="#1B4F72" size={20} />
            </View>
            <View className="flex-1 pr-4">
              <Text className="font-body text-base font-bold text-primary mb-1">Information & Details</Text>
              <Text className="font-body text-[13px] text-on-surface-variant">Store IBAN, addresses, and key dates</Text>
            </View>
            <ChevronRight color="#c1c7cf" size={20} />
          </TouchableOpacity>
        )}

        {task.officeInfo && (
          <TouchableOpacity 
            onPress={() => router.push(`/task/${id}/office` as any)}
            className="bg-white border text-left border-outline-variant rounded-2xl p-5 flex-row items-center mb-10"
          >
            <View className="w-12 h-12 bg-surface-container-lowest rounded-full items-center justify-center border border-outline-variant mr-4">
              <MapPin color="#1B4F72" size={20} />
            </View>
            <View className="flex-1 pr-4">
              <Text className="font-body text-base font-bold text-primary mb-1">Office Information</Text>
              <Text className="font-body text-[13px] text-on-surface-variant">{task.officeInfo.name} & Appointment links</Text>
            </View>
            <ChevronRight color="#c1c7cf" size={20} />
          </TouchableOpacity>
        )}

        <View className="bg-[#a5f2db]/20 rounded-2xl p-6 mb-8 mt-2 border border-[#a5f2db]/50">
          <View className="flex-row items-center mb-3">
            <View className="mr-3 p-2 bg-white rounded-full border border-[#a5f2db]">
              <Sparkles color="#166a59" size={20} />
            </View>
            <Text className="font-headline text-xl text-[#166a59]">Stuck or Confused?</Text>
          </View>
          <Text className="font-body text-[14px] text-[#1f705f] mb-6 leading-relaxed">
            Chat with the Ankur AI Assistant to instantly clarify bureaucratic terms, housing rules, or translation issues.
          </Text>
          <Button 
            label="Ask Ankur Assistant" 
            variant="ghost"
            onPress={() => router.push('/assistant' as any)}
          />
        </View>

        {!isDone && (
          <View className="mb-12">
            <Button 
              label="Mark as Complete" 
              onPress={() => router.push(`/task/${id}/done` as any)}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
