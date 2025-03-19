import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudioListComponent } from './components/studio-list/studio-list.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  {path:'studio', component: StudioListComponent},
  {path:'booking', component: BookingComponent},
  { path: '', redirectTo: '/studios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
