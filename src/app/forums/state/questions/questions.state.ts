import {Category} from '../../../shared/models/category';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Question} from '../../../shared/models/question';
import {Injectable} from '@angular/core';
import {ForumService} from '../../shared/service/forum.service';
import {
  AddQuestion,
  GetQuestions,
  ListenForCreateQuestion,
  ListenForQuestions,
  StopListeningForQuestions,
  UpdateQuestions
} from './questions.actions';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {insertItem, patch} from '@ngxs/store/operators';
import {CategoriesState, CategoriesStateModel} from '../categories/categories.state';

export class QuestionStateModel {
  public questions: Question[] | undefined;
}

@State<QuestionStateModel>({
  name: 'questions',
  defaults: {
    questions: [],
  }
})

@Injectable()
export class QuestionsState {

  constructor(private forumService: ForumService,
              private store: Store) {}

  private questionUnsub: Subscription | undefined;

  @Selector()
  static questionsList(state: QuestionStateModel): Question[] | undefined {
    return state.questions;
  }

  @Action(GetQuestions)
  getAllQuestions(ctx: StateContext<QuestionStateModel>): void {
    this.forumService.getAllQuestions();
  }

  @Action(ListenForQuestions)
  listenForQuestions(ctx: StateContext<QuestionStateModel>): void {
    this.questionUnsub = this.forumService.listenForQuestions()
      .subscribe(questions => {
        ctx.dispatch(new UpdateQuestions(questions));
      });
  }


  @Action(ListenForCreateQuestion)
  listenForCreateQuestion(ctx: StateContext<QuestionStateModel>): void {
    this.questionUnsub = this.forumService.listenForCreateQuestion()
      .subscribe(question => {
        // ctx.dispatch(new UpdateQuestions(question));
        ctx.setState(
          patch({
            questions: insertItem(question),
          })
        );
      });
  }

  @Action(AddQuestion)
  addQuestion(ctx: StateContext<QuestionStateModel>, payload: Question): void {
    this.forumService.askQuestion(payload);
  }

  @Action(UpdateQuestions)
  updateQuestions(ctx: StateContext<QuestionStateModel>, uq: UpdateQuestions): void {
    const state = ctx.getState();
    const newState: QuestionStateModel = {
      ...state,
      questions: uq.questions
    };
    ctx.setState(newState);
  }

  @Action(StopListeningForQuestions)
  stopListeningForQuestions(ctx: StateContext<QuestionStateModel>): void {
    if (this.questionUnsub) {
      this.questionUnsub.unsubscribe();
    }
  }

}


