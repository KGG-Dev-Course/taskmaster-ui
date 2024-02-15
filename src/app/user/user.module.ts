import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';

const PRIMENG_MODULES: any[] = [

];

@NgModule({
  declarations: [
    UserLayoutComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ...PRIMENG_MODULES,
  ]
})
export class UserModule {
}
