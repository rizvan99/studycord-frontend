import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Category} from '../shared/models/category';
import {Select, Store} from '@ngxs/store';
import {GetCategories, ListenForCategories, StopListeningForCategories} from './state/categories/categories.actions';
import {CategoriesState} from './state/categories/categories.state';
import {ForumService} from './shared/service/forum.service';
import {Question} from '../shared/models/question';
import {QuestionsState} from './state/questions/questions.state';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit, OnDestroy{

  @Select(CategoriesState.categoriesList) categoriesList$: Observable<Category[]> | undefined;
  unsubscribe$ = new Subject();
  topQuestion: Question | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([new ListenForCategories(), new GetCategories()]);
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(new StopListeningForCategories());
  }

}
