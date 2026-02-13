export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Minimal structure; expand as needed
export interface LoginCredentials {
  email?: string;
  password?: string;
}
