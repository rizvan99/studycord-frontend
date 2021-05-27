import {Question} from '../../../shared/models/question';
import {Reply} from '../../../shared/models/reply.model';

export class ListenForReplies {
  static readonly type = '[REPLIES] Fetch';
}

export class GetReplies {
  static readonly type = '[REPLIES] GetAll';
}

export class AddReply {
  static readonly type = '[REPLIES] Add';
  constructor(public payload: Reply) {}
}

export class UpdateReply {
  static readonly type = '[REPLIES] Update';
  constructor(public replies: Reply[]) {}
}

export class StopListeningForReplies {
  static readonly type = '[REPLIES] Stop Listening For Questions';
}

export class ListenForCreateReply {
  static readonly type = '[REPLIES] Listen for Create Question';
}
