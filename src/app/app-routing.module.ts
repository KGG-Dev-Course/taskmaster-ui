import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TicketAddComponent } from './pages/ticket/ticket-add/ticket-add.component';
import { TicketEditComponent } from './pages/ticket/ticket-edit/ticket-edit.component';
import { TicketListComponent } from './pages/ticket/ticket-list/ticket-list.component';
import { AuthGuard } from './services/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'ticket/list', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'ticket',
    children: [
      { path: 'list', component: TicketListComponent },
      { path: 'add', component: TicketAddComponent },
      { path: 'edit/:id', component: TicketEditComponent }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
