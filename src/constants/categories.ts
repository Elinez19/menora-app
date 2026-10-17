import { ServiceCategoryItem } from "@/types/handyman";

export const SERVICE_CATEGORIES: ServiceCategoryItem[] = [
  {
    id: "house",
    name: "House",
    icon: "Home",
    description: "General home repairs, mounting, maintenance",
    itemCount: 42,
  },
  {
    id: "electricity",
    name: "Electricity",
    icon: "Zap",
    description: "Wiring, fixtures, outlets & electrical panels",
    itemCount: 28,
  },
  {
    id: "handcraft",
    name: "Handcraft",
    icon: "Hammer",
    description: "Carpentry, custom woodwork & furniture repair",
    itemCount: 19,
  },
  {
    id: "plumber",
    name: "Plumber",
    icon: "Droplets",
    description: "Pipe leakages, faucet install, drainage & unclogging",
    itemCount: 35,
  },
  {
    id: "painting",
    name: "Painting",
    icon: "Paintbrush",
    description: "Interior & exterior wall painting & refinishing",
    itemCount: 24,
  },
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "Sparkles",
    description: "Deep house cleaning, sanitization & pressure wash",
    itemCount: 31,
  },
  {
    id: "more",
    name: "More",
    icon: "LayoutGrid",
    description: "Explore all 20+ specialized home services",
    itemCount: 110,
  },
];
