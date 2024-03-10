import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Album, DiscussionPost, HomepageSideRecommendations } from '../homepage.model';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/core/core.model';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable()
export class HomepageService {
  private API_ROOT = environment.apiBaseUrl;
  private postsCollection: AngularFirestoreCollection<DiscussionPost>;
  posts: Observable<DiscussionPost[]>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.postsCollection = this.firestore.collection<DiscussionPost>('posts');
    this.posts = this.postsCollection.valueChanges(); // TEST: this.moviesCollection.snapshotChanges();

    this.posts.subscribe(posts => {
      console.log('Posts:', posts);
    });
  }

  getDiscussionList(userID?: string): Observable<DiscussionPost[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<DiscussionPost[]>(`${this.API_ROOT}/MainPage/discussion-posts`, { params }).pipe(
      map((posts: DiscussionPost[]) => {
        return posts.map(post => {
          return {
            ...post,
            author: {
              ...post.author,
              avatar: post.author.avatar || this.generateRandomAvatar(),
            }
          };
        })
      })
    );
  }

  getPremiereList(userID?: string): Observable<Album[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<Album[]>(`${this.API_ROOT}/MainPage/premiere-albums`, { params }).pipe(
      map((albums: Album[]) => albums.slice(0, 9)),
      map((albums: Album[]) => {
        return albums.map(album => {
          return {
            ...album,
            cover: album.cover || this.generateRandomImage(),
          };
        });
      })
    );

    // return this.http.get<Album[]>('assets/data/premiere-albums.json').pipe(delay(1000));
  }

  getEventList(userID?: string): Observable<Event[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<Event[]>(`${this.API_ROOT}/MainPage/events`, { params });
  }

  getSideRecommendations(userID?: string): Observable<HomepageSideRecommendations> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<HomepageSideRecommendations>(`${this.API_ROOT}/MainPage/side-recommendations`, { params });

    // return this.http.get<any>('assets/data/side-recommendations.json').pipe(delay(1000));
  }

  private generateRandomImage(): string {
    const randomImageSize = Math.floor(Math.random() * 300 + 600); // returns a random number between 600 and 900

    return `https://picsum.photos/${randomImageSize}/${randomImageSize}`;
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
