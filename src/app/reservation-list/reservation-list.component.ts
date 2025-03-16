import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})

export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations()
      .subscribe(response => this.reservations = response);
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation)
      .subscribe(() => {
        //show alert
        console.log("Delete request was processed");
      });
  }
}
