import { Component, Input, OnInit } from '@angular/core';
import { StudioService } from '../../service/studio.service';
import { Studio } from '../../model/studio';

@Component({
  selector: 'app-studio-list',
  standalone: false,
  templateUrl: './studio-list.component.html',
  styleUrl: './studio-list.component.css'
})
export class StudioListComponent implements OnInit {

  studios: Studio[] = [];
  selectedStudio: Studio | null = null; // Allow null
  searchQuery = '';

  constructor(private studioService: StudioService) { }

  ngOnInit(): void {
    this.loadStudios();
  }

  
  loadStudios(): void {
    this.studioService.getStudios().subscribe(data => {
      this.studios = data;
    });
  }

  filterStudios(): void {
    this.studioService.getStudios().subscribe(data => {
      this.studios = data.filter(studio =>
        studio.Location.Area.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }


  // selectStudio(studio: Studio): void {
  //   this.selectedStudio = studio;
  // }

  selectStudio(studio: Studio): void {
    // Toggle booking form only for the selected studio
    this.selectedStudio = this.selectedStudio?.Id === studio.Id ? null : studio;
  }

  trackById(index: number, studio: Studio): number {
    return studio.Id;
  }

}
