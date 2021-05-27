import {Question} from '../../../shared/models/question';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Reply} from '../../../shared/models/reply.model';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {QuestionStateModel} from '../questions/questions.state';
import {
  AddQuestion,
  GetQuestions,
  ListenForCreateQuestion,
  ListenForQuestions,
  StopListeningForQuestions,
  UpdateQuestions
} from '../questions/questions.actions';
import {AddReply, GetReplies, ListenForCreateReply, ListenForReplies, StopListeningForReplies, UpdateReply} from './replies.actions';
import {ForumService} from '../../shared/service/forum.service';
import {insertItem, patch} from '@ngxs/store/operators';

export class ReplyStateModel {
  public replies: Reply[] | undefined;
}

@State<ReplyStateModel>({
  name: 'replies',
  defaults: {
    replies: [],
  }
})
@Injectable()
export class RepliesState {

  private repliesUnsub: Subscription | undefined;

  constructor(private forumService: ForumService) {}

  @Selector()
  static repliesList(state: ReplyStateModel): Reply[] | undefined {
    return state.replies;
  }

  @Action(GetReplies)
  getAllReplies(ctx: StateContext<ReplyStateModel>): void {
    this.forumService.getAllReplies();
  }

  @Action(ListenForReplies)
  listenForReplies(ctx: StateContext<ReplyStateModel>): void {
    this.repliesUnsub = this.forumService.listenForReplies()
      .subscribe(replies => {
        ctx.dispatch(new UpdateReply(replies));
      });
  }

  @Action(ListenForCreateReply)
  listenForCreateReply(ctx: StateContext<ReplyStateModel>): void {
    this.repliesUnsub = this.forumService.listenForCreateReply()
      .subscribe(reply => {
        ctx.setState(
          patch({
            replies: insertItem(reply),
          })
        );
      });
  }

  @Action(AddReply)
  addQuestion(ctx: StateContext<ReplyStateModel>, payload: Reply): void {
    this.forumService.sendReply(payload);
  }

  @Action(UpdateReply)
  updateQuestions(ctx: StateContext<ReplyStateModel>, ur: UpdateReply): void {
    const state = ctx.getState();
    const newState: ReplyStateModel = {
      ...state,
      replies: ur.replies
    };
    ctx.setState(newState);
  }

  @Action(StopListeningForReplies)
  stopListeningForReplies(ctx: StateContext<ReplyStateModel>): void {
    if (this.repliesUnsub) {
      this.repliesUnsub.unsubscribe();
    }
  }

}
