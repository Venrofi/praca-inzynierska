import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, delay, map } from 'rxjs';
import { Artist, Event } from 'src/app/core/core.model';
import { environment } from 'src/environments/environment';
import { Album, DiscussionPost, HomepageSideRecommendations } from '../homepage.model';

@Injectable()
export class HomepageService {
  private API_ROOT = environment.apiBaseUrl;

  private postsCollection: AngularFirestoreCollection<DiscussionPost>;

  private albumsCollection: AngularFirestoreCollection<Album>;

  private eventsCollection: AngularFirestoreCollection<Event>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.postsCollection = this.firestore.collection<DiscussionPost>('posts');
    this.albumsCollection = this.firestore.collection<Album>('albums');
    this.eventsCollection = this.firestore.collection<Event>('events');
  }

  getDiscussionList(userID?: string): Observable<DiscussionPost[]> {
    // const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.postsCollection.snapshotChanges().pipe(
      map((posts) => {
        return posts.map((post) => {
          const { author, topic, title, creationTime, numberOfComments } = post.payload.doc.data();
          const id = post.payload.doc.id;
          return { id, author, topic, title, creationTime, numberOfComments } as DiscussionPost;
        }).slice(0, 10);
      })
    );
  }

  getPremiereList(userID?: string): Observable<Album[]> {
    // const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.albumsCollection.snapshotChanges().pipe(
      map((albums) => {
        return albums.map((album) => {
          const { name, artist, cover, releaseDate } = album.payload.doc.data();
          const id = album.payload.doc.id;
          return { id, name, artist, cover, releaseDate } as Album;
        }).slice(0, 9);
      })
    );
  }

  getEventList(userID?: string): Observable<Event[]> {
    // const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.eventsCollection.snapshotChanges().pipe(
      map((events) => {
        return events.map((event) => {
          const { name, date, type, location, description, promoter } = event.payload.doc.data();
          const id = event.payload.doc.id;
          return { id, name, date, type, location, description, promoter } as Event;
        }).slice(0, 10);
      })
    );
  }

  getSideRecommendations(userID?: string): Observable<HomepageSideRecommendations> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    // return this.http.get<HomepageSideRecommendations>(`${this.API_ROOT}/MainPage/side-recommendations`, { params });

    return this.http.get<HomepageSideRecommendations>('assets/data/side-recommendations.json').pipe(delay(1000));
  }

  private initPostsData() {
    this.http.get<DiscussionPost[]>('assets/data/posts.json').subscribe(posts => {
      posts.forEach(post => {
        const id = this.firestore.createId();
        this.postsCollection.doc(id).set(post);
      });
    });
  }

  private initAlbumsData() {
    this.http.get<Album[]>('assets/data/albums.json').subscribe(albums => {
      albums.forEach(album => {
        const id = this.firestore.createId();
        this.albumsCollection.doc(id).set(album);
      });
    });
  }

  private initEventsData() {
    this.http.get<Event[]>('assets/data/events.json').subscribe(events => {
      events.forEach(event => {
        const id = this.firestore.createId();
        this.eventsCollection.doc(id).set(event);
      });
    });
  }

  private initArtistsData() {
    this.http.get<Artist[]>('assets/data/artists.json').subscribe(artists => {
      artists.forEach(artist => {
        const id = this.firestore.createId();
        this.firestore.collection('artists').doc(id).set(artist);
      });
    });
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
