import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './guards/auth.service';
import { OrdersComponent } from './orders/orders.component';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  {path: "register",component:RegisterComponent},
  {path: "login",component:LoginComponent},
  {path: "orders",component:OrdersComponent,canActivate:[AuthGuardService]},
  {path: "new-order",component:NewOrderComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
