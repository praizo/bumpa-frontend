import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge as UIBadge } from "@/components/ui/badge";
import type { LoyaltyData } from "@/types/loyalty";
import { Trophy, Target, Shield } from "lucide-react";
import { getBadgeInfo, formatCurrency } from "./utils";

interface LoyaltyCardProps {
  data: LoyaltyData;
}

export function LoyaltyCard({ data }: LoyaltyCardProps) {
  const nextAchievement = data.next_achievement_progress;
  const progressToNext = nextAchievement
    ? ((nextAchievement.required_spend - nextAchievement.remaining_spend) / nextAchievement.required_spend) * 100
    : 0;

  const currentSpend = nextAchievement ? nextAchievement.required_spend - nextAchievement.remaining_spend : 0;

  const badgeStyle = getBadgeInfo(data.current_badge);
  const BadgeIcon = badgeStyle.icon;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Current Badge Card */}
      <Card className="flex flex-col items-center justify-center text-center py-8 border-border/50 shadow-sm">
        <CardContent className="flex flex-col items-center gap-4">
          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Current Badge</span>

          <div className="relative">
            <div className={`p-6 rounded-full ${badgeStyle.bgColor === 'bg-primary/10' ? 'bg-muted' : badgeStyle.bgColor}`}>
              <BadgeIcon className={`h-16 w-16 ${badgeStyle.color} ${badgeStyle.fill}`} strokeWidth={1.5} />
            </div>
          </div>

          <UIBadge className={`${badgeStyle.bgColor === 'bg-primary/10' ? 'bg-muted text-primary' : badgeStyle.bgColor + ' ' + badgeStyle.color} hover:${badgeStyle.bgColor} border ${badgeStyle.borderColor} px-6 py-1.5 text-sm rounded-full pointer-events-none`}>
            {data.current_badge}
          </UIBadge>

          <div className="mt-4 pt-4 border-t border-border w-full max-w-[200px]">
            <p className="text-xs text-muted-foreground">
              {data.remaining_to_unlock_next_badge > 0
                ? `${data.remaining_to_unlock_next_badge} more achievements to unlock ${data.next_badge}`
                : "You have unlocked all badges!"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Goal Card */}
      {nextAchievement ? (
        <Card className="flex flex-col justify-center border-border/50 shadow-sm bg-muted/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold text-sm uppercase tracking-wide text-foreground">Next Goal</span>
              </div>
              <UIBadge variant="secondary" className="font-mono">{progressToNext.toFixed(0)}%</UIBadge>
            </div>
            <CardTitle className="text-2xl mt-2">{nextAchievement.name}</CardTitle>
            <CardDescription className="text-sm">
              Spend {formatCurrency(nextAchievement.remaining_spend)} more to unlock
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <Progress value={progressToNext} className="h-3 bg-muted-foreground/20 [&>div]:bg-black" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
              <span>{formatCurrency(currentSpend)} spent</span>
              <span>{formatCurrency(nextAchievement.required_spend)} target</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col items-center justify-center border-border/50 shadow-sm bg-muted/30">
          <CardContent className="text-center py-10">
            <Trophy className="h-12 w-12 text-yellow-500 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg">All Goals Achieved!</h3>
            <p className="text-muted-foreground text-sm">You've reached the top!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
