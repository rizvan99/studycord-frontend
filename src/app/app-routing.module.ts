import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'forums', loadChildren: () => import('./forums/forums.module').then(m => m.ForumsModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule), canLoad: [AuthGuard] },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canLoad: [AuthGuard] },
  { path: 'about', component: AboutComponent},
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
