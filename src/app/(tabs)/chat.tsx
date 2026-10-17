import React from "react";
import { View, Text, ScrollView, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { CheckCheck } from "lucide-react-native";
import { MOCK_HANDYMEN } from "@/constants/mockData";
import { toast } from "sonner-native";

export default function ChatScreen() {

  const mockConversations = [
    {
      id: "chat-1",
      handyman: MOCK_HANDYMEN[0],
      lastMessage: "I am 10 minutes away, is the driveway clear?",
      time: "2m ago",
      unread: 1,
      isOnline: true,
    },
    {
      id: "chat-2",
      handyman: MOCK_HANDYMEN[2],
      lastMessage: "Installed the breaker and tested all outlets. Thanks for hiring!",
      time: "Oct 12",
      unread: 0,
      isOnline: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-5 py-4 border-b border-border/70">
        <Text className="text-2xl font-bold text-foreground">Messages</Text>
        <Text className="text-xs text-muted-foreground mt-0.5">
          Direct communication with your active and past artisans
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-3">
        {mockConversations.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => toast.info(`Opening chat with ${item.handyman.name}`)}
            className="p-3.5 rounded-2xl bg-card border border-border/70 flex-row items-center gap-3.5 mb-3 shadow-xs active:scale-[0.99]"
          >
            {/* Avatar with Online indicator */}
            <View className="relative">
              <View className="h-14 w-14 rounded-2xl overflow-hidden bg-muted">
                <Image
                  source={{ uri: item.handyman.avatar }}
                  className="w-full h-full"
                  contentFit="cover"
                />
              </View>
              {item.isOnline && (
                <View className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-success border-2 border-card" />
              )}
            </View>

            {/* Content */}
            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-base font-bold text-foreground">
                  {item.handyman.name}
                </Text>
                <Text className="text-[11px] text-muted-foreground">
                  {item.time}
                </Text>
              </View>
              <Text
                className="text-xs text-muted-foreground"
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
            </View>

            {/* Unread Pill or Check */}
            {item.unread > 0 ? (
              <View className="h-5 min-w-[20px] px-1.5 rounded-full bg-primary items-center justify-center">
                <Text className="text-[10px] font-bold text-white">
                  {item.unread}
                </Text>
              </View>
            ) : (
              <CheckCheck size={16} color="#94A3B8" />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
