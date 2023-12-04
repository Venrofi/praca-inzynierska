import { BaseWortalUser } from "./core.model";

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

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AddCommentResponse extends BasicResponse {
  createdComment: {
    author: BaseWortalUser;
    creationTime: string;
    content: string;
  }
}

export interface CreateDiscussionPostRequest {
  authorId: string;
  groupId: string;
  title: string;
  content: string;
}

export interface UpdateMemberRequest {
  memberId: string;
  data: {
    bio: string;
  }
}

export interface EditDiscussionPostRequest {
  postId: string;
  userId: string;
  data: {
    title: string;
    content: string;
  }
}

export interface BasicResponse {
  code: string;
}
