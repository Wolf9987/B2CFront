import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  public newOrderForm=this.formBuilder.group({
    amount:['',[Validators.pattern('\\d*\.\\d*'),Validators.required]],
    price:['',[Validators.pattern('\\d*\.\\d*'),Validators.required]],
    buySell:['',[Validators.required]]
  })

  constructor(private formBuilder:FormBuilder, private orderService:OrderService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
    console.log("on submit")
    let amount=this.newOrderForm.controls["amount"].value;
    let price=this.newOrderForm.controls["price"].value;
    let buySell=this.newOrderForm.controls["buySell"].value;
    this.orderService.newOrder(amount,price,buySell).subscribe((data)=>{
      if(data.responseCode==1){
        console.log("response",data);
        this.toastr.success("New order created successfully");
      }
      else {
        if(data.dateSet == null)
        {
          this.toastr.error(data.responseMessage);
        }
        else{
          this.toastr.error(data.dateSet[0]);
        }
      }
      
    },error=>{
      console.log("error",error);
      this.toastr.error("Something went wrong please try again later");
    })
  }

}
