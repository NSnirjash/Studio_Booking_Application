import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Studio } from '../../model/studio';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  @Input() studio!: Studio;
  @Output() close = new EventEmitter<void>();
  bookingDate!: string;
  bookingTime!: string;
  userName!: string;
  userEmail!: string;

  bookNow() {
    const booking = {
      studio: this.studio.Name,
      date: this.bookingDate,
      time: this.bookingTime,
      user: { name: this.userName, email: this.userEmail }
    };
    localStorage.setItem('booking', JSON.stringify(booking));
    alert('Booking Confirmed!');
    this.close.emit();
  }

  closePopup() {
    this.close.emit();
  }
}
