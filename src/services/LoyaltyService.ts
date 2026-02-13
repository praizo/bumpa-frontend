import api from './api';
import type { LoyaltyData } from '../types/loyalty';

const LoyaltyService = {
  async getLoyaltyData(userId: string | number): Promise<LoyaltyData> {
    const response = await api.get<LoyaltyData>(`/users/${userId}/achievements`);
    return response.data;
  }
};

export default LoyaltyService;
