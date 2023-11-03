import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of, Subject } from 'rxjs';
import { Member } from './core.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: any[] = [
    {
      username: 'admin',
      password: 'admin',
      id: '1'
    },
    {
      username: 'user',
      password: 'user',
      id: '2'
    },
    {
      username: 'moderator',
      password: 'moderator',
      id: '3'
    }
  ];

  private loginSuccessSubject = new Subject<void>();
  private logoutActionSubject = new Subject<void>();

  loginSuccess = this.loginSuccessSubject.asObservable();
  logoutSuccess = this.logoutActionSubject.asObservable();

  constructor(private http: HttpClient) { }

  notifyLoginSuccess() {
    this.loginSuccessSubject.next();
  }

  notifyLogout() {
    this.logoutActionSubject.next();
  }

  login(username: string, password: string) {
    // Regex for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

    // Check if the password is valid
    // if (!passwordRegex.test(password)) {
    //   return {
    //     success: false,
    //     message: 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    //   };
    // }

    const user = this.users.find((user) => user.username === username);
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }

    // Check if the password is correct
    if (user.password !== password) {
      return { success: false, message: 'Password is incorrect' };
    }

    this.setLoggedInUser(user.id);
    this.notifyLoginSuccess();
    return { success: true, message: 'Logged in successfully', userID: this.getLoggedInUser() };
  }

  logout() {
    this.clearLoggedInUser();
    this.notifyLogout();
    return { success: true, message: 'Logged out successfully' };
  }

  isAuthenticatedUser(): boolean {
    return !!this.getLoggedInUser();
  }

  getAuthenticatedUserInformation(userID: string): Observable<Member | undefined> {
    if (!this.isAuthenticatedUser()) return of(undefined);

    return this.http.get<Member[]>('assets/data/users.json')
      .pipe(
        map((users) => users.find((user) => user.id === userID)),
        delay(500)
      );
  }

  getLoggedInUser(): string | null {
    return localStorage.getItem('user');
  }

  private setLoggedInUser(userID: string): void {
    localStorage.setItem('user', userID);
  }

  private clearLoggedInUser(): void {
    localStorage.removeItem('user');
  }
}
