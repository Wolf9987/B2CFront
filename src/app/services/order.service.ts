import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Constants } from '../Helper/constants';
import { Order } from '../Models/order';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly baseUrl:string="https://localhost:7038/api/Order/"

  constructor(private httpClient:HttpClient) { }

  public newOrder(amount:string , price:string , buySell:string)
  {
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const body={
      Email:userInfo.email,
      BuySell:buySell,
      Amount:amount,
      Price:price
    }
    const header = new HttpHeaders({
      'Authorization':`Bearer ${userInfo?.token}`
    });
    return this.httpClient.post<ResponseModel>(this.baseUrl+"CreateOrder",body,{headers:header});
    
  }

  public getOrders()
  {
    
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const body={
      Email:userInfo.email
      }
    const header = new HttpHeaders({
      'Authorization':`Bearer ${userInfo?.token}`
    });
    var res1 = this.httpClient.post<ResponseModel>(this.baseUrl+"Orders",body,{headers:header});
    var res2 = res1.pipe(map(res=>{
      let orderList = new Array<Order>();
      if (res.responseCode==1)
      {
        if(res.dateSet)
        {
          res.dateSet.map((x:Order)=>{
            orderList.push(new Order(x.amount,x.price,x.buySell))
          })
        }
      }
      return orderList;
    }));
    return res2;
  }
}
