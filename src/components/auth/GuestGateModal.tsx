import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Lock, Sparkles, X } from "lucide-react-native";
import { Button } from "@/components/ui/Button";

interface GuestGateModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function GuestGateModal({
  visible,
  onClose,
  title = "Unlock Full Booking Access",
  description = "Sign in or create a free account to hire verified artisans, track arrivals live on the map, and get automated invoices.",
}: GuestGateModalProps) {
  const handleSignIn = () => {
    onClose();
    router.push("/(auth)/sign-in");
  };

  const handleSignUp = () => {
    onClose();
    router.push("/(auth)/role-select");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/50 justify-end sm:justify-center items-center p-4"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-card rounded-3xl p-6 border border-border shadow-2xl"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="h-12 w-12 rounded-full bg-primary/10 items-center justify-center">
              <Lock size={22} color="#4F6BFF" />
            </View>
            <Pressable
              onPress={onClose}
              className="p-2 rounded-full bg-muted active:opacity-75"
            >
              <X size={16} color="#64748B" />
            </Pressable>
          </View>

          {/* Title & Description */}
          <Text className="text-xl font-bold text-foreground mb-2">
            {title}
          </Text>
          <Text className="text-sm text-muted-foreground leading-relaxed mb-6">
            {description}
          </Text>

          {/* Value Props */}
          <View className="bg-secondary/60 rounded-2xl p-3.5 mb-6 gap-2">
            <View className="flex-row items-center gap-2">
              <Sparkles size={14} color="#4F6BFF" />
              <Text className="text-xs font-semibold text-foreground">
                20% discount applied to your first job
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Sparkles size={14} color="#4F6BFF" />
              <Text className="text-xs font-semibold text-foreground">
                Live Uber-style arrival tracking with direct calling
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View className="gap-3">
            <Button
              title="Create Account"
              variant="primary"
              size="lg"
              onPress={handleSignUp}
            />
            <Button
              title="Sign In"
              variant="secondary"
              size="md"
              onPress={handleSignIn}
            />
            <Pressable onPress={onClose} className="py-2 items-center">
              <Text className="text-xs font-semibold text-muted-foreground">
                Continue Browsing as Guest
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
