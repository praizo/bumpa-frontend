import { useEffect, useState } from "react";
import LoyaltyService from "@/services/LoyaltyService";
import type { LoyaltyData, UnlockedBadge } from "@/types/loyalty";
import { LoyaltyCard, AchievementsList } from "@/components/loyalty";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Trophy } from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoyaltyRewards() {
  const { user } = useAuth();
  const [data, setData] = useState<LoyaltyData | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState<string>("300");
  const [isProcessing, setIsProcessing] = useState(false);

  // Unlock Modal State
  const [unlockedBadges, setUnlockedBadges] = useState<UnlockedBadge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.id || 1;
        const loyaltyData = await LoyaltyService.getLoyaltyData(userId);
        setData(loyaltyData);
      } catch (error) {
        toast.error("Failed to load loyalty data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handlePurchase = async () => {
    if (!purchaseAmount || isNaN(Number(purchaseAmount))) return;

    try {
      setIsProcessing(true);
      const response = await LoyaltyService.makePurchase(Number(purchaseAmount));

      if (response.data.unlocked_badges && response.data.unlocked_badges.length > 0) {
        setUnlockedBadges(response.data.unlocked_badges);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const userId = user?.id || 1;
      const loyaltyData = await LoyaltyService.getLoyaltyData(userId);
      setData(loyaltyData);
      setIsModalOpen(false);
      toast.success("Purchase completed successfully!");
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

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
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground mr-auto">Earn achievements and unlock badges with every purchase.</p>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>Simulate Purchase</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Simulate Purchase</DialogTitle>
                <DialogDescription>
                  Enter an amount to simulate a purchase transaction.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2 py-4">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="amount" className="sr-only">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(e.target.value)}
                    placeholder="Enter amount (e.g. 5000)"
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-end">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button type="button" onClick={handlePurchase} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Confirm Purchase"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <LoyaltyCard data={data} />

      <AchievementsList
        unlocked={data.unlocked_achievements}
        nextAvailable={data.next_available_achievements}
      />

      {/* Level Unlock Modal */}
      <Dialog open={unlockedBadges.length > 0} onOpenChange={(open) => !open && setUnlockedBadges([])}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto bg-yellow-100 p-4 rounded-full mb-4 w-fit">
              <Trophy className="h-10 w-10 text-yellow-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center">Level Unlocked!</DialogTitle>
            <DialogDescription className="text-center">
              Congratulations! You've reached a new tier.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {unlockedBadges.map((badge) => (
              <div key={badge.id} className="bg-muted/30 p-4 rounded-lg border border-border flex flex-col items-center gap-2">
                <h3 className="font-semibold text-lg text-primary">{badge.name}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
                {badge.cashback_amount > 0 && (
                  <div className="mt-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                    ₦{badge.cashback_amount.toLocaleString()} Cashback Earned
                  </div>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="sm:justify-center">
            <Button className="w-full sm:w-auto" onClick={() => setUnlockedBadges([])}>
              Awesome!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
