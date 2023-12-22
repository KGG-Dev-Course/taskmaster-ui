import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * GetAllUsers
   *
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/User`);
  }

  /**
   * Get user by ID
   *
   * @param id
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/User/${id}`);
  }

  /**
   * Create a new user
   *
   * @param user
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/User`, user);
  }

  /**
   * Update user
   *
   * @param user
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/User/${user.id}`, user);
  }

  /**
   * Delete user
   *
   * @param id
   */
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/User/${id}`);
  }
}
