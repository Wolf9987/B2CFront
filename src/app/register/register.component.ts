import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode } from '../enums/responseCode';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm=this.formBuilder.group({
    fullName:['',[Validators.required]],
    email:['',[Validators.email, Validators.required]],
    password:['',Validators.required]
  })
  constructor(private router:Router, private formBuilder:FormBuilder, private userService:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
    console.log("on submit")
    let fullName=this.registerForm.controls["fullName"].value;
    let email=this.registerForm.controls["email"].value;
    let password=this.registerForm.controls["password"].value;
    this.userService.register(fullName,email,password).subscribe((data)=>{
      if (data.responseCode==ResponseCode.OK)
      {
        console.log("response",data)
        this.toastr.success("You have created account please login");
        this.router.navigate(["login"]);
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


