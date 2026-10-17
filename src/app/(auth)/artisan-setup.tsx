import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { toast } from "sonner-native";
import { useAuthUser } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  DollarSign,
  MapPin,
  Sparkles,
} from "lucide-react-native";
import { SERVICE_CATEGORIES } from "@/constants/categories";
import { ServiceCategory } from "@/types/handyman";

export default function ArtisanSetupScreen() {
  const { setRole } = useAuthUser();
  const [step, setStep] = useState(1);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [trade, setTrade] = useState<ServiceCategory>("plumber");
  const [hourlyRate, setHourlyRate] = useState("34.00");
  const [yearsExperience, setYearsExperience] = useState("5");
  const [radiusKm, setRadiusKm] = useState("25");
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = async () => {
    if (step === 1) {
      if (!name.trim() || !phone.trim()) {
        toast.error("Please enter your name and phone number");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!hourlyRate.trim()) {
        toast.error("Please enter your hourly rate");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      setIsSubmitting(true);
      try {
        await setRole("artisan");
        toast.success("Artisan profile registered successfully! Welcome to Homa.");
        router.replace("/(tabs)");
      } catch {
        toast.error("Failed to complete setup");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {/* Header Bar */}
        <View className="px-6 py-4 flex-row items-center justify-between border-b border-border/60">
          <Pressable
            onPress={() => {
              if (step > 1) setStep((s) => s - 1);
              else router.back();
            }}
            className="h-10 w-10 rounded-full bg-card border border-border items-center justify-center active:opacity-75"
          >
            <ArrowLeft size={18} color="#0F172A" />
          </Pressable>

          <View className="items-center">
            <Text className="text-xs font-semibold text-primary uppercase tracking-wider">
              Artisan Onboarding
            </Text>
            <Text className="text-sm font-bold text-foreground">
              Step {step} of 4
            </Text>
          </View>

          <View className="w-10" />
        </View>

        {/* Progress Bar */}
        <View className="h-1 w-full bg-border">
          <View
            className="h-full bg-primary transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </View>

        <ScrollView
          className="flex-1 px-6 pt-6"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <View className="gap-5">
              <View>
                <Text className="text-2xl font-bold text-foreground">
                  Personal Details
                </Text>
                <Text className="text-sm text-muted-foreground mt-1">
                  Homeowners will see your name and contact you for live job dispatch.
                </Text>
              </View>

              <View className="gap-4 mt-2">
                <View>
                  <Text className="text-xs font-semibold text-foreground mb-1.5">
                    Full Name
                  </Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="e.g. Syeila Onstefen"
                    placeholderTextColor="#94A3B8"
                    className="h-12 bg-card rounded-2xl px-4 border border-border text-foreground font-medium"
                  />
                </View>

                <View>
                  <Text className="text-xs font-semibold text-foreground mb-1.5">
                    Phone Number (for SMS & Dispatch calls)
                  </Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+1 (555) 019-2834"
                    keyboardType="phone-pad"
                    placeholderTextColor="#94A3B8"
                    className="h-12 bg-card rounded-2xl px-4 border border-border text-foreground font-medium"
                  />
                </View>

                <View>
                  <Text className="text-xs font-semibold text-foreground mb-1.5">
                    Years of Experience in Trade
                  </Text>
                  <TextInput
                    value={yearsExperience}
                    onChangeText={setYearsExperience}
                    placeholder="10"
                    keyboardType="number-pad"
                    placeholderTextColor="#94A3B8"
                    className="h-12 bg-card rounded-2xl px-4 border border-border text-foreground font-medium"
                  />
                </View>
              </View>
            </View>
          )}

          {/* STEP 2: Trade & Specialty */}
          {step === 2 && (
            <View className="gap-5">
              <View>
                <Text className="text-2xl font-bold text-foreground">
                  Select Your Primary Trade
                </Text>
                <Text className="text-sm text-muted-foreground mt-1">
                  Select the main service you specialize in providing.
                </Text>
              </View>

              <View className="gap-2.5 mt-2">
                {SERVICE_CATEGORIES.filter((c) => c.id !== "more").map((cat) => {
                  const isSelected = trade === cat.id;

                  return (
                    <Pressable
                      key={cat.id}
                      onPress={() => setTrade(cat.id)}
                      className={`p-4 rounded-2xl border-2 flex-row items-center justify-between transition-all ${
                        isSelected
                          ? "bg-primary/5 border-primary"
                          : "bg-card border-border/80"
                      }`}
                    >
                      <View>
                        <Text className="text-base font-bold text-foreground">
                          {cat.name}
                        </Text>
                        <Text className="text-xs text-muted-foreground mt-0.5">
                          {cat.description}
                        </Text>
                      </View>
                      {isSelected && (
                        <View className="h-6 w-6 rounded-full bg-primary items-center justify-center">
                          <Check size={14} color="#FFFFFF" />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* STEP 3: Rates & Work Radius */}
          {step === 3 && (
            <View className="gap-5">
              <View>
                <Text className="text-2xl font-bold text-foreground">
                  Rates & Coverage
                </Text>
                <Text className="text-sm text-muted-foreground mt-1">
                  Set how much you charge per hour and how far you are willing to travel.
                </Text>
              </View>

              <View className="gap-4 mt-2">
                <View>
                  <Text className="text-xs font-semibold text-foreground mb-1.5">
                    Hourly Rate (USD / Hr)
                  </Text>
                  <View className="h-12 bg-card rounded-2xl px-4 border border-border flex-row items-center">
                    <DollarSign size={18} color="#4F6BFF" />
                    <TextInput
                      value={hourlyRate}
                      onChangeText={setHourlyRate}
                      placeholder="34.00"
                      keyboardType="decimal-pad"
                      placeholderTextColor="#94A3B8"
                      className="flex-1 ml-2 text-foreground font-bold text-base"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-xs font-semibold text-foreground mb-1.5">
                    Service Travel Radius (Kilometers)
                  </Text>
                  <View className="h-12 bg-card rounded-2xl px-4 border border-border flex-row items-center">
                    <MapPin size={18} color="#4F6BFF" />
                    <TextInput
                      value={radiusKm}
                      onChangeText={setRadiusKm}
                      placeholder="25"
                      keyboardType="number-pad"
                      placeholderTextColor="#94A3B8"
                      className="flex-1 ml-2 text-foreground font-semibold text-base"
                    />
                    <Text className="text-xs text-muted-foreground">km</Text>
                  </View>
                </View>

                <View className="bg-secondary/60 rounded-2xl p-4 border border-border/70 flex-row items-center gap-3">
                  <Sparkles size={20} color="#4F6BFF" />
                  <Text className="text-xs text-muted-foreground flex-1 leading-relaxed">
                    Artisans in your area with hourly rates between $25 - $45 receive an average of 4 job requests daily.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* STEP 4: Bio & Verification */}
          {step === 4 && (
            <View className="gap-5">
              <View>
                <Text className="text-2xl font-bold text-foreground">
                  Profile Bio & Trust
                </Text>
                <Text className="text-sm text-muted-foreground mt-1">
                  Introduce yourself to clients to help them choose you.
                </Text>
              </View>

              <View className="gap-4 mt-2">
                <View>
                  <Text className="text-xs font-semibold text-foreground mb-1.5">
                    About Me / Bio
                  </Text>
                  <TextInput
                    value={bio}
                    onChangeText={setBio}
                    placeholder="I'm a certified plumber with 10 years of experience. I specialize in leak detection, water heaters, and pipe replacements..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    placeholderTextColor="#94A3B8"
                    className="min-h-[120px] bg-card rounded-2xl p-4 border border-border text-foreground font-medium text-sm leading-relaxed"
                  />
                </View>

                <View className="bg-success/10 border border-success/30 rounded-2xl p-4 flex-row items-center gap-3">
                  <ShieldCheck size={24} color="#10B981" />
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-success">
                      Verified Pro Badge Eligibility
                    </Text>
                    <Text className="text-xs text-muted-foreground mt-0.5">
                      Your identity and certifications will be verified to grant you the Verified Pro checkmark.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Footer Action */}
        <View className="p-6 bg-card border-t border-border/80">
          <Button
            title={step === 4 ? "Complete Registration" : "Continue"}
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            onPress={handleNextStep}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
