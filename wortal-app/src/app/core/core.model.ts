import { Track } from "../modules/homepage/homepage.model";

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

export interface Artist {
  id: string;
  name: string;
  description: string;
  avatar: string;
  albums: ArtistAlbum[];
  fans: string[];
}

export interface ArtistAlbum {
  id: string;
  title: string;
  releaseDate: string;
}

export interface ArtistAlbumDetails extends ArtistAlbum {
  tracks: Track[];
  description: string;
  duration: string;
  genre: string;
  rating: number;
}
