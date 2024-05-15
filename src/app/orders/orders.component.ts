import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ResponseCode } from '../enums/responseCode';
import { Order } from '../Models/order';
import { ResponseModel } from '../Models/responseModel';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orderList:Order[]=[];
  constructor(private formBuilder:FormBuilder,private orderService:OrderService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders()
  {
    this.orderService.getOrders().subscribe((data) =>{
      console.log("getOrders", data);
      this.orderList=data;
    },error=>{
      console.log("error",error);
      this.toastr.error("Something went wrong please try again later");
    })
  }


}
