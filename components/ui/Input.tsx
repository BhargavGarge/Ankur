import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full mb-6 relative">
      <Text className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1" style={{ letterSpacing: 2 }}>
        {label}
      </Text>
      <TextInput
        className={`w-full bg-transparent px-0 py-3 text-lg text-[#191c1e] transition-all border-b ${
          error ? 'border-red-500' : isFocused ? 'border-primary border-b-2' : 'border-outline-variant'
        }`}
        placeholderTextColor="#cbd5e1"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur && props.onBlur(e);
        }}
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};
