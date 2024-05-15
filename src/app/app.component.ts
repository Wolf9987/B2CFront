import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './Helper/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bit2CFront1';
  constructor(private router:Router){}
  onLogout()
  {
    localStorage.removeItem(Constants.USER_KEY);
  }
  isUserLogin()
  {
    const user=localStorage.getItem(Constants.USER_KEY);
    return user && user.length>0;
  }
    
}
