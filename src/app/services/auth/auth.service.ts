import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  /**
   * Setter & getter for role
   */
  set userRole(userRole: string) {
    localStorage.setItem('userRole', userRole);
  }

  get userRole(): string {
    return localStorage.getItem('userRole') ?? 'User';
  }

  isTokenExpired(): boolean {
    try {
      const decodedToken: any = jwtDecode(this.accessToken);
      return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }

  /**
   * Login
   *
   * @param credentials
   */
  public login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/login`, credentials).pipe(
      switchMap((response: any) => {
        this.accessToken = response.token;
        this.userRole = response.isAdmin ? 'Admin' : 'User';

        // Return a new observable with the response
        return of(response);
      }),
    );
  }

  /**
   * Register
   *
   * @param user
   */
  public register(user: { username: string; email: string; password: string; }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/register`, user);
  }

  /**
   * Logout
   *
   */
  logout(): void {
    localStorage.removeItem('accessToken');
  }
}
