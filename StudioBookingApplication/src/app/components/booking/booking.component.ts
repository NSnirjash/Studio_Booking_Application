import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class BookingComponent implements OnInit {
  @Input() studio!: Studio;
  @Output() close = new EventEmitter<void>();
  bookingDate!: string;
  bookingTime!: string;
  userName!: string;
  userEmail!: string;
  availableTimeSlots: string[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.generateTimeSlots();
  }

  generateTimeSlots(): void {
    const openTime = this.studio.Availability.Open;
    const closeTime = this.studio.Availability.Close;
    const timeSlots = [];
    let currentTime = openTime;

    while (currentTime < closeTime) {
      timeSlots.push(currentTime);
      currentTime = this.addMinutes(currentTime, 30); // Add 30 minutes interval
    }

    this.availableTimeSlots = timeSlots;
  }

  addMinutes(time: string, minutes: number): string {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins);
    date.setMinutes(date.getMinutes() + minutes);
    const newHours = date.getHours().toString().padStart(2, '0');
    const newMinutes = date.getMinutes().toString().padStart(2, '0');
    return `${newHours}:${newMinutes}`;
  }

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
