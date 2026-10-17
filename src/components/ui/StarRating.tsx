import React from "react";
import { View, Text } from "react-native";
import { Star } from "lucide-react-native";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  count,
  size = 14,
  showCount = true,
  className = "",
}: StarRatingProps) {
  return (
    <View className={`flex-row items-center gap-1 ${className}`}>
      <Star size={size} color="#F59E0B" fill="#F59E0B" />
      <Text className="text-xs font-bold text-foreground">
        {rating.toFixed(1)}
      </Text>
      {showCount && typeof count === "number" && (
        <Text className="text-[11px] font-medium text-muted-foreground underline">
          ({count})
        </Text>
      )}
    </View>
  );
}
