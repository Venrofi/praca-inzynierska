// Group / Artist / Event
export interface BaseWortalElement {
  id: string;
  name: string;
}

// User
export interface BaseWortalUser extends BaseWortalElement {
  avatar: string;
}

// MEMBER
export interface Member extends BaseWortalUser {
  bio: string;
  email: string;
  posts: string[];
  joinedGroups: BaseWortalElement[]; // Groups joined by the Member
  attendedEvents: BaseWortalElement[]; // Events attended by the Member
  followedArtists: BaseWortalElement[]; // Artists followed by the Member
  role: MemberRole;
}

export type MemberRole = 'ADMIN' | 'USER' | 'MODERATOR';

// ARTIST
export interface Artist extends BaseWortalElement {
  image: string;
  description: string;
  albums: ArtistAlbum[]; // Albums that the artist has created
  events: BaseWortalElement[]; // Events about the Artist
  followers: BaseWortalElement[]; // Members that follow the Artist
  discussionPosts: BaseWortalElement[]; // Discussion posts about the Artist
}

export interface ArtistAlbum extends BaseWortalElement {
  cover: string;
  releaseDate: string;
}

export interface ArtistAlbumDetails extends ArtistAlbum {
  tracks: Track[];
  description: string;
  duration: string;
  genre: string;
  rating: number;
}

export interface Track {
  title: string;
  duration: string;
}

// GROUP
export interface Group extends BaseWortalElement {
  image: string;
  description: string;
  events: BaseWortalElement[]; // Events created by the Group
  members: BaseWortalElement[]; // Members that joined the Group
  discussionPosts: BaseWortalElement[]; // Discussion posts created by the Group
}


// EVENT
export interface Event extends BaseWortalElement {
  date: string;
  image: string;
  location: string;
  description: string;
  promoter: BaseWortalElement; // Artist / Group
  participants: BaseWortalElement[]; // Members that are attending the event
}
