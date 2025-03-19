import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-list-component',
  standalone: false,
  templateUrl: './booking-list-component.component.html',
  styleUrl: './booking-list-component.component.css'
})
export class BookingListComponentComponent implements OnInit{
  bookings: any[] = [];

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    const bookings = localStorage.getItem('booking');
    if (bookings) {
      this.bookings = JSON.parse(bookings);
    }
  }
}
