import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { AdminRoutingModule } from './admin-routing.module';
import { GalleryListPageComponent } from './pages/gallery/gallery-list-page/gallery-list-page.component';
import { ProfileEditPageComponent } from './pages/profile/profile-edit-page/profile-edit-page.component';
import { ProfileViewPageComponent } from './pages/profile/profile-view-page/profile-view-page.component';
import { TicketAddPageComponent } from './pages/ticket/ticket-add-page/ticket-add-page.component';
import { TicketEditPageComponent } from './pages/ticket/ticket-edit-page/ticket-edit-page.component';
import { TicketListPageComponent } from './pages/ticket/ticket-list-page/ticket-list-page.component';
import { UserAddPageComponent } from './pages/user/user-add-page/user-add-page.component';
import { UserListPageComponent } from './pages/user/user-list-page/user-list-page.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

const PRIMENG_MODULES: any[] = [
  AvatarModule,
  InputTextModule,
  MenuModule,
  MenubarModule,
  SharedModule,
  ButtonModule,
  FileUploadModule,
  GalleriaModule,
  PanelModule,
  EditorModule,
  InputMaskModule,
  PaginatorModule,
  RadioButtonModule,
  BreadcrumbModule,
  CalendarModule,
  DialogModule,
  TableModule,
  TagModule,
  DividerModule,
  PasswordModule,
  ChipModule,
  ToastModule,
  ConfirmDialogModule,
];

@NgModule({
  declarations: [
    GalleryListPageComponent,
    ProfileEditPageComponent,
    ProfileViewPageComponent,
    TicketAddPageComponent,
    TicketEditPageComponent,
    TicketListPageComponent,
    UserAddPageComponent,
    UserListPageComponent,
    AdminLayoutComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ...PRIMENG_MODULES,
  ]
})
export class AdminModule {
}
