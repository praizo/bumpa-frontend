import api from './api';
import type { LoginCredentials, LoginResponse, User } from '../types/auth';

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Adjust endpoint as needed to match your Laravel backend (e.g., /login or /api/login)
    // Since baseURL is /api, this request goes to /api/login
    const response = await api.post<LoginResponse>('/login', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
  },

  async getUser(): Promise<User> {
    const response = await api.get<User>('/user');
    return response.data;
  }
};
