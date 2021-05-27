import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './category-detail.component';
import {QuestionCreateComponent} from '../question-create/question-create.component';
import {RepliesComponent} from '../replies/replies.component';
import {AuthGuard} from '../../auth/auth.guard';

const routes: Routes = [
  { path: '', component: CategoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'ask', component: QuestionCreateComponent, canActivate: [AuthGuard] },
  { path: ':id', component: RepliesComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryDetailRoutingModule { }
