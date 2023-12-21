import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ticket } from '../../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  /**
   * GetAllTickets
   *
   */
  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${environment.apiUrl}/Ticket`);
  }

  /**
   * Get ticket by ID
   *
   * @param id
   */
  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${environment.apiUrl}/Ticket/${id}`);
  }

  /**
   * Create a new ticket
   *
   * @param ticket
   */
  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${environment.apiUrl}/Ticket`, ticket);
  }

  /**
   * Update ticket
   *
   * @param ticket
   */
  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${environment.apiUrl}/Ticket/${ticket.id}`, ticket);
  }

  /**
   * Delete ticket
   *
   * @param id
   */
  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Ticket/${id}`);
  }
}
