import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {Category} from '../../../shared/models/category';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Question} from '../../../shared/models/question';
import {Reply} from '../../../shared/models/reply.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private socket: Socket,
              private http: HttpClient) { }

  getCategoryByName(categoryName: string): Observable<Category> {
    return this.http.get<Category>(environment.apiUrl + '/forum/' + categoryName);
  }

  getQuestionById(id: number | undefined): Observable<Question> {
    return this.http.get<Question>(environment.apiUrl + '/questions/' + id);
  }

  listenForCategories(): Observable<Category[]> {
    return this.socket
      .fromEvent<Category[]>('categories');
  }
  getAllCategories(): void {
    this.socket.emit('getAllCategories');
  }

  getAllQuestions(): void {
    this.socket.emit('getAllQuestions');
  }
  listenForQuestions(): Observable<Question[]> {
    return this.socket
      .fromEvent<Question[]>('questions');
  }
  listenForCreateQuestion(): Observable<Question> {
    return this.socket
      .fromEvent<Question>('newQuestion');
  }
  askQuestion(question: Question): void {
    this.socket.emit('createQuestion', question);
  }

  getAllReplies(): void {
    this.socket.emit('getAllReplies');
  }
  listenForReplies(): Observable<Reply[]> {
    return this.socket
      .fromEvent<Reply[]>('replies');
  }
  listenForCreateReply(): Observable<Reply> {
    return this.socket
      .fromEvent<Reply>('newReply');
  }
  sendReply(reply: Reply): void {
    this.socket.emit('createReply', reply);
  }

}
