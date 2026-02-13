import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge as UIBadge } from "@/components/ui/badge";
import type { AchievementProgress } from "@/types/loyalty";
import { Lock, CheckCircle2, Medal } from "lucide-react";
import { getBadgeInfo, formatCurrency } from "./utils";

interface AchievementCardProps {
  item: AchievementProgress;
  isUnlocked: boolean;
}

export function AchievementCard({ item, isUnlocked }: AchievementCardProps) {
  const current = isUnlocked
    ? item.required_spend
    : item.required_spend - item.remaining_spend;
  const percent = (current / item.required_spend) * 100;

  const style = getBadgeInfo(item.name);

  const activeStyle = isUnlocked && style.color === "text-primary"
    ? { bgColor: "bg-muted", color: "text-primary", icon: Medal }
    : style;

  const Icon = activeStyle.icon;

  return (
    <Card className={`border shadow-sm ${isUnlocked ? 'bg-white' : 'bg-muted/30 opacity-90'}`}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${isUnlocked ? activeStyle.bgColor : 'bg-muted text-muted-foreground'}`}>
                {isUnlocked ? <Icon className={`h-5 w-5 ${activeStyle.color}`} /> : <Lock className="h-5 w-5" />}
              </div>
              <div>
                <h4 className="font-semibold text-base text-foreground min-h-[24px]">
                  {item?.name}
                </h4>
                {isUnlocked ? (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-foreground/80">Unlocked</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <span>{formatCurrency(item.required_spend)}</span>
                  </div>
                )}
              </div>
            </div>
            {isUnlocked && <UIBadge variant="secondary" className="text-[10px] uppercase tracking-wider font-medium">Unlocked</UIBadge>}
          </div>

          {!isUnlocked && (
            <div className="space-y-2 mt-1">
              <Progress value={percent} className="h-2 [&>div]:bg-black" />
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>{formatCurrency(current)}</span>
                <span>{formatCurrency(item.required_spend)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

