import { BaseWortalElement, BaseWortalUser, Track } from "src/app/core/core.model";

export interface DiscussionPost {
  id: string;
  author: DiscussionPostAuthor;
  topic: DiscussionPostTopic;
  title: string;
  creationTime: string;
  numberOfComments: number;
}

// DiscussionPostAuthor:
// - can be created by a Member of a Group (author has name)
// - can be added by a moderator/admin about an Artist (author has no name and it's hidden)
export interface DiscussionPostAuthor {
  id: string;
  name?: string;
  avatar: string;
  active: boolean;
}

// DiscussionPostTopic:
// - can be about an Artist (type is ARTIST, name is ArtistName and it's ID)
// - can be about a Group (type is GROUP, name is GroupName and it's ID)
// - DiscussionPosts from a Group can only be vibile to Members of that Group (we can add a public/private flag to the Group in the future)
export interface DiscussionPostTopic extends BaseWortalElement {
  type: DiscussionPostType;
}

export type DiscussionPostType = 'ARTIST' | 'GROUP';

export interface DiscussionPostDetails extends DiscussionPost {
  comments: Comment[];
  content: string;
}

// Comment:
// - can be created by a Member on a DiscussionPost of any type
export interface Comment {
  author: BaseWortalUser;
  creationTime: string;
  content: string;
}

export interface PremiereAlbum {
  id: string;
  title: string;
  artist: BaseWortalElement;
  cover: string;
  releaseDate: string;
}

export interface PremiereAlbumDetails extends PremiereAlbum {
  tracks: Track[];
  description: string;
  duration: string;
  genre: string;
  rating: number;
}

export interface HomepageSideRecommendations {
  topDiscussions: Recommendation;
  topArtists: Recommendation;
  topMembers: Recommendation;
  recommendedGroups: Recommendation;
}

export interface Recommendation {
  title: string;
  content: BaseWortalElement[];
}
