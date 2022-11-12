import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }
  signup(data: any) :Observable<any> {
    return this.http.post('http://localhost:8080/auth/contacts/signup' ,data) ;
  }

  signin(data: any) :Observable<any> {
    
    return this.http.post('http://localhost:8080/auth/contacts/login' ,data) ;
  }
 
  getProfile(): Observable<any> {
    let headers = {
      'Authorization' : "Bearer" + localStorage.getItem('token')
    }
    return this.http.post('http://localhost:8080/auth/contacts/profile' ,{headers: headers}) ;
  }

}
