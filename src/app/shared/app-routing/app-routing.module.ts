
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { Error404Component } from '../../components/error404/error404.component';
import { RentalsComponent } from '../../components/rentals/rentals.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'rentals', component: RentalsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: Error404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }