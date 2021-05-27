import {Category} from '../../../shared/models/category';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Question} from '../../../shared/models/question';
import {Injectable} from '@angular/core';
import {ForumService} from '../../shared/service/forum.service';
import {
  AddQuestion,
  GetQuestions,
  ListenForCreateQuestion,
  ListenForQuestions, SetSelectedQuestion,
  StopListeningForQuestions,
  UpdateQuestions
} from './questions.actions';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {insertItem, patch} from '@ngxs/store/operators';
import {CategoriesState, CategoriesStateModel} from '../categories/categories.state';
import {SetSelectedCategory} from '../categories/categories.actions';

export class QuestionStateModel {
  public questions: Question[] | undefined;
  public selectedQuestion: Question | undefined;
}
@State<QuestionStateModel>({
  name: 'questions',
  defaults: {
    questions: [],
    selectedQuestion: undefined,
  }
})

@Injectable()
export class QuestionsState {

  constructor(private forumService: ForumService) {}

  private questionUnsub: Subscription | undefined;

  @Selector()
  static questionsList(state: QuestionStateModel): Question[] | undefined {
    return state.questions;
  }

  @Selector()
  static selectedQuestion(state: QuestionStateModel): Question | undefined {
    return state.selectedQuestion;
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
      ctx.patchState({
        selectedQuestion: undefined,
      })
    }
  }

  @Action(SetSelectedQuestion)
  async setSelectedQuestion(ctx: StateContext<QuestionStateModel>, q: Question): Promise<void> {
    await this.forumService.getQuestionById(q.id)
      .subscribe(question => {
        ctx.patchState({
          selectedQuestion: question
        });
        console.log('Selected question: ', question);
      });
  }

}


