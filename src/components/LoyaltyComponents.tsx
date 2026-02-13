import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge as UIBadge } from "@/components/ui/badge";
import type { LoyaltyData, AchievementProgress } from "@/types/loyalty";
import { Trophy, Star, Lock, Medal } from "lucide-react";

interface LoyaltyCardProps {
  data: LoyaltyData;
}

export function LoyaltyCard({ data }: LoyaltyCardProps) {
  const nextAchievement = data.next_achievement_progress;
  const progressToNext = nextAchievement
    ? ((nextAchievement.required_spend - nextAchievement.remaining_spend) / nextAchievement.required_spend) * 100
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardDescription>Current Status</CardDescription>
          <CardTitle className="text-3xl font-bold text-primary flex items-center gap-2">
            {data.current_badge} <Medal className="h-6 w-6 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Next Badge: <span className="font-semibold text-foreground">{data.next_badge}</span>
          </p>

          <div className="p-3 bg-background rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Spend to unlock</p>
                <p className="font-bold text-lg">₦{data.remaining_to_unlock_next_badge.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {nextAchievement && (
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Next Milestone</CardDescription>
            <CardTitle className="text-xl font-semibold">
              {nextAchievement.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  ₦{(nextAchievement.required_spend - nextAchievement.remaining_spend).toLocaleString()} / ₦{nextAchievement.required_spend.toLocaleString()}
                </span>
              </div>
              <Progress value={progressToNext} className="h-2" />
              <p className="text-xs text-muted-foreground pt-1">
                Spend ₦{nextAchievement.remaining_spend.toLocaleString()} more to unlock
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function AchievementsList({
  unlocked,
  nextAvailable
}: {
  unlocked: AchievementProgress[],
  nextAvailable: AchievementProgress[]
}) {
  return (
    <div className="space-y-8">
      {unlocked.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-green-600" /> Unlocked Achievements
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {unlocked.map((item, idx) => (
              <Card key={idx} className="border-green-500/30 bg-green-500/5">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <UIBadge variant="default" className="bg-green-600 hover:bg-green-700">Unlocked</UIBadge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Completed at ₦{item.required_spend.toLocaleString()} spend</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted-foreground" /> Available to Unlock
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nextAvailable.map((item, idx) => {
            const current = item.required_spend - item.remaining_spend;
            const percent = (current / item.required_spend) * 100;
            return (
              <Card key={idx} className="opacity-90">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <UIBadge variant="secondary">In Progress</UIBadge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{percent.toFixed(0)}%</span>
                      <span>₦{current.toLocaleString()} / ₦{item.required_spend.toLocaleString()}</span>
                    </div>
                    <Progress value={percent} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
