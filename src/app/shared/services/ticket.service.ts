import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${environment.apiUrl}/Ticket`);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${environment.apiUrl}/Ticket/${id}`);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${environment.apiUrl}/Ticket`, ticket);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${environment.apiUrl}/Ticket/${ticket.id}`, ticket);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Ticket/${id}`);
  }
}
