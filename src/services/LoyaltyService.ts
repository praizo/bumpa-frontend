import api from './api';
import type { LoyaltyData, PurchaseResponse } from '../types/loyalty';

const LoyaltyService = {
  async getLoyaltyData(userId: string | number): Promise<LoyaltyData> {
    const response = await api.get<LoyaltyData>(`/users/${userId}/achievements`);
    return response.data;
  },

  async makePurchase(amount: number): Promise<PurchaseResponse> {
    const response = await api.post<PurchaseResponse>('/purchase', { amount });
    return response.data;
  }
};

export default LoyaltyService;
