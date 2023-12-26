import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Profile } from '../../../models/profile';
import { User } from '../../../models/user';
import { ProfileService } from '../../../services/profile/profile.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {
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
