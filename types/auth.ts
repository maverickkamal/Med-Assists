export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  data: AuthUser | null;
  error: AuthError | null;
}