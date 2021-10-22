import { IBook } from './book';

export interface IMyList {
  id: string;
  username: string;
  books: IBook[];
}
