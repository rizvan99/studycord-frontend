import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Question} from '../../shared/models/question';
import {AuthState} from '../../auth/state/auth.state';
import {CategoriesState} from '../state/categories/categories.state';
import {AddQuestion, GetQuestions, ListenForCreateQuestion, ListenForQuestions} from '../state/questions/questions.actions';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit {

  error: string | undefined;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder,
              private store: Store,
              private router: Router,
              private location: Location) { }

  questionForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });
  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.submitted = true;
    // stop if invalid
    if (this.questionForm.invalid) {
      return;
    }
    this.loading = true;

    const question: Question = {
      title: this.questionForm.value.title,
      description: this.questionForm.value.description,
      createdBy: this.store.selectSnapshot(AuthState.loggedInUser),
      category: this.store.selectSnapshot(CategoriesState.selectedCategory),
    };
    this.store.dispatch(new AddQuestion(question))
      .subscribe(
        () => {
          this.router.navigate([this.back()]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

}
