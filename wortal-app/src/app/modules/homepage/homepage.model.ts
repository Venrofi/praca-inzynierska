// W przyszłości dodać:
// - pole comments: Comment[] zawierające wszystkie komentarze pod postem
// - pole authorId: string zawierające id autora postu
// - pole content: string zawierające treść postu
// - pole tags: string[] zawierające tagi postu
// - pole likes: number zawierające liczbę polubień postu


export interface DiscussionPost {
  id: string;
  authorId?: string;
  authorAvatar: string;
  topic: string;
  title: string;
  author: string;
  creationTime: string;
  numberOfComments: number;
}
