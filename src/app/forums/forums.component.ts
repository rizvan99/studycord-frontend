import {Component, OnDestroy, OnInit} from '@angular/core';
import {ForumService} from './shared/forum.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Category} from '../shared/models/category';
import {Question} from '../shared/models/question';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit, OnDestroy{

  selectedCategory: Category | undefined;
  categories: Category[] = [];
  questions: Question[] = [];
  unsubscriber$ = new Subject();
  categories$: Observable<Category[]> | undefined;
  questions$: Observable<Question[]> | undefined;
  constructor(
    private service: ForumService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.service.listenForCategories();
    this.questions$ = this.service.listenForQuestions();

    this.service.getCategories()
      .pipe(
        takeUntil(this.unsubscriber$)
      )
      .subscribe( categoriesFromDb => {
        this.categories = categoriesFromDb;
      });
    this.service.listenForQuestions()
      .pipe(
        takeUntil(this.unsubscriber$)
      )
      .subscribe(questionsFromDb => {
        this.questions = questionsFromDb;
      });
  }

  getQuestions(category: Category): void{
    console.log('clicked');
    this.service.getQuestions(category);
  }
  setCategory(category: Category): void{
    this.selectedCategory = category;
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

}
