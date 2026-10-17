import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import {
  ArrowLeft,
  Zap,
  Calendar,
  MapPin,
  ShieldCheck,
} from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { MOCK_HANDYMEN } from "@/constants/mockData";
import { toast } from "sonner-native";

export default function BookingScreen() {
  const { handymanId } = useLocalSearchParams<{ handymanId: string }>();
  const pro =
    MOCK_HANDYMEN.find((h) => h.id === handymanId) || MOCK_HANDYMEN[0];

  const [scheduleType, setScheduleType] = useState<"instant" | "scheduled">(
    "instant"
  );
  const [selectedTask, setSelectedTask] = useState(pro.skills[0] || "General Repair");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("742 Evergreen Terrace, Pietersburg");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const estimatedHours = 1.5;
  const subtotal = pro.hourlyRate * estimatedHours;
  const serviceFee = 5.0;
  const total = subtotal + serviceFee;

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Job request sent to " + pro.name + "!");
      router.replace(`/booking/track/booking-101`);
    }, 800);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-5 py-3 flex-row items-center justify-between border-b border-border/70">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 rounded-full bg-card border border-border items-center justify-center active:opacity-75"
        >
          <ArrowLeft size={18} color="#0F172A" />
        </Pressable>
        <Text className="text-base font-bold text-foreground">
          Book Service
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1 px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Artisan Summary Strip */}
        <View className="p-4 rounded-2xl bg-card border border-border/80 flex-row items-center gap-3.5 mb-5 shadow-xs">
          <View className="h-12 w-12 rounded-xl bg-primary/10 items-center justify-center">
            <Zap size={22} color="#4F6BFF" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground">
              {pro.name}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {pro.title.split("-")[0].trim()} • ${pro.hourlyRate.toFixed(2)}/Hr
            </Text>
          </View>
        </View>

        {/* Schedule Mode Selector (Uber Instant vs Scheduled) */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
            When do you need help?
          </Text>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setScheduleType("instant")}
              className={`flex-1 p-4 rounded-2xl border-2 items-center ${
                scheduleType === "instant"
                  ? "bg-primary/5 border-primary"
                  : "bg-card border-border/80"
              }`}
            >
              <Zap
                size={22}
                color={scheduleType === "instant" ? "#4F6BFF" : "#64748B"}
              />
              <Text className="text-sm font-bold text-foreground mt-2">
                Instant / ASAP
              </Text>
              <Text className="text-[11px] text-muted-foreground mt-0.5">
                Arrives in ~15-20 mins
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setScheduleType("scheduled")}
              className={`flex-1 p-4 rounded-2xl border-2 items-center ${
                scheduleType === "scheduled"
                  ? "bg-primary/5 border-primary"
                  : "bg-card border-border/80"
              }`}
            >
              <Calendar
                size={22}
                color={scheduleType === "scheduled" ? "#4F6BFF" : "#64748B"}
              />
              <Text className="text-sm font-bold text-foreground mt-2">
                Schedule Later
              </Text>
              <Text className="text-[11px] text-muted-foreground mt-0.5">
                Pick specific day & hour
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Task Selection */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
            Select Task Type
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {pro.skills.map((skill) => (
              <Pressable
                key={skill}
                onPress={() => setSelectedTask(skill)}
                className={`px-3.5 py-2 rounded-full border ${
                  selectedTask === skill
                    ? "bg-primary border-primary"
                    : "bg-card border-border/80"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    selectedTask === skill ? "text-white" : "text-foreground"
                  }`}
                >
                  {skill}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Service Location */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Service Address
          </Text>
          <View className="p-3.5 rounded-2xl bg-card border border-border/80 flex-row items-center gap-3">
            <MapPin size={18} color="#4F6BFF" />
            <TextInput
              value={address}
              onChangeText={setAddress}
              className="flex-1 text-sm text-foreground font-medium py-0"
            />
          </View>
        </View>

        {/* Problem Description Notes */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Notes / Details for Artisan (Optional)
          </Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="e.g. Leak is under the bathroom sink, main shutoff is in hallway."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#94A3B8"
            className="p-3.5 rounded-2xl bg-card border border-border/80 text-sm text-foreground min-h-[80px]"
          />
        </View>

        {/* Cost Breakdown */}
        <View className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs mb-4">
          <Text className="text-sm font-bold text-foreground mb-3">
            Price Estimation
          </Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-xs text-muted-foreground">
                Hourly rate ({estimatedHours} hrs est.)
              </Text>
              <Text className="text-xs font-semibold text-foreground">
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xs text-muted-foreground">
                Platform dispatch fee
              </Text>
              <Text className="text-xs font-semibold text-foreground">
                ${serviceFee.toFixed(2)}
              </Text>
            </View>
            <View className="h-px bg-border my-1" />
            <View className="flex-row justify-between">
              <Text className="text-sm font-bold text-foreground">
                Estimated Total
              </Text>
              <Text className="text-base font-bold text-primary">
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Guarantee Info */}
        <View className="flex-row items-center gap-2 mb-6 px-1">
          <ShieldCheck size={16} color="#10B981" />
          <Text className="text-xs text-muted-foreground">
            Covered by Homa Quality Guarantee with free re-work if unsatisfied.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Dispatch Button */}
      <View className="p-5 bg-card border-t border-border/80">
        <Button
          title={
            scheduleType === "instant"
              ? "Dispatch Artisan Now"
              : "Confirm Scheduled Booking"
          }
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          onPress={handleConfirmBooking}
        />
      </View>
    </SafeAreaView>
  );
}
