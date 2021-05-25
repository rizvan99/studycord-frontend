import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumsComponent } from './forums.component';
import {QuestionCreateComponent} from './question-create/question-create.component';
import {CategoryDetailComponent} from './category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: ForumsComponent},
  { path: ':name', loadChildren: () => import('./category-detail/category-detail.module').then(m => m.CategoryDetailModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumsRoutingModule { }
