import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import {
  ArrowLeft,
  MoreHorizontal,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react-native";
import { useAuthUser } from "@/context/AuthContext";
import { IconButton } from "@/components/ui/IconButton";
import { StarRating } from "@/components/ui/StarRating";
import { GalleryCarousel } from "@/components/handyman/GalleryCarousel";
import { ReviewCard } from "@/components/handyman/ReviewCard";
import { StickyHireBar } from "@/components/handyman/StickyHireBar";
import { GuestGateModal } from "@/components/auth/GuestGateModal";
import { MOCK_HANDYMEN } from "@/constants/mockData";
import { toast } from "sonner-native";

export default function HandymanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isGuest } = useAuthUser();
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [showGuestGate, setShowGuestGate] = useState(false);

  // Find handyman or fallback to first
  const handyman =
    MOCK_HANDYMEN.find((h) => h.id === id) || MOCK_HANDYMEN[0];

  const handleHirePress = () => {
    if (isGuest) {
      setShowGuestGate(true);
      return;
    }
    router.push(`/booking/${handyman.id}`);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />

      {/* Floating Header Over Gallery (Back & More buttons in Screen 3) */}
      <SafeAreaView
        edges={["top"]}
        className="absolute top-0 left-0 right-0 z-20 px-5 flex-row items-center justify-between pointer-events-box-none"
      >
        <IconButton
          icon={<ArrowLeft size={18} color="#0F172A" />}
          size={42}
          variant="glass"
          onPress={() => router.back()}
          className="shadow-sm"
        />
        <IconButton
          icon={<MoreHorizontal size={18} color="#0F172A" />}
          size={42}
          variant="glass"
          onPress={() => toast.info("Options: Share profile, Report")}
          className="shadow-sm"
        />
      </SafeAreaView>

      {/* Scrollable Profile Body */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Photo Gallery Carousel matching Screen 3 */}
        <GalleryCarousel images={handyman.gallery} />

        {/* Profile Content Container */}
        <View className="px-5 pt-3">
          {/* Name & Rating Row */}
          <View className="flex-row items-start justify-between">
            <View className="flex-1 mr-3">
              <View className="flex-row items-center gap-1.5 mb-0.5">
                <Text className="text-2xl font-bold text-foreground">
                  {handyman.name}
                </Text>
                {handyman.isVerified && (
                  <ShieldCheck size={18} color="#4F6BFF" />
                )}
              </View>
              <Text className="text-sm text-muted-foreground font-medium">
                {handyman.title}
              </Text>
            </View>

            {/* Star Rating Badge */}
            <StarRating
              rating={handyman.rating}
              count={handyman.reviewCount}
              size={16}
            />
          </View>

          {/* Quick Stats Strip */}
          <View className="flex-row justify-between bg-card rounded-2xl p-4 mt-5 border border-border/80 shadow-xs">
            <View className="items-center flex-1 border-r border-border/60">
              <Award size={18} color="#4F6BFF" />
              <Text className="text-base font-bold text-foreground mt-1">
                {handyman.yearsExperience} yrs
              </Text>
              <Text className="text-[11px] text-muted-foreground">Experience</Text>
            </View>
            <View className="items-center flex-1 border-r border-border/60">
              <CheckCircle size={18} color="#10B981" />
              <Text className="text-base font-bold text-foreground mt-1">
                {handyman.completedJobs}+
              </Text>
              <Text className="text-[11px] text-muted-foreground">Jobs Done</Text>
            </View>
            <View className="items-center flex-1">
              <Clock size={18} color="#F59E0B" />
              <Text className="text-base font-bold text-foreground mt-1">
                {handyman.onTimeRate}%
              </Text>
              <Text className="text-[11px] text-muted-foreground">On-Time</Text>
            </View>
          </View>

          {/* About Me Section matching Screen 3 */}
          <View className="mt-6">
            <Text className="text-lg font-bold text-foreground mb-2">
              About me
            </Text>
            <Text className="text-sm text-foreground/80 dark:text-foreground/90 leading-relaxed font-normal">
              {isBioExpanded
                ? handyman.about
                : `${handyman.about.slice(0, 140)}... `}
              <Text
                onPress={() => setIsBioExpanded(!isBioExpanded)}
                className="text-primary font-semibold"
              >
                {isBioExpanded ? "Show less" : "Read more.."}
              </Text>
            </Text>
          </View>

          {/* Skills & Services Chips */}
          <View className="mt-5">
            <Text className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
              Specialized Skills
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {handyman.skills.map((skill, index) => (
                <View
                  key={index}
                  className="bg-secondary px-3 py-1.5 rounded-full border border-border/60"
                >
                  <Text className="text-xs font-medium text-secondary-foreground">
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Review Section matching Screen 3 */}
          <View className="mt-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-foreground">Review</Text>
              <Text className="text-xs font-semibold text-primary">
                See all ({handyman.reviewCount})
              </Text>
            </View>

            {/* Testimonial Quote Box matching Alex .T from Screen 3 */}
            {handyman.reviews.length > 0 ? (
              <ReviewCard review={handyman.reviews[0]} />
            ) : (
              <Text className="text-xs text-muted-foreground italic">
                No reviews yet for this artisan.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar matching Screen 3 */}
      <StickyHireBar
        price={handyman.hourlyRate}
        handymanName={handyman.name}
        onHire={handleHirePress}
      />

      {/* Guest Gate Bottom Sheet Modal */}
      <GuestGateModal
        visible={showGuestGate}
        onClose={() => setShowGuestGate(false)}
        title={`Sign in to hire ${handyman.name.split(" ")[0]}`}
        description="Create an account or sign in to confirm service, chat directly with this artisan, and track live arrival."
      />
    </View>
  );
}
