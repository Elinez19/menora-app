import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Clock, Navigation, FileText } from "lucide-react-native";
import { MOCK_BOOKINGS } from "@/constants/mockData";
import { toast } from "sonner-native";

export default function HistoryScreen() {
  const [filterTab, setFilterTab] = useState<"all" | "active" | "completed">(
    "all"
  );

  const filteredBookings = MOCK_BOOKINGS.filter((b) => {
    if (filterTab === "active") return b.status === "en_route" || b.status === "in_progress";
    if (filterTab === "completed") return b.status === "completed";
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-5 py-4 border-b border-border/70">
        <Text className="text-2xl font-bold text-foreground">Service History</Text>
        <Text className="text-xs text-muted-foreground mt-0.5">
          Track active dispatches and view past invoices
        </Text>

        {/* Tab Pills */}
        <View className="flex-row gap-2 mt-4">
          {(["all", "active", "completed"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setFilterTab(tab)}
              className={`px-4 py-1.5 rounded-full border ${
                filterTab === tab
                  ? "bg-primary border-primary"
                  : "bg-card border-border/70"
              }`}
            >
              <Text
                className={`text-xs font-semibold capitalize ${
                  filterTab === tab ? "text-white" : "text-muted-foreground"
                }`}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-4">
        {filteredBookings.map((booking) => {
          const isActive = booking.status === "en_route";

          return (
            <View
              key={booking.id}
              className="bg-card rounded-3xl p-5 border border-border/80 shadow-xs mb-4"
            >
              {/* Status Header */}
              <View className="flex-row items-center justify-between pb-3 border-b border-border/50">
                <View className="flex-row items-center gap-1.5">
                  <Clock size={14} color="#64748B" />
                  <Text className="text-xs text-muted-foreground font-medium">
                    {booking.scheduledAt}
                  </Text>
                </View>

                <View
                  className={`px-2.5 py-0.5 rounded-full ${
                    isActive ? "bg-primary/10" : "bg-success/10"
                  }`}
                >
                  <Text
                    className={`text-[11px] font-bold uppercase ${
                      isActive ? "text-primary" : "text-success"
                    }`}
                  >
                    {isActive ? "En Route (14m)" : "Completed"}
                  </Text>
                </View>
              </View>

              {/* Service & Artisan Info */}
              <View className="py-3">
                <Text className="text-base font-bold text-foreground">
                  {booking.serviceName}
                </Text>
                <Text className="text-xs text-muted-foreground mt-0.5">
                  Artisan: {booking.handyman.name} ({booking.handyman.title.split("-")[0].trim()})
                </Text>
                <Text className="text-xs text-muted-foreground mt-1">
                  📍 {booking.address}
                </Text>
              </View>

              {/* Price & Actions */}
              <View className="flex-row items-center justify-between pt-3 border-t border-border/50">
                <Text className="text-base font-bold text-primary">
                  ${booking.totalCost.toFixed(2)}
                </Text>

                {isActive ? (
                  <Pressable
                    onPress={() => router.push(`/booking/track/${booking.id}`)}
                    className="flex-row items-center gap-1.5 px-4 py-2 rounded-full bg-primary active:opacity-90"
                  >
                    <Navigation size={13} color="#FFFFFF" />
                    <Text className="text-xs font-bold text-white">
                      Track Live
                    </Text>
                  </Pressable>
                ) : (
                  <View className="flex-row items-center gap-2">
                    <Pressable
                      onPress={() => toast.success("Invoice downloaded")}
                      className="p-2 rounded-full bg-secondary border border-border"
                    >
                      <FileText size={16} color="#4F6BFF" />
                    </Pressable>
                    <Pressable
                      onPress={() => router.push(`/booking/${booking.handymanId}`)}
                      className="px-3.5 py-2 rounded-full bg-secondary border border-border active:opacity-75"
                    >
                      <Text className="text-xs font-semibold text-foreground">
                        Book Again
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
