import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
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

  isTokenExpired(): boolean {
    try {
      const decodedToken: any = jwtDecode(this.accessToken);
      return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  /**
   * Login
   *
   * @param credentials
   */
  public login(credentials: { username: string; password: string }): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/Auth/login`, credentials).pipe(
      switchMap((response: any) => {
        this.accessToken = response.token;

        // Return a new observable with the response
        return of(response);
      }),
    );
  }

  /**
   * Login
   *
   * @param user
   */
  public register(user: { username: string; email: string; password: string; }): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/Auth/register`, user);
  }
}
