import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  textClassName?: string;
}

export function Button({
  title,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  disabled,
  className = "",
  textClassName = "",
  ...props
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary border border-border";
      case "outline":
        return "bg-transparent border border-primary";
      case "ghost":
        return "bg-transparent";
      case "destructive":
        return "bg-destructive/10 border border-destructive/30";
      case "primary":
      default:
        return "bg-primary shadow-sm";
    }
  };

  const getTextVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "text-secondary-foreground font-semibold";
      case "outline":
        return "text-primary font-semibold";
      case "ghost":
        return "text-foreground font-medium";
      case "destructive":
        return "text-destructive font-semibold";
      case "primary":
      default:
        return "text-primary-foreground font-semibold";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-10 px-4 rounded-full";
      case "lg":
        return "h-14 px-8 rounded-full";
      case "md":
      default:
        return "h-12 px-6 rounded-full";
    }
  };

  const getTextSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "lg":
        return "text-base font-bold";
      case "md":
      default:
        return "text-sm";
    }
  };

  return (
    <Pressable
      disabled={disabled || isLoading}
      className={`flex-row items-center justify-center active:opacity-85 ${getSizeStyles()} ${getVariantStyles()} ${
        disabled ? "opacity-50" : ""
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#FFFFFF" : "#4F6BFF"}
        />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && iconPosition === "left" && icon}
          <Text
            className={`text-center ${getTextSizeStyles()} ${getTextVariantStyles()} ${textClassName}`}
          >
            {title}
          </Text>
          {icon && iconPosition === "right" && icon}
        </View>
      )}
    </Pressable>
  );
}
