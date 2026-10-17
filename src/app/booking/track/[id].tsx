import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Navigation,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MapPin,
} from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { MOCK_HANDYMEN } from "@/constants/mockData";
import { toast } from "sonner-native";

export default function TrackingScreen() {
  const pro = MOCK_HANDYMEN[0]; // Syeila

  const [etaMinutes, setEtaMinutes] = useState(14);

  // Simulate arrival countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleCall = () => {
    toast.info(`Calling ${pro.name} at +1 (555) 019-2834...`);
  };

  const handleChat = () => {
    router.push("/(tabs)/chat");
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* TOP SIMULATED MAP AREA */}
      <View className="h-2/5 bg-secondary/80 relative overflow-hidden">
        {/* Map Grid Texture */}
        <View className="absolute inset-0 opacity-20">
          <View className="w-full h-full flex-row flex-wrap">
            {Array.from({ length: 32 }).map((_, i) => (
              <View
                key={i}
                className="w-1/4 h-20 border border-primary/20"
              />
            ))}
          </View>
        </View>

        {/* Back Button */}
        <SafeAreaView
          edges={["top"]}
          className="absolute top-2 left-5 z-20"
        >
          <Pressable
            onPress={() => router.replace("/(tabs)")}
            className="h-10 w-10 rounded-full bg-white shadow-md items-center justify-center active:opacity-75"
          >
            <ArrowLeft size={18} color="#0F172A" />
          </Pressable>
        </SafeAreaView>

        {/* Map Center Pins: Artisan & Destination */}
        <View className="flex-1 items-center justify-center relative">
          {/* Destination Pin (Customer Home) */}
          <View className="items-center">
            <View className="h-10 w-10 rounded-full bg-primary items-center justify-center shadow-lg border-2 border-white">
              <MapPin size={20} color="#FFFFFF" />
            </View>
            <View className="bg-card px-2 py-0.5 rounded-md mt-1 border border-border shadow-xs">
              <Text className="text-[10px] font-bold text-foreground">
                Your Location
              </Text>
            </View>
          </View>

          {/* Artisan Moving Pin */}
          <View className="absolute top-1/4 right-1/4 items-center">
            <View className="h-12 w-12 rounded-full bg-success items-center justify-center shadow-lg border-2 border-white">
              <Navigation size={22} color="#FFFFFF" className="rotate-45" />
            </View>
            <View className="bg-success px-2 py-0.5 rounded-full mt-1 shadow-xs">
              <Text className="text-[10px] font-bold text-white">
                {pro.name.split(" ")[0]} ({etaMinutes}m)
              </Text>
            </View>
          </View>
        </View>

        {/* Floating ETA Pill */}
        <View className="absolute bottom-4 left-5 right-5 bg-card/95 backdrop-blur-md p-3.5 rounded-2xl border border-border/80 flex-row items-center justify-between shadow-md">
          <View className="flex-row items-center gap-2.5">
            <View className="h-9 w-9 rounded-full bg-primary/10 items-center justify-center">
              <Clock size={18} color="#4F6BFF" />
            </View>
            <View>
              <Text className="text-xs text-muted-foreground font-medium">
                Estimated Arrival
              </Text>
              <Text className="text-base font-bold text-foreground">
                {etaMinutes} Minutes away
              </Text>
            </View>
          </View>

          <View className="bg-success/15 px-3 py-1 rounded-full">
            <Text className="text-xs font-bold text-success uppercase">
              On the way
            </Text>
          </View>
        </View>
      </View>

      {/* BOTTOM TRACKING & DISPATCH DETAILS */}
      <ScrollView
        className="flex-1 bg-card rounded-t-3xl border-t border-border/80 px-5 pt-5 -mt-3 shadow-xl"
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        {/* Artisan Profile Card */}
        <View className="flex-row items-center justify-between pb-4 border-b border-border/60">
          <View className="flex-row items-center gap-3.5">
            <View className="h-14 w-14 rounded-2xl overflow-hidden bg-muted">
              <Image
                source={{ uri: pro.avatar }}
                className="w-full h-full"
                contentFit="cover"
              />
            </View>
            <View>
              <Text className="text-base font-bold text-foreground">
                {pro.name}
              </Text>
              <Text className="text-xs text-muted-foreground mt-0.5">
                Master Plumber • ★ {pro.rating}
              </Text>
              <Text className="text-xs text-primary font-medium mt-0.5">
                White Ford Transit (Van #829)
              </Text>
            </View>
          </View>

          {/* Quick Communication Buttons */}
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={handleCall}
              className="h-10 w-10 rounded-full bg-secondary items-center justify-center active:scale-95"
            >
              <Phone size={18} color="#4F6BFF" />
            </Pressable>
            <Pressable
              onPress={handleChat}
              className="h-10 w-10 rounded-full bg-primary items-center justify-center active:scale-95 shadow-xs"
            >
              <MessageSquare size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Live Status Stepper */}
        <View className="py-5 border-b border-border/60">
          <Text className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Live Dispatch Progress
          </Text>

          <View className="gap-3.5">
            {/* Step 1 */}
            <View className="flex-row items-center gap-3">
              <View className="h-6 w-6 rounded-full bg-success items-center justify-center">
                <CheckCircle2 size={14} color="#FFFFFF" />
              </View>
              <Text className="text-xs font-semibold text-foreground">
                Job Request Accepted by {pro.name.split(" ")[0]}
              </Text>
            </View>

            {/* Step 2 */}
            <View className="flex-row items-center gap-3">
              <View className="h-6 w-6 rounded-full bg-primary items-center justify-center animate-pulse">
                <Navigation size={12} color="#FFFFFF" />
              </View>
              <Text className="text-xs font-bold text-primary">
                Artisan is En Route ({etaMinutes} mins)
              </Text>
            </View>

            {/* Step 3 */}
            <View className="flex-row items-center gap-3 opacity-40">
              <View className="h-6 w-6 rounded-full bg-muted items-center justify-center">
                <View className="h-2 w-2 rounded-full bg-muted-foreground" />
              </View>
              <Text className="text-xs font-medium text-foreground">
                Arrival & On-site Diagnostic
              </Text>
            </View>

            {/* Step 4 */}
            <View className="flex-row items-center gap-3 opacity-40">
              <View className="h-6 w-6 rounded-full bg-muted items-center justify-center">
                <View className="h-2 w-2 rounded-full bg-muted-foreground" />
              </View>
              <Text className="text-xs font-medium text-foreground">
                Service Completion & Sign-off
              </Text>
            </View>
          </View>
        </View>

        {/* Address and Safety Note */}
        <View className="pt-4 gap-3">
          <View className="flex-row items-center gap-2">
            <ShieldCheck size={16} color="#10B981" />
            <Text className="text-xs text-muted-foreground">
              All visits adhere to Homa Verified Professional Safety Standards.
            </Text>
          </View>

          <Button
            title="Return to Home Feed"
            variant="secondary"
            size="md"
            onPress={() => router.replace("/(tabs)")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
