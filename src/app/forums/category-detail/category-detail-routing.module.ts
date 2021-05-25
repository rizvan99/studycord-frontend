import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './category-detail.component';
import {QuestionCreateComponent} from '../question-create/question-create.component';

const routes: Routes = [
  { path: '', component: CategoryDetailComponent },
  { path: ':ask', component: QuestionCreateComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryDetailRoutingModule { }
