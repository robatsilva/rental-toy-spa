import { Component, OnInit } from '@angular/core';
import { Kiosk } from 'src/app/models/kiosk';
import { RentalsService } from './services/rentals-service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { Reason } from 'src/app/models/reason';
import { Period } from 'src/app/models/period';
import { Cash } from 'src/app/models/cash';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  public cash: Cash;
  public kiosk = new Kiosk();
  public reasons: Reason[];
  public periods: Period[];

  constructor(private rentalsService: RentalsService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.show();
    this.rentalsService.getRentalsHomeInformation()
      .subscribe(data => {
        this.cash = data.cash;
        this.kiosk = data.kiosk;
        this.reasons = data.reasons;
        this.loaderService.hide();
      });
  }

}
