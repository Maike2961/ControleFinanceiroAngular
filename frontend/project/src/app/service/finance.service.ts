import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Financias } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class FinanceServiceService {

  private url = "http://localhost:8080/v1/financies"

  constructor(private http: HttpClient) { }


  getAllFinancias() : Observable<Financias[]>{
    return this.http.get<Financias[]>(this.url);
  }

  postFinancias(financias: Financias): Observable<Financias>{
    return this.http.post<Financias>(`${this.url}`, financias);
  }

  putFinancias(financias: Financias): Observable<Financias>{
    return this.http.put<Financias>(`${this.url}/${financias.id}`, financias);
  }

  getFinancias(financias: Financias): Observable<Financias>{
    console.log('service', financias)
    return this.http.get<Financias>(`${this.url}/${financias.id}`);
  }

  deleteFinancias(financias: Financias): Observable<Financias>{
    return this.http.delete<Financias>(`${this.url}/${financias.id}`);
  }

}
