import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    let reservation = this.getFromLocalStorage();
    this.reservations = reservation;
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation) {
    console.log("add reservation", reservation);
    reservation.id = new Date().getTime().toString();
    this.reservations.push(reservation);
    this.updateLocalStorage();
  }

  deleteReservation(reservation: Reservation) {
    const index = this.reservations.indexOf(reservation);
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }
    this.updateLocalStorage();
  }

  updateReservation(reservation: Reservation) {
    const index = this.reservations.indexOf(reservation);

    this.reservations[index] = reservation;
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  getFromLocalStorage(): Reservation[] {
    const data = localStorage.getItem('reservations');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }
}
