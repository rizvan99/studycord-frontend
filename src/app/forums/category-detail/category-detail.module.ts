import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryDetailRoutingModule } from './category-detail-routing.module';
import { CategoryDetailComponent } from './category-detail.component';
import {QuestionCreateComponent} from '../question-create/question-create.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    QuestionCreateComponent,
  ],
  imports: [
    CommonModule,
    CategoryDetailRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CategoryDetailModule { }
