import React from "react";
import { View, Text } from "react-native";
import { Star } from "lucide-react-native";
import { HandymanReview } from "@/types/handyman";

interface ReviewCardProps {
  review: HandymanReview;
  className?: string;
}

export function ReviewCard({ review, className = "" }: ReviewCardProps) {
  return (
    <View
      className={`bg-white dark:bg-card rounded-2xl p-4 border border-border/80 shadow-xs ${className}`}
    >
      {/* 5 Stars */}
      <View className="flex-row items-center gap-1 mb-2.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            color="#F59E0B"
            fill={star <= review.rating ? "#F59E0B" : "transparent"}
          />
        ))}
      </View>

      {/* Quote */}
      <Text className="text-xs text-foreground/80 dark:text-foreground/90 leading-relaxed italic mb-3">
        &ldquo;{review.comment}&rdquo;
      </Text>

      {/* Author */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-semibold text-muted-foreground">
          - {review.authorName}
        </Text>
        {review.createdAt && (
          <Text className="text-[11px] text-muted-foreground/70">
            {review.createdAt}
          </Text>
        )}
      </View>
    </View>
  );
}
