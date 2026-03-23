import { Tabs } from 'expo-router';
import React from 'react';
import { Home, CheckSquare, Zap, Compass, Settings, Bell } from 'lucide-react-native';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const tabWidth = screenWidth / 3;

  return (
    <View style={{
      height: 64 + Math.max(insets.bottom, 16),
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#E8E8E8',
      paddingBottom: Math.max(insets.bottom, 16),
      elevation: 0,
      shadowOpacity: 0
    }}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        pagingEnabled={true}
        bounces={false}
        decelerationRate="fast"
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          if (options.href === null) return null; // Hide tabs explicitly excluded

          const label = options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;

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

          const IconComponent = () => {
             let color = isFocused ? '#1B4F72' : '#9ca3af';
             switch(route.name) {
                case 'index': return <Home color={color} size={24} />;
                case 'checklist': return <CheckSquare color={color} size={24} />;
                case 'assistant': return <Zap color={color} size={24} fill={isFocused ? '#1B4F72' : 'transparent'} />;
                case 'settings': return <Settings color={color} size={24} />;
                case 'explore': return <Compass color={color} size={24} />;
                case 'notifications': return <Bell color={color} size={24} />;
                default: return <Home color={color} size={24} />;
             }
          };

          return (
             <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={{ width: tabWidth, alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}
             >
                <View className={`items-center justify-center ${isFocused ? 'border-t-2 border-[#1B4F72] pt-1 -mt-2.5' : 'pt-1'}`}>
                   {IconComponent()}
                </View>
                <Text style={{ color: isFocused ? '#1B4F72' : '#9ca3af', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4, fontFamily: 'Plus Jakarta Sans' }}>
                   {label}
                </Text>
             </TouchableOpacity>
          );
        })}
      </ScrollView>
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
      <Tabs.Screen name="checklist" options={{ title: 'Checklist' }} />
      <Tabs.Screen name="assistant" options={{ title: 'Assistant' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="notifications" options={{ title: 'Alerts' }} />
      <Tabs.Screen name="map" options={{ href: null }} />
    </Tabs>
  );
}
