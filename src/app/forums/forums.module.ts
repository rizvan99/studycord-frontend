import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumsRoutingModule } from './forums-routing.module';
import { ForumsComponent } from './forums.component';
import { QuestionCreateComponent } from './question-create/question-create.component';
import {CategoryDetailComponent} from './category-detail/category-detail.component';
import { RepliesComponent } from './replies/replies.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ForumsComponent,
    CategoryDetailComponent,
    RepliesComponent,
  ],
    imports: [
        CommonModule,
        ForumsRoutingModule,
        ReactiveFormsModule
    ]
})
export class ForumsModule { }
