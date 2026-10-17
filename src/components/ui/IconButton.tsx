import React from "react";
import { Pressable, PressableProps, View } from "react-native";

interface IconButtonProps extends PressableProps {
  icon: React.ReactNode;
  size?: number; // size in px
  badgeCount?: number;
  variant?: "surface" | "primary" | "ghost" | "glass";
  className?: string;
}

export function IconButton({
  icon,
  size = 44,
  badgeCount,
  variant = "surface",
  className = "",
  ...props
}: IconButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white";
      case "ghost":
        return "bg-transparent";
      case "glass":
        return "bg-white/80 dark:bg-card/80 border border-white/20";
      case "surface":
      default:
        return "bg-card border border-border shadow-xs";
    }
  };

  return (
    <Pressable
      style={{ width: size, height: size }}
      className={`rounded-full items-center justify-center relative active:scale-95 transition-transform ${getVariantStyles()} ${className}`}
      {...props}
    >
      {icon}
      {typeof badgeCount === "number" && badgeCount > 0 && (
        <View className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 bg-destructive rounded-full items-center justify-center border-2 border-card">
          <View className="h-1.5 w-1.5 rounded-full bg-white" />
        </View>
      )}
    </Pressable>
  );
}
