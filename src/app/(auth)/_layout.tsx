import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { colors } from "@/theme/app-theme";

export default function AuthLayout() {
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors[scheme].card },
        headerTintColor: colors[scheme].foreground,
        headerTitleStyle: {
          fontFamily: "Inter_600SemiBold",
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors[scheme].background },
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Create Account",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
