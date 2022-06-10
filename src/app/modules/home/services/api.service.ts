import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCountries(search?: string): Observable<IApiResponse<string[]>> {
    let params = new HttpParams();
    if (search) params = params.set('search', search)
    return this.http.get<IApiResponse<string[]>>(`${environment.apiUrl}/countries`, { params })
  }
  getStat(country?: string): Observable<IApiResponse<string[]>> {
    let params = new HttpParams();
    if (country) params = params.set('country', country)
    return this.http.get<IApiResponse<string[]>>(`${environment.apiUrl}/statistics`, { params })
  }

  getLeafLeatCords(){
     return this.http.get('assets/leaflet-countries/countries.geo.json');
  }
}
