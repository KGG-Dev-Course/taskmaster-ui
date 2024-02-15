import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { GalleryListPageComponent } from './pages/gallery/gallery-list-page/gallery-list-page.component';
import { ProfileEditPageComponent } from './pages/profile/profile-edit-page/profile-edit-page.component';
import { ProfileViewPageComponent } from './pages/profile/profile-view-page/profile-view-page.component';
import { TicketAddPageComponent } from './pages/ticket/ticket-add-page/ticket-add-page.component';
import { TicketEditPageComponent } from './pages/ticket/ticket-edit-page/ticket-edit-page.component';
import { TicketListPageComponent } from './pages/ticket/ticket-list-page/ticket-list-page.component';
import { UserAddPageComponent } from './pages/user/user-add-page/user-add-page.component';
import { UserListPageComponent } from './pages/user/user-list-page/user-list-page.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [adminAuthGuard],
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'ticket/list', pathMatch: 'full' },
      {
        path: 'ticket',
        children: [
          { path: 'list', component: TicketListPageComponent },
          { path: 'add', component: TicketAddPageComponent },
          { path: 'edit/:id', component: TicketEditPageComponent }
        ]
      },
      {
        path: 'user',
        children: [
          { path: 'list', component: UserListPageComponent },
          { path: 'add', component: UserAddPageComponent }
        ]
      },
      {
        path: 'profile',
        children: [
          { path: 'view', component: ProfileViewPageComponent },
          { path: 'edit', component: ProfileEditPageComponent }
        ]
      },
      {
        path: 'gallery',
        children: [
          { path: 'list', component: GalleryListPageComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
