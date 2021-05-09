import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {Category} from '../../shared/models/category';
import {Question} from '../../shared/models/question';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private socket: Socket) { }
  getCategories(): Observable<Category[]> {
    return this.socket
      .fromEvent<Category[]>('categories');
  }
  listenForCategories(): Observable<Category[]> {
    return this.socket
      .fromEvent<Category[]>('categories');
  }

  getQuestions(category: Category): void {
    this.socket.emit('getQuestions', category);
  }

  listenForQuestions(): Observable<Question[]> {
    return this.socket
      .fromEvent<Question[]>('questions-get');
  }
}
