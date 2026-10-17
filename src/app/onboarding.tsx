import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuthUser } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react-native";

interface OnboardingSlide {
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    title: "Browse Local Service",
    subtitle:
      "Enjoy a seamless and transparent booking experience where users can explore verified local handymen, electricians, and plumbers.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
    badge: "Verified Professionals",
  },
  {
    title: "Uber-Fast Dispatch",
    subtitle:
      "Need urgent pipe repairs or power restoration? Dispatch certified local artisans to your doorstep with live GPS arrival tracking.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
    badge: "Live ETA & Tracking",
  },
  {
    title: "Upfront Honest Pricing",
    subtitle:
      "Clear hourly rates with zero surprise charges. Pay securely through the app once the job is inspected and completed.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
    badge: "100% Quality Guarantee",
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { continueAsGuest } = useAuthUser();

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      router.push("/(auth)/welcome");
    }
  };

  const handleGuestMode = async () => {
    await continueAsGuest();
    router.replace("/(tabs)");
  };

  const slide = SLIDES[currentSlide];

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Background Graphic & Map Vibe (Matching Screen 1) */}
      <View className="absolute top-0 left-0 right-0 h-3/5 bg-secondary/50 overflow-hidden">
        {/* Subtle Map Grid Overlay */}
        <View className="absolute inset-0 opacity-15">
          <View className="w-full h-full flex-row flex-wrap">
            {Array.from({ length: 48 }).map((_, i) => (
              <View
                key={i}
                className="w-1/6 h-20 border border-primary/20"
              />
            ))}
          </View>
        </View>

        {/* Brand App Name Header */}
        <SafeAreaView edges={["top"]} className="items-center pt-4 z-10">
          <Text className="text-xl font-bold text-foreground/80 tracking-wider">
            Homa
          </Text>
        </SafeAreaView>

        {/* Handyman Hero Image */}
        <View className="flex-1 items-center justify-end">
          <Image
            source={{ uri: slide.image }}
            className="w-full h-full max-h-[360px]"
            contentFit="cover"
            transition={300}
          />
          {/* Bottom Gradient Fade */}
          <View className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </View>
      </View>

      {/* Bottom Content Card */}
      <View className="flex-1 justify-end">
        <SafeAreaView
          edges={["bottom"]}
          className="bg-card rounded-t-3xl pt-8 pb-6 px-8 border-t border-border/60 shadow-xl"
        >
          {/* Badge */}
          <View className="self-center mb-3 flex-row items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <Sparkles size={13} color="#4F6BFF" />
            <Text className="text-xs font-semibold text-primary">
              {slide.badge}
            </Text>
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-center text-foreground mb-3 tracking-tight">
            {slide.title}
          </Text>

          {/* Subtitle description */}
          <Text className="text-sm text-center text-muted-foreground leading-relaxed mb-6 px-2">
            {slide.subtitle}
          </Text>

          {/* Pagination Dots */}
          <View className="flex-row justify-center items-center gap-2 mb-8">
            {SLIDES.map((_, idx) => (
              <Pressable
                key={idx}
                onPress={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all ${
                  currentSlide === idx
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-border"
                }`}
              />
            ))}
          </View>

          {/* Actions */}
          <View className="gap-3.5">
            <Button
              title={
                currentSlide === SLIDES.length - 1 ? "Get Started" : "Continue"
              }
              variant="primary"
              size="lg"
              onPress={handleNext}
              className="w-full"
            />

            <Pressable
              onPress={handleGuestMode}
              className="py-2.5 items-center active:opacity-70"
            >
              <Text className="text-xs font-semibold text-muted-foreground">
                Skip & Explore as Guest
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
