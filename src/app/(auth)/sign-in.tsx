import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { authClient } from "@/lib/auth-client";
import { useAuthUser } from "@/context/AuthContext";

export default function SignInScreen() {
  const { exitGuestMode } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const [isApplePending, setIsApplePending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailSignIn = async () => {
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      toast.error("Please enter both email and password.");
      return;
    }

    setErrorMessage(null);
    setIsPending(true);

    try {
      const response = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (response.error) {
        const message = response.error.message || "Failed to sign in. Please try again.";
        setErrorMessage(message);
        toast.error(message);
      } else {
        await exitGuestMode();
        toast.success("Welcome back!");
        router.replace("/(tabs)");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsPending(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "apple") => {
    setErrorMessage(null);
    if (provider === "google") {
      setIsGooglePending(true);
    } else {
      setIsApplePending(true);
    }

    try {
      const res = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (res?.error) {
        const msg = res.error.message || `Failed to sign in with ${provider}.`;
        setErrorMessage(msg);
        toast.error(msg);
      } else {
        toast.success(`Signed in with ${provider === "google" ? "Google" : "Apple"}`);
        router.replace("/");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `Failed to sign in with ${provider}.`;
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      if (provider === "google") {
        setIsGooglePending(false);
      } else {
        setIsApplePending(false);
      }
    }
  };

  const anyLoading = isPending || isGooglePending || isApplePending;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 20,
            flexGrow: 1,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="mb-8 items-center">
            <View className="h-14 w-14 rounded-2xl bg-primary/10 items-center justify-center mb-4 border border-primary/20">
              <View className="h-6 w-6 rounded-full bg-primary" />
            </View>
            <Text className="text-2xl font-bold text-foreground">Welcome Back</Text>
            <Text className="text-sm text-muted-foreground mt-1 text-center">
              Sign in to your Menora account to continue
            </Text>
          </View>

          {/* Error Banner */}
          {errorMessage ? (
            <View className="mb-4 rounded-control bg-destructive/10 border border-destructive/20 p-3.5">
              <Text className="text-xs text-destructive font-medium leading-relaxed">
                {errorMessage}
              </Text>
            </View>
          ) : null}

          {/* Social Sign-in Buttons */}
          <View className="gap-3 mb-6">
            <Pressable
              onPress={() => handleSocialSignIn("google")}
              disabled={anyLoading}
              className="h-control flex-row items-center justify-center rounded-control bg-card border border-border active:opacity-75"
            >
              {isGooglePending ? (
                <ActivityIndicator size="small" color="#208AEF" />
              ) : (
                <Text className="text-sm font-semibold text-foreground">
                  Continue with Google
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => handleSocialSignIn("apple")}
              disabled={anyLoading}
              className="h-control flex-row items-center justify-center rounded-control bg-card border border-border active:opacity-75"
            >
              {isApplePending ? (
                <ActivityIndicator size="small" color="#208AEF" />
              ) : (
                <Text className="text-sm font-semibold text-foreground">
                  Continue with Apple
                </Text>
              )}
            </Pressable>
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-border" />
            <Text className="px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              or email
            </Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Email & Password Form */}
          <View className="gap-4 mb-6">
            <View>
              <Text className="text-xs font-semibold text-foreground mb-1.5">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!anyLoading}
                className="h-control rounded-control bg-card border border-border px-4 text-sm text-foreground"
              />
            </View>

            <View>
              <Text className="text-xs font-semibold text-foreground mb-1.5">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                editable={!anyLoading}
                className="h-control rounded-control bg-card border border-border px-4 text-sm text-foreground"
              />
            </View>
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleEmailSignIn}
            disabled={anyLoading}
            className="h-control flex-row items-center justify-center rounded-control bg-primary active:opacity-85 shadow-sm"
          >
            {isPending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="text-sm font-semibold text-primary-foreground">
                Sign In
              </Text>
            )}
          </Pressable>

          {/* Switch to Sign Up */}
          <View className="mt-8 flex-row items-center justify-center">
            <Text className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
            </Text>
            <Link href="/(auth)/sign-up" asChild>
              <Pressable disabled={anyLoading}>
                <Text className="text-xs font-semibold text-primary">
                  Create one
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
