import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../../user';
import { UsersResponse } from '../../userResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    email: '',
    password: '',
  });

  private apiUrl = 'https://reqres.in/api/login';
  private usersUrl = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { email, password }).pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserLogin.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Algo ha fallado', error.error);
    } else {
      console.error(
        'reqres.in ha retornado un error',
        error.status,
        error.error
      );
    }
    return throwError(() => new Error(error.message));
  }

  get userData(): Observable<boolean> {
    return this.currentUserLogin.asObservable();
  }

  getUsers(page: number = 1): Observable<UsersResponse> {
    const url = `${this.usersUrl}?page=${page}`;
    return this.http.get<UsersResponse>(url).pipe(catchError(this.handleError));
  }

  getUserById(userId: string): Observable<User> {
    const url = `https://reqres.in/api/users/${userId}`;
    return this.http.get<User>(url).pipe(catchError(this.handleError));
  }
}
