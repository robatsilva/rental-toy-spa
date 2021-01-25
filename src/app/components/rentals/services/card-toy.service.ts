import { Injectable } from '@angular/core';
import { Toy } from 'src/app/models/toy';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rental } from 'src/app/models/rental';

@Injectable({
  providedIn: 'root'
})
export class CardToyService {

  constructor(private httpClient: HttpClient) { }

  public saveRental(rental: Rental) {
    return this.httpClient.post(environment.host + `api/rental`, rental);
  }
}
