export interface ICriteria {
  pageOption?: IPageOption;
  searchText?: string;
  filter?: any;
  sortOption?: any;
}

export interface IPageOption {
  size?: number;
  count?: number;
}

export interface ISortOption {}
