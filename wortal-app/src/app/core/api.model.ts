import { BaseWortalElement, BaseWortalUser } from "./core.model";

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

export interface CreateDiscussionPostResponse extends BasicResponse {
  newPost: BaseWortalElement;
}

export interface UpdateMemberRequest {
  memberId: string;
  data: {
    bio: string;
  }
}

export interface EditDiscussionPostRequest {
  postId: string;
  authorId: string;
  data: {
    title: string;
    content: string;
  }
}

export interface EditDiscussionPostResponse extends BasicResponse {
  data: {
    title: string;
    content: string;
  }
}

export interface DeleteDiscussionPostRequest {
  postId: string;
  authorId: string;
}

export interface DeleteDiscussionPostResponse extends BasicResponse {
  deletedPost: BaseWortalElement;
}

export interface CreateNewGroupRequest {
  userId: string;
  name: string;
  description: string;
  image: string;
}

export interface CreateNewGroupResponse extends BasicResponse {
  newGroup: BaseWortalElement;
}

export interface EditGroupRequest {
  userId: string;
  groupId: string;
  data: {
    name: string;
    description: string;
    image: string;
  }
}

export interface EditGroupResponse extends BasicResponse {
  data: {
    name: string;
    description: string;
    image: string;
  }
}

export interface BasicResponse {
  code: string;
}
