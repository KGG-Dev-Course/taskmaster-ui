import { Routes } from '@angular/router';
import {TicketListComponent} from "./pages/ticket/ticket-list/ticket-list.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {ForgotComponent} from "./pages/auth/forgot/forgot.component";

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot', component: ForgotComponent }
    ]
  },
  {
    path: 'ticket/list',
    component: TicketListComponent,
  }
];
