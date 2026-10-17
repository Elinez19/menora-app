import { Link, Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { authClient, useSession } from "@/lib/auth-client";

export default function HomeScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const toggleTheme = () => {
    setColorScheme(isDark ? "light" : "dark");
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign out";
      toast.error(msg);
    } finally {
      setIsSigningOut(false);
    }
  };

  const user = session?.user;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: "Menora",
          headerTitleStyle: {
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
          },
        }}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Authentication State Card */}
        <View className="rounded-card bg-card p-6 border border-border shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                Authentication
              </Text>
              <Text className="text-xl font-bold text-foreground">
                {user ? "Active Session" : "Account Access"}
              </Text>
            </View>
            <View
              className={`h-3 w-3 rounded-full ${
                user ? "bg-success" : "bg-muted-foreground/40"
              }`}
            />
          </View>

          {user ? (
            <View className="gap-4">
              <View className="flex-row items-center gap-3 p-3 rounded-control bg-secondary border border-border">
                <View className="h-10 w-10 rounded-full bg-primary items-center justify-center">
                  <Text className="text-base font-bold text-primary-foreground">
                    {user.name ? user.name[0]?.toUpperCase() : "U"}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">
                    {user.name || "Menora User"}
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    {user.email}
                  </Text>
                </View>
                <View className="rounded-md bg-success/15 px-2 py-0.5">
                  <Text className="text-[10px] font-bold text-success uppercase">
                    Active
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={handleSignOut}
                disabled={isSigningOut}
                className="h-control flex-row items-center justify-center rounded-control bg-destructive/10 border border-destructive/20 active:opacity-75"
              >
                {isSigningOut ? (
                  <ActivityIndicator size="small" color="#EF4444" />
                ) : (
                  <Text className="text-sm font-semibold text-destructive">
                    Sign Out
                  </Text>
                )}
              </Pressable>
            </View>
          ) : (
            <View className="gap-3">
              <Text className="text-sm text-muted-foreground">
                Better Auth is active. Sign in with email, Google, or Apple to access protected features.
              </Text>
              <View className="flex-row gap-3 pt-2">
                <Link href="/(auth)/sign-in" asChild>
                  <Pressable className="flex-1 h-control items-center justify-center rounded-control bg-primary active:opacity-85">
                    <Text className="text-sm font-semibold text-primary-foreground">
                      Sign In
                    </Text>
                  </Pressable>
                </Link>
                <Link href="/(auth)/sign-up" asChild>
                  <Pressable className="flex-1 h-control items-center justify-center rounded-control bg-secondary border border-border active:opacity-75">
                    <Text className="text-sm font-semibold text-secondary-foreground">
                      Sign Up
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          )}
        </View>

        {/* Hero Section */}
        <View className="rounded-card bg-card p-6 border border-border shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                Design System
              </Text>
              <Text className="text-2xl font-bold text-foreground">
                Menora Theme
              </Text>
            </View>
            <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center">
              <View className="h-4 w-4 rounded-full bg-primary" />
            </View>
          </View>
          <Text className="text-sm text-muted-foreground leading-relaxed">
            NativeWind v4 semantic design foundation configured with Menora Blue (`#208AEF`), warm gold accent (`#F59E0B`), Inter typography, and Better Auth session storage.
          </Text>

          {/* Mode Switcher Button */}
          <Pressable
            onPress={toggleTheme}
            className="mt-5 h-control flex-row items-center justify-center rounded-control bg-primary px-4 active:opacity-85"
          >
            <Text className="font-semibold text-primary-foreground text-sm">
              Switch to {isDark ? "Light" : "Dark"} Mode (Current: {colorScheme})
            </Text>
          </Pressable>
        </View>

        {/* Semantic Color Tokens */}
        <View className="rounded-card bg-card p-5 border border-border">
          <Text className="text-base font-bold text-foreground mb-4">
            Color Tokens
          </Text>
          <View className="flex-row flex-wrap gap-3">
            <View className="flex-1 min-w-[120px] rounded-control p-3 bg-primary">
              <Text className="text-xs font-semibold text-primary-foreground">Primary</Text>
              <Text className="text-[10px] text-primary-foreground/80">#208AEF</Text>
            </View>
            <View className="flex-1 min-w-[120px] rounded-control p-3 bg-accent">
              <Text className="text-xs font-semibold text-accent-foreground">Accent</Text>
              <Text className="text-[10px] text-accent-foreground/80">#F59E0B</Text>
            </View>
            <View className="flex-1 min-w-[120px] rounded-control p-3 bg-secondary border border-border">
              <Text className="text-xs font-semibold text-secondary-foreground">Secondary</Text>
              <Text className="text-[10px] text-muted-foreground">Neutral Surface</Text>
            </View>
            <View className="flex-1 min-w-[120px] rounded-control p-3 bg-muted border border-border">
              <Text className="text-xs font-semibold text-foreground">Muted</Text>
              <Text className="text-[10px] text-muted-foreground">Subtle Backing</Text>
            </View>
          </View>
        </View>

        {/* Status Indicators */}
        <View className="rounded-card bg-card p-5 border border-border">
          <Text className="text-base font-bold text-foreground mb-4">
            Semantic Status Roles
          </Text>
          <View className="gap-2.5">
            <View className="flex-row items-center justify-between rounded-control p-3 bg-success/10 border border-success/20">
              <Text className="text-sm font-medium text-success">Success State</Text>
              <View className="h-2 w-2 rounded-full bg-success" />
            </View>
            <View className="flex-row items-center justify-between rounded-control p-3 bg-warning/10 border border-warning/20">
              <Text className="text-sm font-medium text-warning">Warning State</Text>
              <View className="h-2 w-2 rounded-full bg-warning" />
            </View>
            <View className="flex-row items-center justify-between rounded-control p-3 bg-destructive/10 border border-destructive/20">
              <Text className="text-sm font-medium text-destructive">Destructive State</Text>
              <View className="h-2 w-2 rounded-full bg-destructive" />
            </View>
          </View>
        </View>

        {/* Global Toast Feedback */}
        <View className="rounded-card bg-card p-5 border border-border">
          <Text className="text-base font-bold text-foreground mb-1">
            Sonner Native Feedback
          </Text>
          <Text className="text-xs text-muted-foreground mb-4">
            Trigger global toast notifications rendered with your active theme.
          </Text>
          <View className="flex-row flex-wrap gap-2.5">
            <Pressable
              onPress={() => toast.success("Changes saved successfully!")}
              className="flex-1 min-w-[100px] h-control rounded-control bg-secondary border border-border items-center justify-center active:opacity-75"
            >
              <Text className="text-xs font-semibold text-foreground">Success Toast</Text>
            </Pressable>
            <Pressable
              onPress={() => toast.warning("Session expiring in 5 minutes")}
              className="flex-1 min-w-[100px] h-control rounded-control bg-secondary border border-border items-center justify-center active:opacity-75"
            >
              <Text className="text-xs font-semibold text-foreground">Warning Toast</Text>
            </Pressable>
            <Pressable
              onPress={() => toast.error("Failed to connect to service")}
              className="flex-1 min-w-[100px] h-control rounded-control bg-secondary border border-border items-center justify-center active:opacity-75"
            >
              <Text className="text-xs font-semibold text-foreground">Error Toast</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
