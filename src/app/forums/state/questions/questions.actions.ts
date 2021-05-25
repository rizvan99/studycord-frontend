import {Category} from '../../../shared/models/category';
import {Question} from '../../../shared/models/question';

export class ListenForQuestions {
  static readonly type = '[QUESTIONS] Fetch';
}

export class GetQuestions {
  static readonly type = '[QUESTIONS] GetAll';
}

export class AddQuestion {
  static readonly type = '[QUESTIONS] Add';
  constructor(public payload: Question) {}
}

export class UpdateQuestions {
  static readonly type = '[QUESTIONS] Update';
  constructor(public questions: Question[]) {}
}

export class StopListeningForQuestions {
  static readonly type = '[QUESTIONS] Stop Listening For Questions';
}

export class ListenForCreateQuestion {
  static readonly type = '[QUESTIONS] Listen for Create Question';
}
