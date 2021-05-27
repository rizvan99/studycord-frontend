import {User} from './user.model';
import {Question} from './question';

export interface Reply {
  id?: number;
  content: string;
  creationDate?: string; // date
  createdBy?: User;
  question?: Question;
}
