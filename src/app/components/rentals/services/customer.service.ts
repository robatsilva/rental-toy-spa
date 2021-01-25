import { Injectable } from '@angular/core';
import { Observable, of, Subscriber, Subject, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/models/customer';
@Injectable({ providedIn: 'root' })
export class CustomerService {
    private currentCustomer = new Subject<Customer>();
    constructor(private httpClient: HttpClient) { }

    public getCustomer(kioskId: string, cpf: string): Observable<Customer> {
        return this.httpClient.get<Customer>(environment.host + 'api/customer/' + kioskId + '/' + cpf)
            .pipe(map((customer: Customer) => {
                if (!customer) {
                    customer = new Customer();
                }
                customer.document = cpf;
                this.setCurrentCustomer(customer);
                return customer;
            }));
    }

    public setCurrentCustomer(customer: Customer) {
        this.currentCustomer.next(customer);
    }

    public getCurrentCustomer(): Observable<Customer> {
        return this.currentCustomer;
    }
}

