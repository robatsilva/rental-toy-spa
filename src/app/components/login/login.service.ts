import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public login(user: User): Observable<User> {
    return this.httpClient.post(environment.host + 'api/auth/login', user).pipe(
      map((httpResponse: any) => {
        if (!httpResponse || !httpResponse.accessToken) {
          return null;
        }
        user.name = httpResponse.user.name;
        window.localStorage.setItem('token_api', httpResponse.accessToken);
        return user;
      })
    );
  }
}
