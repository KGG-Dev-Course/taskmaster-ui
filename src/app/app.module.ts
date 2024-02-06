import {
  FacebookLoginProvider,
  GoogleInitOptions,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig
} from '@abacritt/angularx-social-login';
import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TicketAddComponent } from './pages/ticket/ticket-add/ticket-add.component';
import { TicketEditComponent } from './pages/ticket/ticket-edit/ticket-edit.component';
import { TicketListComponent } from './pages/ticket/ticket-list/ticket-list.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { ProfileViewComponent } from './pages/profile/profile-view/profile-view.component';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';
import { GalleryListComponent } from './pages/gallery/gallery-list/gallery-list.component';

const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false,
  scopes: 'https://www.googleapis.com/auth/photoslibrary.readonly'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    TicketListComponent,
    TicketAddComponent,
    TicketEditComponent,
    ForgotPasswordComponent,
    UserListComponent,
    UserAddComponent,
    ProfileViewComponent,
    ProfileEditComponent,
    GalleryListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    DialogModule,
    PanelMenuModule,
    MenubarModule,
    BreadcrumbModule,
    TagModule,
    EditorModule,
    DropdownModule,
    ConfirmDialogModule,
    MenuModule,
    AvatarModule,
    CardModule,
    ChipModule,
    PasswordModule,
    DividerModule,
    PanelModule,
    InputMaskModule,
    RadioButtonModule,
    GoogleSigninButtonModule,
    GalleriaModule,
    FileUploadModule,
    NgOptimizedImage
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId,
              googleLoginOptions
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookClientId)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
