import {Component, OnDestroy, OnInit} from '@angular/core';
import {ForumService} from './shared/forum.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Category} from '../shared/models/category';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit, OnDestroy{

  categories: Category[] = [];
  unsubscriber$ = new Subject();
  constructor(private service: ForumService) { }

  ngOnInit(): void {
    this.service.getCategores().
    pipe(
      takeUntil(this.unsubscriber$)
    )
      .subscribe((categories) => {
        this.categories = categories;
      });

  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

}
