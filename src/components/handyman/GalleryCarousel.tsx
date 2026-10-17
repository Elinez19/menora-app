import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Image } from "expo-image";

interface GalleryCarouselProps {
  images: string[];
  className?: string;
}

export function GalleryCarousel({
  images,
  className = "",
}: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [""];

  return (
    <View className={`relative w-full ${className}`}>
      {/* Main Hero Photo Container */}
      <View className="w-full h-80 bg-muted overflow-hidden">
        <Image
          source={{ uri: displayImages[activeIndex] }}
          className="w-full h-full"
          contentFit="cover"
          transition={300}
        />

        {/* Thumbnail Preview Floating Box (Matching Screen 3) */}
        {displayImages.length > 1 && (
          <View className="absolute bottom-6 right-5 flex-row gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            {displayImages.slice(0, 3).map((img, idx) => (
              <Pressable
                key={idx}
                onPress={() => setActiveIndex(idx)}
                className={`h-12 w-12 rounded-xl overflow-hidden border-2 ${
                  activeIndex === idx ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  source={{ uri: img }}
                  className="w-full h-full"
                  contentFit="cover"
                />
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Pagination Dots */}
      {displayImages.length > 1 && (
        <View className="flex-row justify-center items-center gap-1.5 py-3">
          {displayImages.map((_, idx) => (
            <Pressable
              key={idx}
              onPress={() => setActiveIndex(idx)}
              className={`rounded-full transition-all ${
                activeIndex === idx
                  ? "w-5 h-2 bg-primary"
                  : "w-2 h-2 bg-border"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
