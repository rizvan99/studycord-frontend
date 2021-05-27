import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user.model";
import {AuthenticationService} from "../auth/authentication.service";
import {AuthState} from "../auth/state/auth.state";
import {Observable} from "rxjs";
import { Select, Store } from '@ngxs/store';
import {RepliesState} from '../forums/state/replies/replies.state';
import {Reply} from '../shared/models/reply.model';
import {QuestionsState} from '../forums/state/questions/questions.state';
import {Question} from '../shared/models/question';
import {GetQuestions, ListenForQuestions} from '../forums/state/questions/questions.actions';
import {Category} from '../shared/models/category';
import {CategoriesState} from '../forums/state/categories/categories.state';
import {GetCategories, ListenForCategories} from '../forums/state/categories/categories.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(QuestionsState.questionsList) questionsList$: Observable<Question[]> | undefined;
  @Select(CategoriesState.categoriesList) categoriesList$: Observable<Category[]> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([new GetQuestions(), new ListenForQuestions()]);
    this.store.dispatch([new GetCategories(), new ListenForCategories()]);
  }


}
