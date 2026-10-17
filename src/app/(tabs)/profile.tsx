import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Switch, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import {
  Wrench,
  Moon,
  Sun,
  CreditCard,
  MapPin,
  LogOut,
  ChevronRight,
  Zap,
} from "lucide-react-native";
import { useAuthUser } from "@/context/AuthContext";
import { toast } from "sonner-native";

export default function ProfileScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { isGuest, role, user, setRole, signOut } = useAuthUser();

  const [isArtisanOnline, setIsArtisanOnline] = useState(true);

  const toggleTheme = () => {
    setColorScheme(isDark ? "light" : "dark");
    toast.success(`Theme switched to ${isDark ? "Light" : "Dark"} mode`);
  };

  const handleRoleToggle = async () => {
    const nextRole = role === "artisan" ? "customer" : "artisan";
    await setRole(nextRole);
    toast.success(
      `Switched to ${nextRole === "artisan" ? "Artisan Pro Mode" : "Customer Mode"}`
    );
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Signed out successfully");
    router.replace("/(auth)/welcome");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-5 py-4 border-b border-border/70">
        <Text className="text-2xl font-bold text-foreground">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* User Card */}
        <View className="p-5 rounded-3xl bg-card border border-border/80 shadow-xs mb-5">
          <View className="flex-row items-center gap-4">
            <View className="h-16 w-16 rounded-full bg-primary items-center justify-center">
              <Text className="text-xl font-bold text-white">
                {user?.name ? user.name[0]?.toUpperCase() : isGuest ? "G" : "U"}
              </Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-lg font-bold text-foreground">
                  {user?.name || (isGuest ? "Guest User" : "Elijah Menora")}
                </Text>
                <View
                  className={`px-2 py-0.5 rounded-full ${
                    role === "artisan"
                      ? "bg-primary/10"
                      : isGuest
                      ? "bg-muted"
                      : "bg-success/10"
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold uppercase ${
                      role === "artisan"
                        ? "text-primary"
                        : isGuest
                        ? "text-muted-foreground"
                        : "text-success"
                    }`}
                  >
                    {isGuest ? "Guest" : role === "artisan" ? "Artisan Pro" : "Customer"}
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-muted-foreground mt-0.5">
                {user?.email || (isGuest ? "Browse mode active" : "elija@example.com")}
              </Text>
            </View>
          </View>
        </View>

        {/* ARTISAN PRO MODE WIDGET (If role is artisan) */}
        {role === "artisan" && (
          <View className="p-5 rounded-3xl bg-primary/5 border border-primary/30 shadow-xs mb-5">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <Zap size={18} color="#4F6BFF" />
                <Text className="text-sm font-bold text-foreground">
                  Instant Job Radar
                </Text>
              </View>
              <Switch
                value={isArtisanOnline}
                onValueChange={(val) => {
                  setIsArtisanOnline(val);
                  toast.info(
                    val
                      ? "You are now ONLINE for emergency dispatch jobs"
                      : "You are now OFFLINE"
                  );
                }}
                trackColor={{ false: "#CBD5E1", true: "#4F6BFF" }}
              />
            </View>

            <View className="flex-row justify-between bg-card p-3.5 rounded-2xl border border-border/80">
              <View>
                <Text className="text-[11px] text-muted-foreground">Earnings (Oct)</Text>
                <Text className="text-base font-bold text-foreground">$1,420.00</Text>
              </View>
              <View>
                <Text className="text-[11px] text-muted-foreground">Jobs Completed</Text>
                <Text className="text-base font-bold text-foreground">18 jobs</Text>
              </View>
              <View>
                <Text className="text-[11px] text-muted-foreground">Rating</Text>
                <Text className="text-base font-bold text-foreground">★ 4.92</Text>
              </View>
            </View>
          </View>
        )}

        {/* Persona Switcher */}
        {!isGuest && (
          <Pressable
            onPress={handleRoleToggle}
            className="p-4 rounded-2xl bg-secondary border border-border/70 flex-row items-center justify-between mb-5 active:scale-[0.99]"
          >
            <View className="flex-row items-center gap-3">
              <Wrench size={20} color="#4F6BFF" />
              <View>
                <Text className="text-sm font-bold text-foreground">
                  Switch to {role === "artisan" ? "Customer Mode" : "Artisan Mode"}
                </Text>
                <Text className="text-xs text-muted-foreground">
                  {role === "artisan"
                    ? "Hire technicians for your home"
                    : "Offer your skills and receive job dispatch alerts"}
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </Pressable>
        )}

        {/* General Settings */}
        <View className="bg-card rounded-3xl border border-border/80 overflow-hidden mb-5">
          {/* Theme Toggle */}
          <Pressable
            onPress={toggleTheme}
            className="p-4 flex-row items-center justify-between border-b border-border/50 active:bg-muted/50"
          >
            <View className="flex-row items-center gap-3">
              {isDark ? <Moon size={18} color="#4F6BFF" /> : <Sun size={18} color="#F59E0B" />}
              <Text className="text-sm font-medium text-foreground">
                App Appearance: {isDark ? "Dark Mode" : "Light Mode"}
              </Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </Pressable>

          {/* Saved Addresses */}
          <Pressable
            onPress={() => toast.info("Primary: 742 Evergreen Terrace")}
            className="p-4 flex-row items-center justify-between border-b border-border/50 active:bg-muted/50"
          >
            <View className="flex-row items-center gap-3">
              <MapPin size={18} color="#4F6BFF" />
              <Text className="text-sm font-medium text-foreground">
                Saved Locations
              </Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </Pressable>

          {/* Payment Methods */}
          <Pressable
            onPress={() => toast.info("Payment methods: Apple Pay, Visa ending in 4242")}
            className="p-4 flex-row items-center justify-between active:bg-muted/50"
          >
            <View className="flex-row items-center gap-3">
              <CreditCard size={18} color="#4F6BFF" />
              <Text className="text-sm font-medium text-foreground">
                Payment & Invoicing
              </Text>
            </View>
            <ChevronRight size={16} color="#94A3B8" />
          </Pressable>
        </View>

        {/* Account Actions */}
        {isGuest ? (
          <Pressable
            onPress={() => router.push("/(auth)/welcome")}
            className="h-12 rounded-full bg-primary flex-row items-center justify-center active:opacity-90"
          >
            <Text className="text-sm font-bold text-white">
              Create an Account or Sign In
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleLogout}
            className="h-12 rounded-full bg-destructive/10 border border-destructive/20 flex-row items-center justify-center gap-2 active:opacity-75"
          >
            <LogOut size={16} color="#EF4444" />
            <Text className="text-sm font-semibold text-destructive">
              Sign Out
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
