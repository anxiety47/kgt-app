import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedGuard } from './core/authentication/unauthorized.guard';
import { LoginFormComponent } from './core/authentication/login-form/login-form.component';
import { LoginGuard } from './core/authentication/login.guard';
import { HomeComponent } from './modules/home/components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [UnauthorizedGuard] },
  { path: 'login', component: LoginFormComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
