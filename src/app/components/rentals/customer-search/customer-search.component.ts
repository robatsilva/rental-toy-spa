import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from 'src/app/models/customer';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  @Input() kioskId: string;
  @ViewChild('inputName', { static: false }) inputName: ElementRef;
  mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  private customer = new Customer();
  constructor(private customerService: CustomerService, private loaderService: LoaderService) { }

  ngOnInit() {
  }

  public digitClick(digit: number): void {
    let cpf = this.customer.cpf;
    if (digit || digit === 0) {
      cpf += digit.toString();
    } else {
      cpf = cpf.substr(0, cpf.length - 1);
    }
    this.onCpfChange(cpf);
  }

  public loadCustomer(cpf: string) {
    this.loaderService.show();
    this.customerService.getCustomer(this.kioskId, cpf)
      .pipe(catchError((e: any, c: any) => {
        this.loaderService.hide();
        return [];
      }))
      .subscribe((customer: Customer) => {
        this.loaderService.hide();
        if (!customer.cpf) {
          customer.cpf = cpf;
        }
        this.customer = customer;
        this.inputName.nativeElement.focus();
        this.customerService.setCurrentCustomer(customer);
      });
  }

  onCpfChange(cpf: string) {
    this.customer.cpf = cpf;
    this.resetInputAndCustomer();
    if (this.validateCpf(cpf)) {
      this.loadCustomer(cpf);
    }
  }

  onNameChange(name: string) {
    this.customer.name = name;
    this.customerService.setCurrentCustomer(this.customer);
  }

  resetInputAndCustomer() {
    this.customer.name = '';
    this.customerService.setCurrentCustomer(this.customer);
  }

  isNameDisable(): boolean {
    if (this.customer && this.customer.id) {
      return true;
    }
    if (!this.validateCpf(this.customer.cpf)) {
      return true;
    }
    return false;
  }
  private validateCpf(cpf: string): boolean {
    let numbers: string;
    let digits: string;
    let sum: number;
    let i: number;
    let result: number;
    let equalDigits: number;

    const testCpf = cpf ? cpf.replace(/\D/g, '') : null;

    if (!testCpf) {
      return false;
    }

    if (testCpf.length !== 11) {
      return false;
    }
    equalDigits = 1;
    for (i = 0; i < testCpf.length - 1; i++) {
      if (testCpf.charAt(i) !== testCpf.charAt(i + 1)) {
        equalDigits = 0;
        break;
      }
    }

    if (!equalDigits) {
      numbers = testCpf.substring(0, 9);
      digits = testCpf.substring(9);
      sum = 0;
      for (i = 10; i > 1; i--) {
        sum += Number(numbers.charAt(10 - i)) * i;
      }

      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

      if (result !== Number(digits.charAt(0))) {
        return false;
      }
      numbers = testCpf.substring(0, 10);
      sum = 0;

      for (i = 11; i > 1; i--) {
        sum += Number(numbers.charAt(11 - i)) * i;
      }
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

      if (result !== Number(digits.charAt(1))) {
        return false;
      }
      return true;
    }
  }
}
