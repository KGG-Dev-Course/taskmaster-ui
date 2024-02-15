import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../environments/environment';
import { Profile } from '../../../../shared/models/profile';
import { User } from '../../../../shared/models/user';
import { ProfileService } from '../../../../shared/services/profile.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrl: './profile-edit-page.component.css'
})
export class ProfileEditPageComponent {
  imageFile: string | Blob = '';
  imageUrl: string | ArrayBuffer | null = null;
  form: FormGroup = new FormGroup<any>({});
  user: User | undefined;
  profile: Profile | undefined;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [],
      userName: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      aboutMe: [''],
      gender: [''],
      phoneNumber: [''],
      birthday: [''],
      photo: [''],
      userId: null,
    });

    this.userService.getMineUser().subscribe(
      (userResult) => {
        this.user = userResult;

        this.form.patchValue({
          userName: this.user.userName || '',
          email: this.user.email || '',
          userId: this.user.id,
        });

        this.profileService.getMineProfile().subscribe(
          (profileResult) => {
            this.profile = profileResult;

            this.form.patchValue({
              id: this.profile.id,
              firstName: this.profile.firstName || '',
              lastName: this.profile.lastName || '',
              aboutMe: this.profile.aboutMe || '',
              gender: this.profile.gender || '',
              phoneNumber: this.profile.phoneNumber || '',
              birthday: this.profile.birthday || '',
              photo: this.profile.photo || '',
            });

            if (this.profile.photo) {
              this.imageUrl = `${environment.apiUrl}/Profile/getPhoto/${this.profile.photo}`;
            }
          }
        );
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      this.imageFile = file;
    }
  }

  onSubmit(): void {
    if (this.imageFile) {
      const formData = new FormData();
      formData.append('File', this.imageFile);

      this.profileService.uploadPhoto(formData).subscribe(
        (data) => {
          this.form.patchValue({
            photo: data.fileName,
          });

          this.handleProfileActions();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errorMessage });
        }
      );
    } else {
      this.handleProfileActions();
    }
  }

  handleProfileActions() {
    if (this.form.valid) {
      if (this.profile) {
        this.profileService.updateProfile(this.form.value).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated successful' });
            this.router.navigate(['/profile/view']);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errorMessage });
          }
        );
      } else {
        this.profileService.createProfile(this.form.value).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created successful' });
            this.router.navigate(['/profile/view']);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errorMessage });
          }
        );
      }
    } else {
      console.log('Invalid form. Please check fields.');
    }
  }
}
