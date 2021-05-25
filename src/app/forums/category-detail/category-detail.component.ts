import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Category} from '../../shared/models/category';
import {ActivatedRoute} from '@angular/router';
import {ForumService} from '../shared/service/forum.service';
import {GetCategories, ListenForCategories, SetSelectedCategory, StopListeningForCategories} from '../state/categories/categories.actions';
import {GetQuestions, ListenForCreateQuestion, ListenForQuestions, StopListeningForQuestions} from '../state/questions/questions.actions';
import {CategoriesState} from '../state/categories/categories.state';
import {QuestionsState} from '../state/questions/questions.state';
import {Question} from '../../shared/models/question';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  @Select(QuestionsState.questionsList) questionsList$: Observable<Question[]> | undefined;
  @Select(CategoriesState.selectedCategory) selectedCategory$: Observable<Category> | undefined;
  constructor(private store: Store,
              private activeRoute: ActivatedRoute,
              private forumService: ForumService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.store.dispatch(new SetSelectedCategory(routeParams.name));
    });

    this.store.dispatch([new GetQuestions(), new ListenForCreateQuestion(), new ListenForQuestions()]);
    // this.store.dispatch([new ListenForCategories(), new GetCategories()]);
  }

  test(t: any): void { console.log(t)}

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForQuestions());
  }

}
