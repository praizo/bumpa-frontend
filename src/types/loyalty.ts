export interface AchievementProgress {
  name: string;
  required_spend: number;
  remaining_spend: number;
}

export interface LoyaltyData {
  unlocked_achievements: AchievementProgress[];
  next_available_achievements: AchievementProgress[];
  current_badge: string;
  next_badge: string;
  remaining_to_unlock_next_badge: number;
  next_achievement_progress: AchievementProgress;
}
