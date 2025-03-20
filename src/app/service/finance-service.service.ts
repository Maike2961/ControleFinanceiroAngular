import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Financias } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class FinanceServiceService {

  url = "http://localhost:3000/financias"

  constructor(private http: HttpClient) { }


  getAllFinancias() : Observable<Financias[]>{
    return this.http.get<Financias[]>(this.url);
  }

  postFinancias(financias: Financias): Observable<Financias>{
    return this.http.post<Financias>(`${this.url}`, financias);
  }


}
