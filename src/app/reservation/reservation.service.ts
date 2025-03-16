import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {
  private url = "http://localhost:3001/api"

  constructor(private httpClient: HttpClient) { }

  //api/reservations
  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${this.url}/reservations`);
  }

  //api/reservations/{id}
  getReservationById(id: string): Observable<Reservation> {
    return this.httpClient.get<Reservation>(`${this.url}/reservation/${id}`);
  }

  //api/reservations
  addReservation(reservation: Reservation): Observable<void> {
    reservation.id = new Date().getTime().toString();
    return this.httpClient.post<void>(`${this.url}/reservation`, reservation);
  }

  //api/reservations/{id}
  deleteReservation(reservation: Reservation): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/reservation/${reservation.id}`);
  }

  //api/reservations/{id}
  updateReservation(id: string, updatedReservation: Reservation): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/reservation/${id}`, updatedReservation);
  }
}
