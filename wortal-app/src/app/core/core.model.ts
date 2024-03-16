// Group / Artist / Event
export interface BaseWortalElement {
  id: string;
  name: string;
}

// User
export interface BaseWortalUser extends BaseWortalElement {
  avatar: string;
  active: boolean;
}

// MEMBER
export interface Member extends BaseWortalUser {
  bio: string;
  email: string;
  posts: BaseWortalElement[];
  joinedGroups: BaseWortalElement[]; // Groups joined by the Member
  attendedEvents: BaseWortalElement[]; // Events attended by the Member
  followedArtists: BaseWortalElement[]; // Artists followed by the Member
  role: MemberRole;
}

export type MemberRole = 'ADMIN' | 'USER' | 'MODERATOR';

export interface MemberList extends BaseWortalUser {
  rank: string;
}

// ARTIST
export interface Artist extends BaseWortalElement {
  image: string;
  description: string;
  albums: BaseWortalElement[]; // Albums that the artist has created
  events: BaseWortalElement[]; // Events about the Artist
  followers: BaseWortalElement[]; // Members that follow the Artist
  discussionPosts: BaseWortalElement[]; // Discussion posts about the Artist
}

export interface ArtistList extends BaseWortalElement {
  image: string;
  rank: string;
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
  owner: BaseWortalElement | null; // Member that created the Group
}

export interface GroupList extends BaseWortalElement {
  image: string;
  rank: string;
}


// EVENT
export interface Event extends BaseWortalElement {
  date: string;
  type: EventType;
  location: string;
  description: string;
  promoter: BaseWortalElement; // Artist / Group
}
export interface EventDetails extends Event {
  image: string;
  participants: BaseWortalElement[];
}

export type EventType = 'ARTIST' | 'GROUP';

// SEARCH

export interface SearchResult {
  artists: BaseWortalElement[];
  events: BaseWortalElement[];
  posts: BaseWortalElement[];
  users?: BaseWortalElement[];
  groups?: BaseWortalElement[];
}
