import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../Helper/constants';
import { ResponseModel } from '../Models/responseModel';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm=this.formBuilder.group({
    email:['',[Validators.email, Validators.required]],
    password:['',Validators.required]
  })
  
  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
    console.log("on submit")
    let email=this.loginForm.controls["email"].value;
    let password=this.loginForm.controls["password"].value;
    this.userService.login(email,password).subscribe((data)=>{  
      console.log("dataLog",data);
      if(data.responseCode==1){
        localStorage.setItem(Constants.USER_KEY,JSON.stringify(data.dateSet));
        this.router.navigate(["/orders"]);
      }else{
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
