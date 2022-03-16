import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/app/shared/models/user';
import { environment } from '@app/environments/environment';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    // proper url?
    // TODO: add error handling
    return this.httpClient.post<User>(`${this.url}/users/authenticate`, { email, password }).pipe(
      tap((user: User) => {
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }),
      shareReplay()
    )
  }
}
