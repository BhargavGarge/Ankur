import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Text style={styles.logo}>ANKUR</Text>
        <Text style={styles.motto}>अंकुर · New Beginning</Text>

        {/* Spinner */}
        <View style={styles.spinnerContainer}>
          <Animated.View style={[styles.spinner, animatedStyle]}>
            <View style={styles.spinnerInner} />
          </Animated.View>
        </View>

        {/* Loading Message */}
        <Text style={styles.message}>{message}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    fontFamily: 'Fraunces',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1B4F72',
    letterSpacing: 2,
  },
  motto: {
    fontSize: 16,
    color: '#72787f',
    marginTop: 4,
  },
  spinnerContainer: {
    marginTop: 48,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#e0e0e0',
    borderTopColor: '#1B4F72',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderTopColor: '#0E6655',
  },
  message: {
    marginTop: 24,
    fontSize: 14,
    color: '#72787f',
  },
});