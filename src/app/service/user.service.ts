import { Injectable } from '@angular/core';
import { Observable, of, Subscriber, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
@Injectable()
export class UserService {
    public user$ = new Subject<User>();

    constructor(private httpClient: HttpClient) { };

    public emmitUser(user: User) {
        this.user$.next(user);
    }

    public getUser(): Observable<User> {
        return this.httpClient.get(environment.host + 'api/user/detail')
            .pipe(map((httpResponse: any) => {
                if (!httpResponse) {
                    return null;
                }
                this.emmitUser(httpResponse.user);
                return httpResponse.user;
            }));
    }
}

