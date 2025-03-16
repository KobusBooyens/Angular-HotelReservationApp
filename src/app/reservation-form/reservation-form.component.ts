import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required, Validators.min(1), Validators.max(38)]]
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.reservationService.getReservationById(id).subscribe(reservation => {
        this.reservationForm.patchValue(reservation);
      });
    }
  }

  onSubmit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      if (id) {
        this.reservationService.updateReservation(id, reservation)
          .subscribe(() => {
            //show alert
            console.log("Update request was processed");
            this.router.navigate(['/list']);
          });
      } else {
        this.reservationService.addReservation(reservation)
          .subscribe(() => {
            //show alert
            console.log("Add request was processed");
            this.router.navigate(['/list']);
            this.reservationForm.reset();
          });
      }
    }
  }
}
