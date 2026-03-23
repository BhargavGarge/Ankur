import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { User, MapPin, Info, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsTab() {
  const profile = useAppStore((state) => state.userProfile);
  const setOnboarded = useAppStore((state) => state.setOnboarded);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          setOnboarded(false);
          router.replace('/splash' as any);
        },
      },
    ]);
  };

  const SettingsItem = ({ icon, title, value, onPress, isDestructive = false }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between p-5 bg-white border border-outline-variant rounded-2xl mb-3"
    >
      <View className="flex-row items-center gap-4">
        <View className={`w-10 h-10 rounded-full items-center justify-center border ${isDestructive ? 'bg-red-50 border-red-100' : 'bg-surface-container-lowest border-outline-variant'}`}>
          {icon}
        </View>
        <Text className={`font-body text-base font-bold ${isDestructive ? 'text-red-600' : 'text-primary'}`}>
          {title}
        </Text>
      </View>
      <View className="flex-row items-center gap-3">
        {value && <Text className="font-body text-sm text-on-surface-variant font-bold">{value}</Text>}
        {!isDestructive && <ChevronRight color="#c1c7cf" size={20} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top Navbar */}
      <View className="flex-row justify-between items-center px-6 h-14 bg-white border-b border-outline-variant z-50">
        <View className="w-8" />
        <Text className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Settings</Text>
        <TouchableOpacity onPress={handleLogout} className="active:opacity-70 p-2 -mr-2">
          <LogOut color="#1B4F72" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-10 pb-32 max-w-2xl mx-auto w-full" showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View className="bg-white border text-left border-outline-variant rounded-2xl p-6 flex-row items-center mb-10">
          <View className="w-16 h-16 bg-surface-container-low rounded-full items-center justify-center border border-outline-variant mr-5">
            <User color="#1B4F72" size={28} />
          </View>
          <View className="flex-1">
            <Text className="font-headline italic text-2xl text-primary">{profile.name || 'User'}</Text>
            <Text className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#BA7517] mt-1">{profile.purpose || 'Student'}</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-4 mb-4">
          <Text className="font-sans text-[11px] font-bold tracking-[0.2em] text-outline uppercase">Preferences</Text>
          <View className="h-[1px] flex-1 bg-outline-variant" />
        </View>

        <View className="mb-8">
          <SettingsItem
            icon={<MapPin color="#1B4F72" size={20} />}
            title="Location & University"
            value={profile.city || 'Set Location'}
            onPress={() => router.push('/settings/location' as any)}
          />
          <SettingsItem
            icon={<User color="#1B4F72" size={20} />}
            title="Edit Profile"
            onPress={() => router.push('/onboarding/profile' as any)}
          />
        </View>

        <View className="flex-row items-center gap-4 mb-4">
          <Text className="font-sans text-[11px] font-bold tracking-[0.2em] text-outline uppercase">Support</Text>
          <View className="h-[1px] flex-1 bg-outline-variant" />
        </View>

        <View className="mb-4">
          <SettingsItem
            icon={<Info color="#0E6655" size={20} />}
            title="About Ankur"
            onPress={() => router.push('/settings/about' as any)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
