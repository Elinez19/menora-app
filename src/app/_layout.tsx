import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import { Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

import { colors, navigationThemes, themes } from "@/theme/app-theme";
import { authClient } from "@/lib/auth-client";
import "../global.css";

WebBrowser.maybeCompleteAuthSession();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const { isPending } = authClient.useSession();
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";

  const isReady = (fontsLoaded || Boolean(fontError)) && !isPending;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationThemes[scheme]}>
        <View
          className="flex-1 bg-background"
          style={[
            themes[scheme],
            { flex: 1, backgroundColor: colors[scheme].background },
          ]}
        >
          <StatusBar style={scheme === "dark" ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors[scheme].card },
              headerTintColor: colors[scheme].foreground,
              headerShadowVisible: false,
              contentStyle: { backgroundColor: colors[scheme].background },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: true }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
          <Toaster theme={scheme} />
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
