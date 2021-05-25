import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumsRoutingModule } from './forums-routing.module';
import { ForumsComponent } from './forums.component';
import { QuestionCreateComponent } from './question-create/question-create.component';
import {CategoryDetailComponent} from './category-detail/category-detail.component';


@NgModule({
  declarations: [
    ForumsComponent,
    CategoryDetailComponent,
  ],
  imports: [
    CommonModule,
    ForumsRoutingModule
  ]
})
export class ForumsModule { }
