import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Bell,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react-native";
import { useAuthUser } from "@/context/AuthContext";
import { SearchBar } from "@/components/ui/SearchBar";
import { IconButton } from "@/components/ui/IconButton";
import { CategoryPills } from "@/components/handyman/CategoryPills";
import { HandymanCard } from "@/components/handyman/HandymanCard";
import { GuestGateModal } from "@/components/auth/GuestGateModal";
import { MOCK_HANDYMEN } from "@/constants/mockData";
import { ServiceCategory } from "@/types/handyman";
import { toast } from "sonner-native";

export default function HomeScreen() {
  const { isGuest } = useAuthUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ServiceCategory | "all"
  >("all");
  const [locationName] = useState("Pietersburg, St");
  const [showGuestGate, setShowGuestGate] = useState(false);

  // Filter handymen
  const filteredHandymen = MOCK_HANDYMEN.filter((pro) => {
    const matchesCategory =
      selectedCategory === "all" ||
      selectedCategory === "more" ||
      pro.category === selectedCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleFavoritePress = (id: string, isFav: boolean) => {
    if (isGuest) {
      setShowGuestGate(true);
      return;
    }
    toast.success(isFav ? "Saved to favorites" : "Removed from favorites");
  };

  const handleNotificationPress = () => {
    if (isGuest) {
      setShowGuestGate(true);
      return;
    }
    toast.info("No new dispatch notifications");
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />

      {/* TOP HEADER WITH PERIWINKLE / BLUE GRADIENT (Matching Screen 2) */}
      <View className="bg-primary pt-1 pb-6 px-5 rounded-b-[32px] shadow-md">
        <SafeAreaView edges={["top"]}>
          {/* Top Bar: Location & Notifications */}
          <View className="flex-row items-center justify-between mb-4 pt-2">
            {/* Location Selector */}
            <Pressable
              onPress={() => toast.info("GPS Location: Pietersburg, St")}
              className="active:opacity-80"
            >
              <View className="flex-row items-center gap-1">
                <Text className="text-xs text-white/80 font-medium">
                  My Location
                </Text>
                <ChevronDown size={14} color="#FFFFFF" />
              </View>
              <Text className="text-xl font-bold text-white tracking-tight">
                {locationName}
              </Text>
            </Pressable>

            {/* Notification Bell (White Circular Button in Screen 2) */}
            <IconButton
              icon={<Bell size={20} color="#4F6BFF" />}
              size={44}
              badgeCount={isGuest ? 0 : 2}
              className="bg-white border-transparent shadow-sm"
              onPress={handleNotificationPress}
            />
          </View>

          {/* Search Bar matching mockup */}
          <View className="mt-1">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search service here..."
              className="bg-white border-transparent shadow-sm"
            />
          </View>
        </SafeAreaView>
      </View>

      {/* MAIN SCROLLABLE CONTENT */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Guest Mode Banner */}
        {isGuest && (
          <View className="mx-5 mt-4 p-4 rounded-2xl bg-secondary border border-border/80 flex-row items-center justify-between shadow-xs">
            <View className="flex-1 mr-3">
              <View className="flex-row items-center gap-1.5 mb-0.5">
                <Sparkles size={14} color="#4F6BFF" />
                <Text className="text-xs font-bold text-primary uppercase">
                  Guest Explorer
                </Text>
              </View>
              <Text className="text-xs text-muted-foreground">
                Sign in to book artisans, chat, and get 20% off your first job.
              </Text>
            </View>
            <Pressable
              onPress={() => router.push("/(auth)/sign-in")}
              className="px-3 py-1.5 rounded-full bg-primary active:opacity-85"
            >
              <Text className="text-xs font-semibold text-white">Sign In</Text>
            </Pressable>
          </View>
        )}

        {/* Category Icons Row (Matching Screen 2) */}
        <View className="mt-4">
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>

        {/* Section 1: "Near on you" (Matching Screen 2) */}
        <View className="mt-4 px-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-bold text-foreground tracking-tight">
              Near on you
            </Text>
            <Pressable
              onPress={() => router.push("/(tabs)/discover")}
              className="active:opacity-75"
            >
              <Text className="text-sm font-semibold text-primary">
                View All
              </Text>
            </Pressable>
          </View>

          {/* Horizontal Card Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {filteredHandymen.map((pro) => (
              <HandymanCard
                key={pro.id}
                handyman={pro}
                onPress={() => router.push(`/handyman/${pro.id}`)}
                onFavoritePress={handleFavoritePress}
              />
            ))}
          </ScrollView>
        </View>

        {/* Promotional / Uber Quick Dispatch Banner */}
        <View className="mx-5 mt-7 p-5 rounded-3xl bg-card border border-border/70 shadow-xs">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-4">
              <View className="flex-row items-center gap-1.5 mb-1">
                <Shield size={16} color="#10B981" />
                <Text className="text-xs font-bold text-success uppercase">
                  Emergency Dispatch
                </Text>
              </View>
              <Text className="text-lg font-bold text-foreground">
                Need urgent repair?
              </Text>
              <Text className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Available pros nearby can be dispatched in under 20 minutes for plumbing leaks and power faults.
              </Text>
            </View>
            <Pressable
              onPress={() => {
                if (isGuest) setShowGuestGate(true);
                else router.push(`/booking/${MOCK_HANDYMEN[0].id}`);
              }}
              className="h-12 w-12 rounded-full bg-primary items-center justify-center shadow-md active:scale-95"
            >
              <ArrowRight size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* Section 2: All Verified Specialists */}
        <View className="mt-7 px-5">
          <Text className="text-xl font-bold text-foreground mb-3 tracking-tight">
            Top Rated Artisans
          </Text>

          <View className="gap-3">
            {filteredHandymen.slice(0, 3).map((pro) => (
              <Pressable
                key={`vert-${pro.id}`}
                onPress={() => router.push(`/handyman/${pro.id}`)}
                className="p-3.5 rounded-2xl bg-card border border-border/70 flex-row items-center gap-3.5 shadow-xs active:scale-[0.99]"
              >
                <View className="h-16 w-16 rounded-xl overflow-hidden bg-muted">
                  <HandymanCard
                    handyman={pro}
                    onPress={() => {}}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-foreground" numberOfLines={1}>
                    {pro.name}
                  </Text>
                  <Text className="text-xs text-muted-foreground mt-0.5">
                    {pro.title}
                  </Text>
                  <View className="flex-row items-center gap-3 mt-1.5">
                    <Text className="text-xs font-bold text-primary">
                      ${pro.hourlyRate.toFixed(2)}/Hr
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      ★ {pro.rating} ({pro.reviewCount})
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Guest Auth Gate Bottom Sheet Modal */}
      <GuestGateModal
        visible={showGuestGate}
        onClose={() => setShowGuestGate(false)}
        title="Sign In to Access Booking"
        description="Create an account or sign in to save your favorite artisans, book service calls, and track dispatch live."
      />
    </View>
  );
}
