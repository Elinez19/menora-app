import React, { useState } from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuthUser } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Home, Wrench, CheckCircle2, ArrowLeft } from "lucide-react-native";

export default function RoleSelectScreen() {
  const [selectedRole, setSelectedRole] = useState<"customer" | "artisan">(
    "customer"
  );
  const { setRole } = useAuthUser();

  const handleContinue = async () => {
    await setRole(selectedRole);
    if (selectedRole === "customer") {
      router.push("/(auth)/sign-up?role=customer");
    } else {
      router.push("/(auth)/artisan-setup");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-6 justify-between py-6">
      <StatusBar barStyle="dark-content" />

      {/* Top Bar */}
      <View>
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 rounded-full bg-card border border-border items-center justify-center mb-6 active:opacity-75"
        >
          <ArrowLeft size={18} color="#0F172A" />
        </Pressable>

        <Text className="text-2xl font-bold text-foreground">
          Choose Account Type
        </Text>
        <Text className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          How would you like to use Homa? You can switch roles later in settings.
        </Text>
      </View>

      {/* Role Selection Cards */}
      <View className="gap-4 my-auto">
        {/* Customer Card */}
        <Pressable
          onPress={() => setSelectedRole("customer")}
          className={`p-5 rounded-3xl border-2 transition-all active:scale-[0.99] ${
            selectedRole === "customer"
              ? "bg-primary/5 border-primary shadow-sm"
              : "bg-card border-border/80"
          }`}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View
              className={`h-12 w-12 rounded-2xl items-center justify-center ${
                selectedRole === "customer"
                  ? "bg-primary text-white"
                  : "bg-secondary text-primary"
              }`}
            >
              <Home
                size={24}
                color={selectedRole === "customer" ? "#FFFFFF" : "#4F6BFF"}
              />
            </View>

            <View
              className={`h-6 w-6 rounded-full items-center justify-center ${
                selectedRole === "customer" ? "bg-primary" : "border-2 border-border"
              }`}
            >
              {selectedRole === "customer" && (
                <CheckCircle2 size={16} color="#FFFFFF" />
              )}
            </View>
          </View>

          <Text className="text-lg font-bold text-foreground mb-1">
            I want to hire an Artisan
          </Text>
          <Text className="text-xs text-muted-foreground leading-relaxed">
            Book certified local technicians for plumbing, electrical, carpentry, painting, and general home repairs.
          </Text>
        </Pressable>

        {/* Artisan / Pro Card */}
        <Pressable
          onPress={() => setSelectedRole("artisan")}
          className={`p-5 rounded-3xl border-2 transition-all active:scale-[0.99] ${
            selectedRole === "artisan"
              ? "bg-primary/5 border-primary shadow-sm"
              : "bg-card border-border/80"
          }`}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View
              className={`h-12 w-12 rounded-2xl items-center justify-center ${
                selectedRole === "artisan"
                  ? "bg-primary text-white"
                  : "bg-secondary text-primary"
              }`}
            >
              <Wrench
                size={24}
                color={selectedRole === "artisan" ? "#FFFFFF" : "#4F6BFF"}
              />
            </View>

            <View
              className={`h-6 w-6 rounded-full items-center justify-center ${
                selectedRole === "artisan" ? "bg-primary" : "border-2 border-border"
              }`}
            >
              {selectedRole === "artisan" && (
                <CheckCircle2 size={16} color="#FFFFFF" />
              )}
            </View>
          </View>

          <Text className="text-lg font-bold text-foreground mb-1">
            I am an Artisan / Service Pro
          </Text>
          <Text className="text-xs text-muted-foreground leading-relaxed">
            Receive incoming job alerts in your area, set your own hourly rates, manage bookings, and get paid instantly.
          </Text>
        </Pressable>
      </View>

      {/* Bottom CTA */}
      <View>
        <Button
          title={`Continue as ${
            selectedRole === "customer" ? "Customer" : "Service Pro"
          }`}
          variant="primary"
          size="lg"
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}
