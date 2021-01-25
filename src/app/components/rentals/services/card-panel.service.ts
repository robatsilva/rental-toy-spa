import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardPanelService {

  constructor(private httpClient: HttpClient) { }

  public getRentals(kioskId: string): Observable<any> {
    return this.httpClient.get(environment.host + `api/rentals/${kioskId}`)
      .pipe(map((response: any) => response));
  }


}
