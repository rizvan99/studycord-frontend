import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Question} from '../../shared/models/question';
import {AuthState} from '../../auth/state/auth.state';
import {CategoriesState} from '../state/categories/categories.state';
import {
  AddQuestion,
  GetQuestions,
  ListenForCreateQuestion,
  ListenForQuestions,
  SetSelectedQuestion, StopListeningForQuestions
} from '../state/questions/questions.actions';
import {Reply} from '../../shared/models/reply.model';
import {Observable, Subject} from 'rxjs';
import {RepliesState} from '../state/replies/replies.state';
import {AddReply, GetReplies, ListenForCreateReply, ListenForReplies, StopListeningForReplies} from '../state/replies/replies.actions';
import {QuestionsState} from '../state/questions/questions.state';
import {Category} from '../../shared/models/category';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss']
})
export class RepliesComponent implements OnInit, OnDestroy {

  @Select(RepliesState.repliesList) repliesList$: Observable<Reply[]> | undefined;
  @Select(QuestionsState.selectedQuestion) selectedQuestion$: Observable<Question> | undefined;

  error: string | undefined;
  loading = false;
  submitted = false;
  unsubscribe$ = new Subject();

  constructor(private fb: FormBuilder,
              private store: Store,
              private router: Router,
              private location: Location,
              private activeRoute: ActivatedRoute) { }

  replyForm = this.fb.group({
    reply: ['', Validators.required],
  });

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.store.dispatch(new SetSelectedQuestion(routeParams.id));
    });

    this.store.dispatch([new GetReplies(), new ListenForReplies()]);
    this.store.dispatch(new ListenForCreateReply());
  }

  onSubmit(): void {
    this.submitted = true;
    // stop if invalid
    if (this.replyForm.invalid) {
      return;
    }

    const reply: Reply = {
      content: this.replyForm.value.reply,
      createdBy: this.store.selectSnapshot(AuthState.loggedInUser),
      question:  this.store.selectSnapshot(QuestionsState.selectedQuestion),
    };
    this.store.dispatch(new AddReply(reply))
      .subscribe(
        () => {
          this.replyForm.reset();
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(new StopListeningForReplies());
  }

}
