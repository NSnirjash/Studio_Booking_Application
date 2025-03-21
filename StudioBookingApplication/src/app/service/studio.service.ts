import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Studio } from '../model/studio';



@Injectable({ providedIn: 'root' })
export class StudioService {
    

    constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:3000/Studios';

    getStudios(): Observable<Studio[]> {
        return this.http.get<Studio[]>(this.apiUrl);
    }

    getStudio(id: number): Observable<Studio> {
        return this.http.get<Studio>(`${this.apiUrl}/${id}`);
    }

    searchStudios(term: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Location.Area_like=${term}`);
    }

    filterStudiosByCity(city: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Location.City=${city}`);
    }

    filterStudiosByType(type: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Type=${type}`);
    }

    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}
