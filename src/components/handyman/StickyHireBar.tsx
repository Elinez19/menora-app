import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface StickyHireBarProps {
  price: number;
  handymanName: string;
  onHire: () => void;
  className?: string;
}

export function StickyHireBar({
  price,
  handymanName,
  onHire,
  className = "",
}: StickyHireBarProps) {
  const firstName = handymanName.split(" ")[0];

  return (
    <SafeAreaView
      edges={["bottom"]}
      className={`bg-white dark:bg-card border-t border-border/80 px-6 py-3.5 shadow-lg ${className}`}
    >
      <View className="flex-row items-center justify-between">
        {/* Price Tag */}
        <View>
          <Text className="text-xs text-muted-foreground font-medium">Price</Text>
          <Text className="text-xl font-bold text-foreground">
            ${price.toFixed(2)}
            <Text className="text-xs font-normal text-muted-foreground">/ Hr</Text>
          </Text>
        </View>

        {/* Action Button */}
        <Pressable
          onPress={onHire}
          className="h-12 px-8 rounded-full bg-primary items-center justify-center shadow-md active:opacity-90"
        >
          <Text className="text-base font-bold text-white tracking-wide">
            Hire {firstName}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
