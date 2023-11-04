export interface DiscussionPost {
  id: string;
  author: DiscussionPostAuthor;
  topic: DiscussionPostTopic;
  title: string;
  creationTime: string;
  numberOfComments: number;
}

export interface DiscussionPostAuthor {
  id: string;
  name: string;
  avatar: string;
}

export interface DiscussionPostTopic {
  id: string;
  name: string;
  type: DiscussionPostType;
}

export type DiscussionPostType = 'ARTIST' | 'GROUP';

export interface DiscussionPostDetails extends DiscussionPost {
  comments: Comment[];
  content: string;
}

export interface Comment {
  id: string;
  authorId: string;
  authorAvatar: string;
  content: string;
}

export interface PremiereAlbum {
  id: string;
  title: string;
  artist: string;
  artistId: string;
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

export interface Track {
  id: string;
  title: string;
  duration: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  cover: string;
}

export interface HomepageSideRecommendations {
  topDiscussions: Recommendation;
  topArtists: Recommendation;
  topMembers: Recommendation;
  topGroups: Recommendation;
}

export interface Recommendation {
  title: string;
  content: RecommendationContent[];
}

export interface RecommendationContent {
  id: string;
  label: string;
}
