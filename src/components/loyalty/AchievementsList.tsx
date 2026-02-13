import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AchievementProgress } from "@/types/loyalty";
import { AchievementCard } from "./AchievementCard";

export function AchievementsList({
  unlocked,
  nextAvailable
}: {
  unlocked: (AchievementProgress | string)[],
  nextAvailable: AchievementProgress[]
}) {
  // Normalize unlocked achievements (API returns strings, but we need objects)
  const normalizedUnlocked = unlocked.map(item => {
    if (typeof item === 'string') {
      return {
        name: item,
        required_spend: 0,
        remaining_spend: 0
      } as AchievementProgress;
    }
    return item;
  });

  const allAchievements = [...normalizedUnlocked, ...nextAvailable];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            All ({allAchievements.length})
          </TabsTrigger>
          <TabsTrigger
            value="unlocked"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Unlocked ({normalizedUnlocked.length})
          </TabsTrigger>
          <TabsTrigger
            value="inprogress"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            In Progress ({nextAvailable.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {normalizedUnlocked.map((item, idx) => <AchievementCard key={`unlocked-${idx}`} item={item} isUnlocked={true} />)}
            {nextAvailable.map((item, idx) => <AchievementCard key={`locked-${idx}`} item={item} isUnlocked={false} />)}
          </div>
        </TabsContent>

        <TabsContent value="unlocked" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {normalizedUnlocked.length > 0 ? (
              normalizedUnlocked.map((item, idx) => <AchievementCard key={idx} item={item} isUnlocked={true} />)
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">No achievements unlocked yet.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="inprogress" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nextAvailable.length > 0 ? (
              nextAvailable.map((item, idx) => <AchievementCard key={idx} item={item} isUnlocked={false} />)
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">No achievements in progress.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
