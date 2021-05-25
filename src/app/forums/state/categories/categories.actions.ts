import {Category} from '../../../shared/models/category';

export class ListenForCategories {
  static readonly type = '[CATEGORIES] Fetch';
}

export class UpdateCategories {
  static readonly type = '[CATEGORIES] Update';
  constructor(public categories: Category[]) {
  }
}

export class GetCategories {
  static readonly type = '[CATEGORIES] GetAll';
}

export class StopListeningForCategories {
  static readonly type = '[CATEGORIES] Stop Listening For Categories';
}

export class SetSelectedCategory {
  static readonly type = '[CATEGORIES] Set Selected';
  constructor(public name: Category) {}
}

