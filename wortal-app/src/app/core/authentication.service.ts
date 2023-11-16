import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BasicResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './api.model';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_ROOT = environment.apiBaseUrl;

  private loginSuccessSubject = new Subject<void>();
  private logoutActionSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  loginSuccess = this.loginSuccessSubject.asObservable();
  logoutSuccess = this.logoutActionSubject.asObservable();

  notifyLoginSuccess() {
    this.loginSuccessSubject.next();
  }

  notifyLogout() {
    this.logoutActionSubject.next();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_ROOT}/Authentication/login`, credentials);
  }

  register(credentials: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_ROOT}/Authentication/register`, credentials);
  }

  verify(verificationToken: string): Observable<BasicResponse> {
    const params = new HttpParams().set('token', verificationToken);

    return this.http.post<BasicResponse>(`${this.API_ROOT}/Authentication/verify`, null, { params });
  }

  forgotPassword(email: string): Observable<BasicResponse> {
    const params = new HttpParams().set('email', email);

    return this.http.post<BasicResponse>(`${this.API_ROOT}/Authentication/forgot-password`, null, { params });
  }

  logout() {
    this.clearLoggedInUser();
    this.notifyLogout();
  }

  isAuthenticatedUser(): boolean {
    return !!this.getLoggedInUser();
  }

  getLoggedInUser(): string | undefined {
    return localStorage.getItem('user') || undefined;
  }

  setLoggedInUser(userID: string): void {
    localStorage.setItem('user', userID);
  }

  clearLoggedInUser(): void {
    localStorage.removeItem('user');
  }
}
