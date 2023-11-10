export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: string;
  userID: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface RegisterResponse {
  code: string;
}
