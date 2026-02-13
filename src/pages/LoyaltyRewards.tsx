import { useEffect, useState } from "react";
import LoyaltyService from "@/services/LoyaltyService";
import type { LoyaltyData } from "@/types/loyalty";
import { LoyaltyCard, AchievementsList } from "@/components/LoyaltyComponents";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";

export default function LoyaltyRewards() {
  const { user } = useAuth();
  const [data, setData] = useState<LoyaltyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use auth user ID, fallback to 1 as requested in prompt example
        const userId = user?.id || 1;
        const loyaltyData = await LoyaltyService.getLoyaltyData(userId);
        setData(loyaltyData);
      } catch (error) {
        console.error("Failed to fetch loyalty data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[150px] rounded-xl" />
          <Skeleton className="h-[150px] rounded-xl" />
        </div>
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
    );
  }

  if (!data) {
    return <div>Failed to load loyalty data.</div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Loyalty Rewards</h1>
      </div>

      <LoyaltyCard data={data} />

      <AchievementsList
        unlocked={data.unlocked_achievements}
        nextAvailable={data.next_available_achievements}
      />
    </div>
  );
}
