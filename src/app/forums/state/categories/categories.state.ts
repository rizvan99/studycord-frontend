import {Injectable} from '@angular/core';
import {Selector, State} from '@ngxs/store';
import {ForumService} from '../../shared/forum.service';
import {CategoryStateModel} from './categories.actions';
import {Category} from '../../../shared/models/category';


export class CategoriesStateModel {
  public categories: Category[]| undefined;
}
@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
  }
})

export class CategoriesState{
  constructor() {
  }
}
