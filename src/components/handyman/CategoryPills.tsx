import React from "react";
import { ScrollView, Text, Pressable, View } from "react-native";
import {
  Home,
  Zap,
  Hammer,
  Droplets,
  LayoutGrid,
  Paintbrush,
  Sparkles,
} from "lucide-react-native";
import { ServiceCategory } from "@/types/handyman";
import { SERVICE_CATEGORIES } from "@/constants/categories";

interface CategoryPillsProps {
  selectedCategory: ServiceCategory | "all";
  onSelectCategory: (category: ServiceCategory | "all") => void;
  className?: string;
}

export function CategoryPills({
  selectedCategory,
  onSelectCategory,
  className = "",
}: CategoryPillsProps) {
  const getCategoryIcon = (id: ServiceCategory, isSelected: boolean) => {
    const iconColor = isSelected ? "#FFFFFF" : "#4F6BFF";
    const size = 20;

    switch (id) {
      case "house":
        return <Home size={size} color={iconColor} />;
      case "electricity":
        return <Zap size={size} color={iconColor} />;
      case "handcraft":
        return <Hammer size={size} color={iconColor} />;
      case "plumber":
        return <Droplets size={size} color={iconColor} />;
      case "painting":
        return <Paintbrush size={size} color={iconColor} />;
      case "cleaning":
        return <Sparkles size={size} color={iconColor} />;
      case "more":
      default:
        return <LayoutGrid size={size} color={iconColor} />;
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
      className={`py-3 ${className}`}
    >
      {SERVICE_CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;

        return (
          <Pressable
            key={cat.id}
            onPress={() => onSelectCategory(isSelected ? "all" : cat.id)}
            className="items-center active:scale-95 transition-transform"
          >
            <View
              className={`h-16 w-16 rounded-full items-center justify-center border shadow-xs ${
                isSelected
                  ? "bg-primary border-primary shadow-md"
                  : "bg-white dark:bg-card border-border/70"
              }`}
            >
              {getCategoryIcon(cat.id, isSelected)}
            </View>
            <Text
              className={`text-xs mt-2 font-medium ${
                isSelected
                  ? "text-primary font-bold"
                  : "text-foreground/80 dark:text-foreground/90"
              }`}
            >
              {cat.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
