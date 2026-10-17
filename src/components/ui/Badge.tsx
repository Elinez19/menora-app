import React from "react";
import { View, Text } from "react-native";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "outline" | "muted";
  icon?: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  label,
  variant = "secondary",
  icon,
  size = "sm",
  className = "",
}: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary/10 border-primary/20 text-primary";
      case "success":
        return "bg-success/10 border-success/20 text-success";
      case "warning":
        return "bg-warning/10 border-warning/20 text-warning";
      case "outline":
        return "bg-transparent border-border text-foreground";
      case "muted":
        return "bg-muted border-transparent text-muted-foreground";
      case "secondary":
      default:
        return "bg-secondary border-border/60 text-secondary-foreground";
    }
  };

  const isSmall = size === "sm";

  return (
    <View
      className={`flex-row items-center rounded-full border px-2.5 ${
        isSmall ? "py-0.5" : "py-1"
      } ${getStyles()} ${className}`}
    >
      {icon && <View className="mr-1">{icon}</View>}
      <Text
        className={`font-semibold ${
          isSmall ? "text-[11px]" : "text-xs"
        } ${getStyles().split(" ").pop()}`}
      >
        {label}
      </Text>
    </View>
  );
}
