import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor(private httpClient: HttpClient) { }

  public getRentalsHomeInformation(): Observable<any> {
    return this.httpClient.get(environment.host + 'api/rental')
      .pipe(map((response: any) => response));
  }
}
