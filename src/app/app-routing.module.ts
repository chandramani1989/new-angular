import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

import { AuthGuard } from '../guarding/auth.guard';

const url = environment.URL;
const routes: Routes = [{ path: '', redirectTo: url + 'login', pathMatch: 'full',canActivate: [AuthGuard] },
{ path: url + 'login', component: LoginComponent },
{ path: url + 'signup', component: SignupComponent },
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
