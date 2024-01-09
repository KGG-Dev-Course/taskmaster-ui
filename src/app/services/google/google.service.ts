import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Media } from '../../models/media';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  public accessToken = '';

  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService,
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  getAccessToken(): Promise<string> {
    return this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID)
      .then(accessToken => this.accessToken = accessToken);
  }

  getPhotos(): Observable<Media[]> {
    if (!this.accessToken) {
      return from(this.getAccessToken()).pipe(
        switchMap(() => {
          return this.http.get<Media[]>(`${environment.apiUrl}/GooglePhotos/getPhotos?accessToken=${this.accessToken}`);
        })
      );
    } else {
      return this.http.get<Media[]>(`${environment.apiUrl}/GooglePhotos/getPhotos?accessToken=${this.accessToken}`);
    }
  }
}
