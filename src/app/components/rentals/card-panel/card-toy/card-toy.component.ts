import { Component, OnInit, Input } from '@angular/core';
import { Toy } from 'src/app/models/toy';
import { CardToyService } from '../../services/card-toy.service';
import { catchError } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { Kiosk } from 'src/app/models/kiosk';

@Component({
  selector: 'app-card-toy',
  templateUrl: './card-toy.component.html',
  styleUrls: ['./card-toy.component.css']
})
export class CardToyComponent implements OnInit {
  @Input() public toy: Toy;
  @Input() public kiosk: Kiosk;
  private customer: Customer;
  public imgLoaded = false;
  public imgError = false;
  public showInitEnd = false;
  constructor(
    private loaderService: LoaderService,
    private customerService: CustomerService,
    private cardToyService: CardToyService
  ) {}

  public ngOnInit() {
    this.listenCustomer();
  }

  private listenCustomer() {
    this.customerService
      .getCurrentCustomer()
      .subscribe((customer: Customer) => {
        this.customer = customer;
      });
  }

  public imgOnLoad() {
    this.imgLoaded = true;
  }

  public imgOnError() {
    this.imgError = true;
  }

  public saveRental() {
    this.loaderService.show();
    this.cardToyService
      .saveRental(this.createNewRental())
      .pipe(
        catchError((e, c) => {
          this.loaderService.hide();
          return [];
        })
      )
      .subscribe(() => this.loaderService.hide());
  }

  private createNewRental(): Rental {
    const rental = new Rental();
    rental.customer = this.customer;
    rental.toyId = this.toy.id;
    rental.kiosk = this.kiosk;
    return rental;
  }
}
