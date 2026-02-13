export interface AchievementProgress {
  name: string;
  required_spend: number;
  remaining_spend: number;
}

export interface LoyaltyData {
  unlocked_achievements: (AchievementProgress | string)[];
  next_available_achievements: AchievementProgress[];
  current_badge: string;
  next_badge: string;
  remaining_to_unlock_next_badge: number;
  next_achievement_progress: AchievementProgress;
}

export interface UnlockedBadge {
  id: number;
  name: string;
  description: string;
  required_achievements: number;
  cashback_amount: number;
  created_at: string;
  updated_at: string;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  data: {
    purchase_id: number;
    reference: string;
    amount: number;
    unlocked_achievements: any[]; // We can refine this if needed, but badges are the focus
    unlocked_badges: UnlockedBadge[];
  }
}
