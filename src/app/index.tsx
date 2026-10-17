import { Redirect } from "expo-router";
import { useAuthUser } from "@/context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function IndexGateway() {
  const { user, isGuest, isPending } = useAuthUser();

  if (isPending) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#4F6BFF" />
      </View>
    );
  }

  // If user is logged in or active guest, go straight to main tabs
  if (user || isGuest) {
    return <Redirect href="/(tabs)" />;
  }

  // Otherwise show the onboarding flow (Screen 1)
  return <Redirect href="/onboarding" />;
}
