import { Routes } from '@angular/router';
import {TicketListComponent} from "./pages/ticket/ticket-list/ticket-list.component";

export const routes: Routes = [
  {
    path: 'ticket/list',
    component: TicketListComponent,
  }
];
