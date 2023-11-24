import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user_model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private enviroment:string=environment.apiUrl;
  private apiURL:string=this.enviroment+"/api/User/";
  // private apiURL:string="/api/User/";


  constructor(private http:HttpClient) { }

  //Get User
  GetAllUser() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}GetUser`);
  }

  getUserId(id:number):Observable<any>{
    return this.http.get<User[]>(`${this.apiURL}GetUser`+id);
  }

  //Post User
  insertUser(user:User ):Observable<any>{
    user.idUser=0;
     const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.post(`${this.apiURL}insertUser`, user, {headers: httpHeaders})
  }

  //Update User
  updatetUser(id:number, user:User):Observable<any>{
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.put(`${this.apiURL}UpdateUser`+id,user,
    {
      headers: httpHeaders,
      responseType: 'text'
    })
  }

  //Delete User
  delete<T>(id: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.delete<T>(`${this.apiURL}DeleteUser`+id,
      {
        headers: httpHeaders,
        observe: 'response'
      });
  }
  //Login
login<T>(data: any): Observable<HttpResponse<T>> {
  const httpHeaders: HttpHeaders = this.getHeaders();
   return this.http.post<T>(`${this.apiURL}loginJWT`, data,
    {
      headers: httpHeaders,
      params:data,
      observe: 'response'
    });
}
getHeaders(): HttpHeaders {
  let httpHeaders: HttpHeaders = new HttpHeaders();
  var token =sessionStorage.getItem('token');;
  if (token) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

  return httpHeaders;
}

logout() {
  sessionStorage.removeItem('token');
}


}
