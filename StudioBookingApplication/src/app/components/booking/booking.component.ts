import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Studio } from '../../model/studio';
import { StudioService } from '../../service/studio.service';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../service/booking.service';
import { Booking } from '../../model/booking';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  // @Input() studio!: Studio;
  // @Output() close = new EventEmitter<void>();
  // bookingDate!: string;
  // bookingTime!: string;
  // userName!: string;
  // userEmail!: string;

  // constructor(private studioService: StudioService) {}


  // bookNow() {
  //   const booking = {
  //     studio: this.studio.Name,
  //     date: this.bookingDate,
  //     time: this.bookingTime,
  //     user: { name: this.userName, email: this.userEmail }
  //   };
  //   this.studioService.saveBooking(booking).subscribe(() => {
  //     alert('Booking Confirmed!');
  //     this.close.emit();
  //   });
  // }

  // closePopup() {
  //   this.close.emit();
  // }

  @Input() studio!: Studio;
  @Output() close = new EventEmitter<void>();
  bookingDate!: string;
  bookingTime!: string;
  userName!: string;
  userEmail!: string;

  constructor(private bookingService: BookingService) {}

  bookNow() {
    const booking: Booking = {
      studio: this.studio.Name,
      date: this.bookingDate,
      time: this.bookingTime,
      user: { name: this.userName, email: this.userEmail }
    };
    this.bookingService.saveBooking(booking).subscribe(() => {
      alert('Booking Confirmed!');
      this.close.emit();
    });
  }

  closePopup() {
    this.close.emit();
  }
}
