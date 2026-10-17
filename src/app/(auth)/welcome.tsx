import React from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuthUser } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Wrench, ArrowRight, UserCheck, Compass } from "lucide-react-native";

export default function WelcomeScreen() {
  const { continueAsGuest } = useAuthUser();

  const handleGuest = async () => {
    await continueAsGuest();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-6 justify-between py-6">
      <StatusBar barStyle="dark-content" />

      {/* Brand Header */}
      <View className="items-center mt-8">
        <View className="h-20 w-20 rounded-3xl bg-primary items-center justify-center shadow-lg shadow-primary/30 mb-5">
          <Wrench size={38} color="#FFFFFF" />
        </View>
        <Text className="text-3xl font-bold text-foreground tracking-tight">
          Homa
        </Text>
        <Text className="text-xs uppercase tracking-widest text-primary font-bold mt-1.5">
          Verified Artisans On Demand
        </Text>
        <Text className="text-sm text-center text-muted-foreground mt-3 px-4 leading-relaxed">
          Book trusted plumbers, electricians, carpenters, and handymen near you with live Uber-style arrival tracking.
        </Text>
      </View>

      {/* Hero Visual Card */}
      <View className="bg-card rounded-3xl p-5 border border-border/80 shadow-xs gap-3">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 rounded-full bg-secondary items-center justify-center">
            <UserCheck size={20} color="#4F6BFF" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-foreground">
              Background Checked Pros
            </Text>
            <Text className="text-xs text-muted-foreground">
              Every artisan is identity verified and rated by local homeowners.
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3 pt-2 border-t border-border/50">
          <View className="h-10 w-10 rounded-full bg-secondary items-center justify-center">
            <Compass size={20} color="#4F6BFF" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-foreground">
              Instant or Scheduled Dispatch
            </Text>
            <Text className="text-xs text-muted-foreground">
              Get someone at your door in 20 minutes or book for the weekend.
            </Text>
          </View>
        </View>
      </View>

      {/* Action Options */}
      <View className="gap-3 mb-4">
        {/* Create Account */}
        <Button
          title="Create an Account"
          variant="primary"
          size="lg"
          onPress={() => router.push("/(auth)/role-select")}
        />

        {/* Sign In */}
        <Button
          title="Sign In"
          variant="secondary"
          size="md"
          onPress={() => router.push("/(auth)/sign-in")}
        />

        {/* Guest Mode */}
        <Pressable
          onPress={handleGuest}
          className="h-12 flex-row items-center justify-center rounded-full bg-muted/60 active:opacity-75"
        >
          <Text className="text-sm font-semibold text-foreground mr-1.5">
            Continue as Guest
          </Text>
          <ArrowRight size={16} color="#64748B" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
