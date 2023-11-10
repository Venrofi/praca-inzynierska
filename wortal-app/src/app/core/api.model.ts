export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: string;
  userID: string;
}
