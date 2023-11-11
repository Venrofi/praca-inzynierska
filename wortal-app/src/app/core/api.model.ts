export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends BasicResponse {
  userID: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface RegisterResponse extends BasicResponse {
  verificationToken: string;
}

export interface BasicResponse {
  code: string;
}
