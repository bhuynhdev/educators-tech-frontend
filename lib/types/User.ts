export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: User;
}
