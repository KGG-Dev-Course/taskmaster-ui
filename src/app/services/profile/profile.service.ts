import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile, ProfileUploadResult } from '../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  /**
   * GetAllProfiles
   *
   */
  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${environment.apiUrl}/Profile`);
  }

  /**
   * Get profile by ID
   *
   * @param id
   */
  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiUrl}/Profile/${id}`);
  }

  /**
   * Create a new profile
   *
   * @param profile
   */
  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${environment.apiUrl}/Profile`, profile);
  }

  /**
   * Update profile
   *
   * @param profile
   */
  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${environment.apiUrl}/Profile/${profile.id}`, profile);
  }

  /**
   * Delete profile
   *
   * @param id
   */
  deleteProfile(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Profile/${id}`);
  }

  /**
   * Get mine profile
   *
   */
  getMineProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiUrl}/Profile/mine`);
  }

  /**
   * Upload photo
   *
   */
  uploadPhoto(formData: FormData): Observable<ProfileUploadResult> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<ProfileUploadResult>(`${environment.apiUrl}/Profile/uploadPhoto`, formData, { headers: headers });
  }
}
