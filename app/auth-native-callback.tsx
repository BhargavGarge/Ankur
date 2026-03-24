import React from 'react';
import { View, ActivityIndicator } from 'react-native';

/**
 * Handle Clerk OAuth redirect callback to prevent "Unmatched Route" flash.
 * Clerk listener in _layout.tsx will handle the actual session resolution.
 */
export default function AuthNativeCallback() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
      <ActivityIndicator size="large" color="#1B4F72" />
    </View>
  );
}
