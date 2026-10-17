import React, { useState } from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SearchBar } from "@/components/ui/SearchBar";
import { MOCK_HANDYMEN } from "@/constants/mockData";
import { MapPin, Navigation, Star } from "lucide-react-native";

export default function DiscoverScreen() {
  const [search, setSearch] = useState("");
  const [selectedProId, setSelectedProId] = useState(MOCK_HANDYMEN[0].id);

  const selectedPro =
    MOCK_HANDYMEN.find((p) => p.id === selectedProId) || MOCK_HANDYMEN[0];

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Top Floating Search & Filter Bar */}
      <SafeAreaView
        edges={["top"]}
        className="absolute top-0 left-0 right-0 z-20 px-5 pt-2"
      >
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Find plumbers, electricians on map..."
          showFilterButton
          className="shadow-md"
        />
      </SafeAreaView>

      {/* MAP VIEW CONTAINER */}
      <View className="flex-1 bg-secondary/80 relative">
        {/* Subtle Map Grid lines */}
        <View className="absolute inset-0 opacity-20">
          <View className="w-full h-full flex-row flex-wrap">
            {Array.from({ length: 48 }).map((_, i) => (
              <View
                key={i}
                className="w-1/4 h-24 border border-primary/20"
              />
            ))}
          </View>
        </View>

        {/* Dynamic Map Pins */}
        <View className="flex-1 relative">
          {MOCK_HANDYMEN.map((pro, idx) => {
            const isSelected = pro.id === selectedProId;
            // Spread pins across map area
            const topPositions = [35, 45, 25, 55, 30];
            const leftPositions = [28, 65, 52, 38, 75];

            return (
              <Pressable
                key={pro.id}
                onPress={() => setSelectedProId(pro.id)}
                style={{
                  position: "absolute",
                  top: `${topPositions[idx % topPositions.length]}%`,
                  left: `${leftPositions[idx % leftPositions.length]}%`,
                }}
                className="items-center -translate-x-1/2 -translate-y-1/2 active:scale-110 transition-transform"
              >
                <View
                  className={`px-2.5 py-1 rounded-full flex-row items-center gap-1 shadow-lg border-2 ${
                    isSelected
                      ? "bg-primary border-white"
                      : "bg-white dark:bg-card border-border"
                  }`}
                >
                  <Navigation
                    size={12}
                    color={isSelected ? "#FFFFFF" : "#4F6BFF"}
                    className="rotate-45"
                  />
                  <Text
                    className={`text-xs font-bold ${
                      isSelected ? "text-white" : "text-foreground"
                    }`}
                  >
                    ${pro.hourlyRate}/h
                  </Text>
                </View>
                <View
                  className={`w-2 h-2 rotate-45 -mt-1 ${
                    isSelected ? "bg-primary" : "bg-white"
                  }`}
                />
              </Pressable>
            );
          })}
        </View>

        {/* BOTTOM PREVIEW CARD OF SELECTED ARTISAN */}
        <SafeAreaView edges={["bottom"]} className="px-5 pb-4">
          <View className="bg-card rounded-3xl p-4 border border-border/80 shadow-xl">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-1.5">
                <MapPin size={14} color="#4F6BFF" />
                <Text className="text-xs text-muted-foreground font-medium">
                  {selectedPro.distanceKm} km away • {selectedPro.location}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Star size={13} color="#F59E0B" fill="#F59E0B" />
                <Text className="text-xs font-bold text-foreground">
                  {selectedPro.rating}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-3">
                <Text className="text-base font-bold text-foreground">
                  {selectedPro.name}
                </Text>
                <Text className="text-xs text-muted-foreground">
                  {selectedPro.title}
                </Text>
              </View>

              <Pressable
                onPress={() => router.push(`/handyman/${selectedPro.id}`)}
                className="h-10 px-5 rounded-full bg-primary items-center justify-center active:opacity-90"
              >
                <Text className="text-xs font-bold text-white">View Profile</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
