import { Book } from './book';

export interface BookCriteria {
  pageSize: number;
  currentPage: number;
  searchText: string;
  priceCriteria: PriceCriteria;
  sortCriteria: SortCriteria<Book>;
}

export interface PriceCriteria {
  minValue: number;
  maxValue: number;
}

export interface SortCriteria<T> {
  column: keyof T;
  ascending?: boolean;
}
