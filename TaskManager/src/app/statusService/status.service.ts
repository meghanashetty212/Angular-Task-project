import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class StatusService {
private apiUrl = 'http://localhost:3000/tasklist'; // Adjust URL based on your backend API
 
  constructor(private http: HttpClient) { }
 
  getCards(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
 
  updateCardStatus(id: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, { status });
  }
}