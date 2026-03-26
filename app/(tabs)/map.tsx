import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Linking,
  PanResponder,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { ArrowLeft, SlidersHorizontal, List, Building2, CreditCard, BadgeInfo, ChevronRight, MapPin } from 'lucide-react-native';
import { useAppStore } from '../../store/useAppStore';

// Safely import react-native-maps — not available in Expo Go
let MapView: any = null;
let Marker: any = null;
let Polyline: any = null;
let PROVIDER_GOOGLE: any = null;
try {
  const RNMaps = require('react-native-maps');
  MapView = RNMaps.default;
  Marker = RNMaps.Marker;
  Polyline = RNMaps.Polyline;
  PROVIDER_GOOGLE = RNMaps.PROVIDER_GOOGLE;
} catch (_) {
  // Running in Expo Go — native maps module not available
}

const FALLBACK_CITY_KEY = 'berlin';

// Coordinates are approximate (center of Rathaus/major city hall area).
// Replace later with precise DB-based office addresses if needed.
const RATHAUS_COORDS: Record<string, { latitude: number; longitude: number }> = {
  berlin: { latitude: 52.516274, longitude: 13.377704 }, // Rotes Rathaus
  munich: { latitude: 48.137154, longitude: 11.575478 }, // Neues Rathaus (Marienplatz)
  frankfurt: { latitude: 50.110644, longitude: 8.682127 }, // Römerberg / Stadthaus
  hamburg: { latitude: 53.548553, longitude: 9.994077 }, // Rathausmarkt
  stuttgart: { latitude: 48.775845, longitude: 9.182932 }, // Neues Rathaus area
  duesseldorf: { latitude: 51.227741, longitude: 6.773456 }, // Stadthaus (Hauptstraße area)
};

function normalizeCity(input?: string | null) {
  if (!input) return FALLBACK_CITY_KEY;
  const raw = input.trim().toLowerCase();

  // Your onboarding uses: Berlin, Munich, Frankfurt, Hamburg, Stuttgart, Düsseldorf
  const map: Record<string, string> = {
    berlin: 'berlin',
    münchen: 'munich',
    munchen: 'munich',
    munich: 'munich',
    frankfurt: 'frankfurt',
    hamburg: 'hamburg',
    stuttgart: 'stuttgart',
    'düsseldorf': 'duesseldorf',
    dusselfdorf: 'duesseldorf',
    duesseldorf: 'duesseldorf',
    dusseldorf: 'duesseldorf',
    köln: 'cologne',
    cologne: 'cologne',
  };

  if (map[raw]) return map[raw];

  const simplified = raw
    .replaceAll('ä', 'a')
    .replaceAll('ö', 'o')
    .replaceAll('ü', 'u')
    .replaceAll('ß', 'ss')
    .replaceAll('.', '')
    .replaceAll('-', '')
    .replaceAll(' ', '');

  if (map[simplified]) return map[simplified];
  return FALLBACK_CITY_KEY;
}

function haversineKm(
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number }
) {
  const R = 6371;
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;
  const lat1 = (from.latitude * Math.PI) / 180;
  const lat2 = (to.latitude * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function computeRegionFromPoints(
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number }
) {
  const latitudeDelta = Math.max(0.02, Math.abs(a.latitude - b.latitude) * 2.2);
  const longitudeDelta = Math.max(0.02, Math.abs(a.longitude - b.longitude) * 2.2);
  return {
    latitude: (a.latitude + b.latitude) / 2,
    longitude: (a.longitude + b.longitude) / 2,
    latitudeDelta,
    longitudeDelta,
  };
}

const FILTERS = ['All', 'Registration', 'Banks', 'Health Insurance', 'Immigration', 'University'];

export default function MapScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const { height: windowHeight } = useWindowDimensions();
  const expandedHeight = Math.max(280, Math.round(windowHeight * 0.42));
  const collapsedHeight = Math.max(220, Math.round(expandedHeight * 0.35));
  // Translate range: 0 => expanded, maxTranslateY => collapsed (show only the top portion).
  const maxTranslateY = Math.max(0, expandedHeight - collapsedHeight);
  const translateY = useRef(new Animated.Value(maxTranslateY)).current;
  const startTranslateYRef = useRef(maxTranslateY);
  const lastTranslateYRef = useRef(maxTranslateY);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          const { dx, dy } = gestureState;
          // Only set responder for intentional vertical drags.
          return Math.abs(dy) > 6 && Math.abs(dy) > Math.abs(dx);
        },
        onPanResponderGrant: () => {
          translateY.stopAnimation();
          startTranslateYRef.current = lastTranslateYRef.current;
        },
        onPanResponderMove: (_, gestureState) => {
          const next = startTranslateYRef.current + gestureState.dy;
          const clamped = Math.max(0, Math.min(maxTranslateY, next));
          translateY.setValue(clamped);
        },
        onPanResponderRelease: (_, gestureState) => {
          const next = startTranslateYRef.current + gestureState.dy;
          const clamped = Math.max(0, Math.min(maxTranslateY, next));
          const shouldExpand = clamped < maxTranslateY / 2;
          const finalY = shouldExpand ? 0 : maxTranslateY;
          lastTranslateYRef.current = finalY;
          Animated.spring(translateY, {
            toValue: finalY,
            useNativeDriver: false, // translateY is fine, but keep RN safe for gestures
            friction: 7,
          }).start();
        },
      }),
    [maxTranslateY, translateY]
  );

  const profileCity = useAppStore((state) => state.userProfile.city);
  const cityKey = normalizeCity(profileCity);
  const rathaus = RATHAUS_COORDS[cityKey] || RATHAUS_COORDS[FALLBACK_CITY_KEY];

  const mapRef = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'granted' | 'denied' | 'error'>(
    'idle'
  );

  const initialRegion = useMemo(
    () => ({
      latitude: rathaus.latitude,
      longitude: rathaus.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.06,
    }),
    [rathaus.latitude, rathaus.longitude]
  );

  const distanceKm = useMemo(() => {
    if (!userLocation) return null;
    return haversineKm(userLocation, rathaus);
  }, [userLocation, rathaus]);

  const directionsUrl = useMemo(() => {
    const destination = `${rathaus.latitude},${rathaus.longitude}`;
    const origin = userLocation ? `${userLocation.latitude},${userLocation.longitude}` : 'My+Location';
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(
      destination
    )}&travelmode=driving`;
  }, [rathaus.latitude, rathaus.longitude, userLocation]);

  useEffect(() => {
    let cancelled = false;

    const loadLocation = async () => {
      setLocationStatus('loading');
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (cancelled) return;

        if (status !== 'granted') {
          setLocationStatus('denied');
          return;
        }

        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (cancelled) return;
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocationStatus('granted');
      } catch (e) {
        if (cancelled) return;
        setLocationStatus('error');
      }
    };

    loadLocation();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!MapView) return;
    if (!mapRef.current) return;

    const nextRegion = userLocation ? computeRegionFromPoints(userLocation, rathaus) : initialRegion;
    mapRef.current.animateToRegion?.(nextRegion, 500);
  }, [initialRegion, rathaus, userLocation]);

  return (
    <SafeAreaView className="flex-1 relative bg-surface-container-lowest overflow-hidden border-b border-[#E8E8E8]" edges={['top', 'left', 'right']}>
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
            ref={mapRef}
            initialRegion={initialRegion}
            provider={PROVIDER_GOOGLE}
          >
            {Polyline && userLocation && (
              <Polyline
                coordinates={[userLocation, rathaus]}
                strokeColor="#1B4F72"
                strokeWidth={4}
                lineDashPattern={[10, 6]}
              />
            )}

            {Marker && userLocation && (
              <Marker coordinate={userLocation}>
                <MapPin color="#475569" size={32} />
              </Marker>
            )}

            {Marker && (
              <Marker coordinate={rathaus}>
                <Building2 color="#dc2626" size={32} />
              </Marker>
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

              <TouchableOpacity
                onPress={() => Linking.openURL(directionsUrl)}
                className="mt-3 bg-white border border-[#E8E8E8] rounded-full px-5 py-3"
              >
                <Text className="text-[#1B4F72] font-sans font-bold text-sm">
                  Directions to Rathaus
                </Text>
              </TouchableOpacity>

              {locationStatus === 'loading' && (
                <Text style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>Getting your location...</Text>
              )}
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
      <Animated.View
        className="absolute left-0 right-0 bg-white rounded-t-[24px] z-20 border-x border-t border-[#E8E8E8] flex-col overflow-hidden"
        style={{
          height: expandedHeight,
          zIndex: 20,
          elevation: 20,
          // translateY: 0 => expanded (bottom 0), maxTranslateY => collapsed (bottom negative)
          bottom: Animated.multiply(translateY, -1),
        }}
      >
        {/* Handle */}
        <Animated.View {...panResponder.panHandlers}>
          <View className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-4" />
        </Animated.View>
        <ScrollView className="px-6 flex-1 pb-24" showsVerticalScrollIndicator={false}>
          <Text className="text-[15px] font-bold text-slate-900 mb-4 font-sans">
            {profileCity ? `Offices near ${profileCity}` : 'Offices near you'}
          </Text>
          <View className="flex-col gap-1">
            {/* Item 1 */}
            <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-slate-50 px-2 -mx-2 rounded-xl">
              <View className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                <Building2 color="#dc2626" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-slate-900 leading-tight">
                  Bürgeramt ({profileCity || 'your city'})
                </Text>
                <Text className="text-[13px] text-slate-500">
                  Registrierungsamt{distanceKm !== null ? ` · ${distanceKm.toFixed(1)} km away` : ' · near you'}
                </Text>
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
                <Text className="text-[15px] font-bold text-slate-900 leading-tight">
                  Ausländerbehörde {profileCity || 'your city'}
                </Text>
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
      </Animated.View>
    </SafeAreaView>
  );
}
