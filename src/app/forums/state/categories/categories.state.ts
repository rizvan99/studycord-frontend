import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Category} from '../../../shared/models/category';
import {ForumService} from '../../shared/service/forum.service';
import {Observable, Subscription} from 'rxjs';
import {GetCategories, ListenForCategories, SetSelectedCategory, StopListeningForCategories, UpdateCategories} from './categories.actions';
import {tap} from 'rxjs/operators';
import {AuthStateModel, Login} from '../../../auth/state/auth.actions';
import {ListenForCreateQuestion, UpdateQuestions} from '../questions/questions.actions';
import {QuestionStateModel} from '../questions/questions.state';


export class CategoriesStateModel {
  public categories: Category[]| undefined;
  public selectedCategory: Category | undefined;
}

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
    selectedCategory: undefined,
  }
})

@Injectable()
export class CategoriesState {
  constructor(private forumService: ForumService) {}

  private categoriesUnsub: Subscription | undefined;

  @Selector()
  static categoriesList(state: CategoriesStateModel): Category[] | undefined {
    return state.categories;
  }

  @Selector()
  static selectedCategory(state: CategoriesStateModel): Category | undefined {
    return state.selectedCategory;
  }

  @Action(GetCategories)
  getAllCategories(ctx: StateContext<CategoriesStateModel>): void {
    this.forumService.getAllCategories();
  }
  @Action(ListenForCategories)
  listenForCategories(ctx: StateContext<CategoriesStateModel>): void {
    this.categoriesUnsub = this.forumService.listenForCategories()
      .subscribe(categories => {
        ctx.dispatch(new UpdateCategories(categories));
      });
  }
  @Action(UpdateCategories)
  updateCategories(ctx: StateContext<CategoriesStateModel>, uc: UpdateCategories): void {
    const state = ctx.getState();
    const newState: CategoriesStateModel = {
      ...state,
      categories: uc.categories
    };
    ctx.setState(newState);
  }


  @Action(StopListeningForCategories)
  stopListeningForCategories(ctx: StateContext<CategoriesStateModel>): void {
    if (this.categoriesUnsub) {
      this.categoriesUnsub.unsubscribe();
    }
  }

  @Action(SetSelectedCategory)
  async setSelectedCategory(ctx: StateContext<CategoriesStateModel>, c: Category): Promise<void> {
    const state = ctx.getState();
    await this.forumService.getCategoryByName(c.name)
      .subscribe(category => {
        ctx.patchState({
          selectedCategory: category
        });
      });
    console.log('selected category questions: ', state.selectedCategory);
  }



}
