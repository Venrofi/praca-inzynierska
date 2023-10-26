import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: any[] = [
    {
      username: 'admin',
      password: 'admin',
      role: 'admin'
    },
    {
      username: 'user',
      password: 'user',
      role: 'member'
    },
    {
      username: 'moderator',
      password: 'moderator',
      role: 'moderator'
    }
  ];

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

    // Check if the user exists
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }

    // Check if the password is correct
    if (user.password !== password) {
      return { success: false, message: 'Password is incorrect' };
    }

    // Set the logged in user
    this.setLoggedInUser(user);
    return { success: true, message: 'Logged in successfully' };
  }

  logout() {
    this.clearLoggedInUser();
    return { success: true, message: 'Logged out successfully' };
  }

  isAuthenticatedUser(): boolean {
    // Check if the user is logged in
    return !!this.getLoggedInUser();
  }

  private setLoggedInUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getLoggedInUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private clearLoggedInUser(): void {
    localStorage.removeItem('user');
  }
}
