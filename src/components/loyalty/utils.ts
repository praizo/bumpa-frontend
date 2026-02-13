import { Trophy, Shield, Crown, Star } from "lucide-react";

export const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

// Helper to determine styling based on badge name
export const getBadgeInfo = (name: string | undefined | null) => {
  if (!name) {
    return {
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      fill: "fill-primary/20",
      icon: Trophy
    };
  }

  const lowerName = name.toLowerCase();

  if (lowerName.includes("bronze")) {
    return {
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-200",
      fill: "fill-amber-700/20",
      icon: Shield
    };
  } else if (lowerName.includes("silver")) {
    return {
      color: "text-slate-500",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-200",
      fill: "fill-slate-500/20",
      icon: Shield
    };
  } else if (lowerName.includes("gold")) {
    return {
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-200",
      fill: "fill-yellow-600/20",
      icon: Crown
    };
  } else if (lowerName.includes("platinum") || lowerName.includes("diamond")) {
    return {
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
      borderColor: "border-cyan-200",
      fill: "fill-cyan-600/20",
      icon: Star
    };
  }

  // Default for achievements
  return {
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    fill: "fill-primary/20",
    icon: Trophy
  };
};
