import { Tabs } from 'expo-router';
import React from 'react';
import { Home, Zap, Settings, Compass, Users, User } from 'lucide-react-native';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TABS = [
  { name: 'index', label: 'Home', Icon: Home },
  { name: 'assistant', label: 'Assistant', Icon: Zap },
  { name: 'explore', label: 'Explore', Icon: Compass },
  { name: 'communities', label: 'Community', Icon: Users },
  { name: 'profile', label: 'Profile', Icon: User },
];

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');
  const tabW = width / TABS.length;

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0.5,
        borderTopColor: '#E8E8E8',
        paddingBottom: Math.max(insets.bottom, 12),
        paddingTop: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        if (options.href === null) return null;

        const tab = TABS.find(t => t.name === route.name);
        if (!tab) return null;

        const isFocused = state.index === index;
        const color = isFocused ? '#1B4F72' : '#B0B8C1';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const { Icon } = tab;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            style={{
              width: tabW,
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 4,
            }}
          >
            {/* Active indicator dot above icon */}
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: isFocused ? '#1B4F72' : 'transparent',
                marginBottom: 6,
              }}
            />

            {/* Icon with subtle filled background when active */}
            <View
              style={{
                width: 40,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: isFocused ? '#EBF3FA' : 'transparent',
              }}
            >
              <Icon
                color={color}
                size={22}
                strokeWidth={isFocused ? 2.2 : 1.8}
              />
            </View>

            {/* Label */}
            <Text
              style={{
                color,
                fontSize: 10,
                fontWeight: isFocused ? '700' : '500',
                letterSpacing: 0.3,
                marginTop: 3,
                fontFamily: 'DMSans_500Medium',
              }}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="assistant" options={{ title: 'Assistant' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="communities" options={{ title: 'Community' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />

      {/* Hidden routes — accessible via router.push but not in tab bar */}
      <Tabs.Screen name="map" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="checklist" options={{ href: null }} />
    </Tabs>
  );
}