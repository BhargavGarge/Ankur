import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, SlidersHorizontal, List, Building2, CreditCard, BadgeInfo, ChevronRight, MapPin } from 'lucide-react-native';

// Safely import react-native-maps — not available in Expo Go
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;
try {
  const RNMaps = require('react-native-maps');
  MapView = RNMaps.default;
  Marker = RNMaps.Marker;
  PROVIDER_GOOGLE = RNMaps.PROVIDER_GOOGLE;
} catch (_) {
  // Running in Expo Go — native maps module not available
}

const INITIAL_REGION = {
  latitude: 52.5200,
  longitude: 13.4050,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const FILTERS = ['All', 'Registration', 'Banks', 'Health Insurance', 'Immigration', 'University'];

export default function MapScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-surface-container-lowest overflow-hidden border-b border-[#E8E8E8]" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Navigation Shell */}
      <View className="flex-row items-center justify-between w-full px-6 py-4 bg-white border-b border-[#E8E8E8] z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-slate-50 p-1 rounded-full -ml-2">
            <ArrowLeft color="#1B4F72" size={24} />
          </TouchableOpacity>
          <View className="flex-col">
            <Text style={{ fontFamily: 'Fraunces' }} className="text-2xl font-bold text-[#1B4F72] leading-tight">
              Nearby
            </Text>
            <Text className="font-sans text-[13px] text-slate-500">
              Offices and services for your tasks
            </Text>
          </View>
        </View>
        <TouchableOpacity className="hover:bg-slate-50 p-2 rounded-full border border-[#E8E8E8]">
          <SlidersHorizontal color="#475569" size={20} />
        </TouchableOpacity>
      </View>

      {/* Filter Chips Cluster */}
      <View className="bg-white py-3 border-b border-[#E8E8E8]">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} decelerationRate="fast" contentContainerStyle={{ paddingHorizontal: 24 }}>
          {FILTERS.map(f => (
            <TouchableOpacity 
              key={f}
              onPress={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-[20px] mr-2 ${
                activeFilter === f ? 'bg-[#1B4F72]' : 'bg-white border border-[#E8E8E8]'
              }`}
            >
              <Text className={`text-[12px] font-medium ${
                activeFilter === f ? 'text-white' : 'text-slate-600'
              }`}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map Section */}
      <View className="relative h-[486px] w-full bg-[#f0f2f5] overflow-hidden border-b border-[#E8E8E8]">
        {MapView ? (
          <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={INITIAL_REGION}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
          >
            {Marker && (
              <>
                <Marker coordinate={{ latitude: 52.5250, longitude: 13.4000 }}>
                  <Building2 color="#dc2626" size={32} />
                </Marker>
                <Marker coordinate={{ latitude: 52.5100, longitude: 13.4100 }}>
                  <CreditCard color="#1B4F72" size={32} />
                </Marker>
                <Marker coordinate={{ latitude: 52.5300, longitude: 13.4200 }}>
                  <BadgeInfo color="#BA7517" size={32} />
                </Marker>
              </>
            )}
          </MapView>
        ) : (
          /* Fallback for Expo Go — native maps not available */
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8edf3' }}>
            <View style={{ alignItems: 'center', gap: 10 }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#1B4F72', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin color="#ffffff" size={28} />
              </View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1B4F72', marginTop: 4 }}>
                Map view
              </Text>
              <Text style={{ fontSize: 12, color: '#64748b', textAlign: 'center', paddingHorizontal: 32 }}>
                Available in the full build.{'\n'}Use a custom dev client to see the map.
              </Text>
            </View>
          </View>
        )}

        {/* Floating List Toggle */}
        <TouchableOpacity className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full border border-[#E8E8E8] shadow-sm flex-row items-center gap-2">
          <Text className="text-sm font-medium text-[#1B4F72]">List view</Text>
          <List color="#1B4F72" size={16} />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View className="flex-1 bg-white rounded-t-[24px] -mt-6 z-10 border-x border-t border-[#E8E8E8] flex-col overflow-hidden">
        {/* Handle */}
        <View className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-4"></View>
        <ScrollView className="px-6 flex-1 pb-24" showsVerticalScrollIndicator={false}>
          <Text className="text-[15px] font-bold text-slate-900 mb-4 font-sans">
            4 places near you
          </Text>
          <View className="flex-col gap-1">
            {/* Item 1 */}
            <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-slate-50 px-2 -mx-2 rounded-xl">
              <View className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                <Building2 color="#dc2626" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-slate-900 leading-tight">Bürgeramt Mitte</Text>
                <Text className="text-[13px] text-slate-500">Registrierungsamt · 0.8 km away</Text>
              </View>
              <View className="flex-col items-end gap-1">
                <View className="px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-100">
                  <Text className="text-[#0E6655] text-[11px] font-bold">Open now</Text>
                </View>
                <ChevronRight color="#cbd5e1" size={20} />
              </View>
            </TouchableOpacity>

            {/* Item 2 */}
            <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-slate-50 px-2 -mx-2 rounded-xl">
              <View className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                <CreditCard color="#1B4F72" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-slate-900 leading-tight">DKB Bank Branch</Text>
                <Text className="text-[13px] text-slate-500">Bank account · 1.2 km</Text>
              </View>
              <View className="flex-col items-end gap-1">
                <View className="px-2 py-0.5 bg-amber-50 rounded-md border border-amber-100">
                  <Text className="text-[#BA7517] text-[11px] font-bold">Closes 6pm</Text>
                </View>
                <ChevronRight color="#cbd5e1" size={20} />
              </View>
            </TouchableOpacity>

            {/* Item 3 */}
            <TouchableOpacity className="flex-row items-center gap-4 py-4 px-2 -mx-2 rounded-xl">
              <View className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
                <BadgeInfo color="#BA7517" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-slate-900 leading-tight">Ausländerbehörde Berlin</Text>
                <Text className="text-[13px] text-slate-500">Residence permit · 2.1 km</Text>
              </View>
              <View className="flex-col items-end gap-1">
                <View className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200">
                  <Text className="text-slate-600 text-[11px] font-bold">By appointment</Text>
                </View>
                <ChevronRight color="#cbd5e1" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
