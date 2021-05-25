import {User} from './user.model';
import {Category} from './category';

export interface Question {
  id?: number;
  title: string;
  description: string;
  creationDate?: string;
  createdBy?: User;
  category?: Category;
}
