import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Profile } from '../../../../shared/models/profile';
import { User } from '../../../../shared/models/user';
import { ProfileService } from '../../../../shared/services/profile.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-profile-view-page',
  templateUrl: './profile-view-page.component.html',
  styleUrl: './profile-view-page.component.css'
})
export class ProfileViewPageComponent {
  imageUrl: string | ArrayBuffer | null = null;
  user: User | undefined;
  profile: Profile | undefined;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getMineUser().subscribe(
      (userResult) => {
        this.user = userResult;

        this.profileService.getMineProfile().subscribe(
          (profileResult) => {
            this.profile = profileResult;

            if (this.profile.photo) {
              this.imageUrl = `${environment.apiUrl}/Profile/getPhoto/${this.profile.photo}`;
            }
          }
        );
      }
    );
  }
}
