import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { userAuthGuard } from './guards/user-auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [userAuthGuard],
    component: UserLayoutComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
