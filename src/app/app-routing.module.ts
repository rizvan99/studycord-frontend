import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'forums', loadChildren: () => import('./forums/forums.module').then(m => m.ForumsModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
