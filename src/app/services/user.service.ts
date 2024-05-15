import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../Models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl:string="https://localhost:7038/api/User/"
  
  constructor(private httpClient:HttpClient) { }

  public login(email:string , password:string)
  {
    const body={
    Email:email,
    Password:password
    }
    return this.httpClient.post<ResponseModel>(this.baseUrl+"Login",body);
    
  }

  public register(fullname:string , email:string , password:string)
  {
    const body={
      FullName:fullname,
      Email:email,
      Password:password
    }
    return this.httpClient.post<ResponseModel>(this.baseUrl+"RegisterUser",body);
  }
}
