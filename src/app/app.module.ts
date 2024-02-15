import {
  FacebookLoginProvider,
  GoogleInitOptions,
  GoogleLoginProvider, GoogleSigninButtonModule,
  SocialAuthServiceConfig
} from '@abacritt/angularx-social-login';
import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { UserModule } from './user/user.module';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { ForgotPasswordPageComponent } from './shared/pages/forgot-password-page/forgot-password-page.component';
import { RegisterPageComponent } from './shared/pages/register-page/register-page.component';

const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false,
  scopes: 'https://www.googleapis.com/auth/photoslibrary.readonly'
};

const PRIMENG_MODULES: any[] = [
  ButtonModule,
  InputTextModule,
  NgOptimizedImage,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AdminModule,
    UserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    ...PRIMENG_MODULES,
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
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor])),
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
