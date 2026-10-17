import { useColorScheme, vars } from "nativewind";
import { DarkTheme, DefaultTheme, type Theme } from "expo-router";

export const colors = {
  light: {
    background: "#F8FAFC",
    foreground: "#0F172A",
    card: "#FFFFFF",
    cardForeground: "#0F172A",
    border: "#E2E8F0",
    primary: "#208AEF",
    primaryForeground: "#FFFFFF",
    secondary: "#F1F5F9",
    secondaryForeground: "#0F172A",
    accent: "#F59E0B",
    accentForeground: "#FFFFFF",
    muted: "#F1F5F9",
    mutedForeground: "#64748B",
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",
    success: "#10B981",
    successForeground: "#FFFFFF",
    warning: "#F59E0B",
    warningForeground: "#FFFFFF",
  },
  dark: {
    background: "#0B0F19",
    foreground: "#F8FAFC",
    card: "#161D2E",
    cardForeground: "#F8FAFC",
    border: "#242C3E",
    primary: "#208AEF",
    primaryForeground: "#FFFFFF",
    secondary: "#1C2436",
    secondaryForeground: "#F8FAFC",
    accent: "#F59E0B",
    accentForeground: "#0B0F19",
    muted: "#1C2436",
    mutedForeground: "#94A3B8",
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",
    success: "#10B981",
    successForeground: "#FFFFFF",
    warning: "#F59E0B",
    warningForeground: "#FFFFFF",
  },
} as const;

export type ColorToken = keyof (typeof colors)["light"];

const rgb = (hex: string) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return `${value >> 16} ${(value >> 8) & 255} ${value & 255}`;
};

const makeTheme = (theme: Record<ColorToken, string>) =>
  vars({
    "--color-background": rgb(theme.background),
    "--color-foreground": rgb(theme.foreground),
    "--color-card": rgb(theme.card),
    "--color-card-foreground": rgb(theme.cardForeground),
    "--color-border": rgb(theme.border),
    "--color-primary": rgb(theme.primary),
    "--color-primary-foreground": rgb(theme.primaryForeground),
    "--color-secondary": rgb(theme.secondary),
    "--color-secondary-foreground": rgb(theme.secondaryForeground),
    "--color-accent": rgb(theme.accent),
    "--color-accent-foreground": rgb(theme.accentForeground),
    "--color-muted": rgb(theme.muted),
    "--color-muted-foreground": rgb(theme.mutedForeground),
    "--color-destructive": rgb(theme.destructive),
    "--color-destructive-foreground": rgb(theme.destructiveForeground),
    "--color-success": rgb(theme.success),
    "--color-success-foreground": rgb(theme.successForeground),
    "--color-warning": rgb(theme.warning),
    "--color-warning-foreground": rgb(theme.warningForeground),
  });

export const themes = {
  light: makeTheme(colors.light),
  dark: makeTheme(colors.dark),
};

export const navigationThemes: Record<"light" | "dark", Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.light.background,
      card: colors.light.card,
      text: colors.light.foreground,
      border: colors.light.border,
      primary: colors.light.primary,
      notification: colors.light.accent,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.dark.background,
      card: colors.dark.card,
      text: colors.dark.foreground,
      border: colors.dark.border,
      primary: colors.dark.primary,
      notification: colors.dark.accent,
    },
  },
};

export function useThemeColor(name: ColorToken) {
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";
  return colors[scheme][name];
}
