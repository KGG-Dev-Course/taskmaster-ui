import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set userRole(userRole: string) {
    localStorage.setItem('userRole', userRole);
  }

  get userRole(): string {
    return localStorage.getItem('userRole') ?? 'User';
  }

  public isLogged(): boolean {
    return !!this.accessToken;
  }

  public isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  public isUser(): boolean {
    return this.userRole === 'User';
  }

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

  public register(user: { username: string; email: string; password: string; }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/register`, user);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }
}
