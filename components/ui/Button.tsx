import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'tertiary';
  disabled?: boolean;
  loading?: boolean;
  iconSuffix?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, onPress, variant = 'primary', disabled = false, loading = false, iconSuffix 
}) => {
  let bgClass = '';
  let borderClass = '';
  let textClass = 'font-bold text-[14px] uppercase text-center tracking-widest';

  if (variant === 'primary') {
    bgClass = 'bg-primary';
    textClass += ' text-white';
  } else if (variant === 'ghost') {
    bgClass = 'bg-transparent';
    borderClass = 'border border-outline-variant';
    textClass += ' text-primary';
  } else if (variant === 'tertiary') {
    bgClass = 'bg-transparent';
    textClass += ' text-primary';
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`w-full py-4 rounded-2xl flex-row items-center justify-center ${bgClass} ${borderClass} ${disabled ? 'opacity-50' : 'opacity-100'}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#1B4F72'} />
      ) : (
        <>
          <Text className={textClass} style={{ letterSpacing: 1.5 }}>{label}</Text>
          {iconSuffix && <View style={{ marginLeft: 8 }}>{iconSuffix}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};
