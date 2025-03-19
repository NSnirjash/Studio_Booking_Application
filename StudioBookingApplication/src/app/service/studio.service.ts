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

    addStudio(studio: Studio): Observable<Studio> {
        return this.http.post<Studio>(this.apiUrl, studio);
    }

    updateStudio(studio: Studio): Observable<Studio> {
        return this.http.put<Studio>(`${this.apiUrl}/${studio.Id}`, studio);
    }

    deleteStudio(id: number): Observable<Studio> {
        return this.http.delete<Studio>(`${this.apiUrl}/${id}`);
    }

    searchStudios(term: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Name_like=${term}`);
    }

    filterStudiosByCity(city: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Location.City=${city}`);
    }

    filterStudiosByType(type: string): Observable<Studio[]> {
        return this.http.get<Studio[]>(`${this.apiUrl}?Type=${type}`);
    }

    
}
