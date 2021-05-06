import {Component, OnDestroy, OnInit} from '@angular/core';
import {ForumService} from './shared/forum.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Category} from '../shared/models/category';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit, OnDestroy{

  categories: Category[] = [];
  unsubscriber$ = new Subject();
  categories$: Observable<Category[]> | undefined;
  constructor(private service: ForumService) { }

  ngOnInit(): void {
    this.categories$ = this.service.listenForCategories();

    this.service.getCategories()
      .pipe(
        takeUntil(this.unsubscriber$)
      )
      .subscribe( categoriesFromDb => {
        this.categories = categoriesFromDb;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

}
