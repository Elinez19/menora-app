import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { Search, X, SlidersHorizontal } from "lucide-react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onFilterPress?: () => void;
  showFilterButton?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search service here...",
  onClear,
  onFilterPress,
  showFilterButton = false,
  className = "",
}: SearchBarProps) {
  return (
    <View
      className={`h-12 flex-row items-center bg-white dark:bg-card rounded-full px-4 border border-border shadow-xs ${className}`}
    >
      <Search size={18} color="#94A3B8" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        className="flex-1 ml-2.5 text-sm text-foreground font-medium py-0"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => {
            onChangeText("");
            onClear?.();
          }}
          className="p-1 rounded-full bg-muted mr-1"
        >
          <X size={14} color="#64748B" />
        </Pressable>
      )}
      {showFilterButton && (
        <Pressable
          onPress={onFilterPress}
          className="p-1.5 ml-1 rounded-full bg-secondary active:opacity-75"
        >
          <SlidersHorizontal size={16} color="#4F6BFF" />
        </Pressable>
      )}
    </View>
  );
}
