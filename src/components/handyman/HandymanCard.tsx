import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Heart, MapPin } from "lucide-react-native";
import { Handyman } from "@/types/handyman";
import { StarRating } from "@/components/ui/StarRating";
import { IconButton } from "@/components/ui/IconButton";

interface HandymanCardProps {
  handyman: Handyman;
  onPress: () => void;
  onFavoritePress?: (id: string, isFav: boolean) => void;
  isFavoriteInitial?: boolean;
}

export function HandymanCard({
  handyman,
  onPress,
  onFavoritePress,
  isFavoriteInitial = false,
}: HandymanCardProps) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);

  const toggleFavorite = (e: any) => {
    e.stopPropagation?.();
    const next = !isFavorite;
    setIsFavorite(next);
    onFavoritePress?.(handyman.id, next);
  };

  return (
    <Pressable
      onPress={onPress}
      className="w-64 bg-card rounded-3xl p-3 border border-border/80 shadow-sm mr-4 active:scale-[0.98] transition-transform"
    >
      {/* Hero Image Container */}
      <View className="relative w-full h-40 rounded-2xl overflow-hidden bg-muted">
        <Image
          source={{ uri: handyman.avatar }}
          className="w-full h-full"
          contentFit="cover"
          transition={250}
        />
        {/* Floating Heart Button */}
        <View className="absolute top-2.5 right-2.5">
          <IconButton
            icon={
              <Heart
                size={16}
                color={isFavorite ? "#EF4444" : "#475569"}
                fill={isFavorite ? "#EF4444" : "transparent"}
              />
            }
            size={36}
            variant="glass"
            onPress={toggleFavorite}
          />
        </View>
      </View>

      {/* Content */}
      <View className="mt-3 px-1">
        {/* Name and Rating */}
        <View className="flex-row items-center justify-between">
          <Text
            className="text-base font-bold text-foreground flex-1 mr-2"
            numberOfLines={1}
          >
            {handyman.name}
          </Text>
          <StarRating rating={handyman.rating} count={handyman.reviewCount} />
        </View>

        {/* Category / Subtitle */}
        <Text className="text-xs text-muted-foreground mt-0.5 font-medium">
          {handyman.categoryLabel || handyman.title.split("-")[0]?.trim()}
        </Text>

        {/* Price & Distance */}
        <View className="flex-row items-center justify-between mt-3 pt-2.5 border-t border-border/40">
          <Text className="text-sm font-bold text-primary">
            ${handyman.hourlyRate.toFixed(2)}
            <Text className="text-xs text-muted-foreground font-normal">/Hr</Text>
          </Text>

          <View className="flex-row items-center gap-1">
            <MapPin size={12} color="#94A3B8" />
            <Text className="text-xs text-muted-foreground font-medium">
              {handyman.distanceKm} km
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
