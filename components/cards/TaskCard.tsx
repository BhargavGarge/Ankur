import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight, CheckCircle2, Circle } from 'lucide-react-native';

export interface TaskCardProps {
  title: string;
  description: string;
  isComplete?: boolean;
  onPress?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  title, 
  description, 
  isComplete = false, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={!onPress}
      className={`flex-row items-center p-5 bg-surface-container-lowest rounded-2xl border mb-3 ${
        isComplete ? 'border-primary bg-selection-bg' : 'border-outline-variant'
      }`}
    >
      <View className="mr-5">
        {isComplete ? (
          <CheckCircle2 color="#1B4F72" size={24} />
        ) : (
          <Circle color="#9ca3af" size={24} />
        )}
      </View>
      <View className="flex-1 mr-2">
        <Text 
          className={`font-body font-bold text-[16px] mb-1 leading-tight ${
            isComplete ? 'text-primary' : 'text-on-surface'
          }`}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text 
          className="font-body text-on-surface-variant text-[14px]"
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
      <ChevronRight color="#9ca3af" size={20} />
    </TouchableOpacity>
  );
};
