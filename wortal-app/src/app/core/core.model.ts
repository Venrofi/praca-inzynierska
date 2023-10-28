export interface Member {
  id: string;
  username: string;
  email: string;
  groups: string[];
  role: MemberRole;
  posts: string[];
  avatar: string;
}

type MemberRole = 'ADMIN' | 'USER' | 'MODERATOR';
