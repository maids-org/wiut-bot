export interface Option {
  limit: number;
  cursor: number;
  search: null | string;
}

export interface Group {
  id?: number;
  module?: string;
  link?: string;
}

// TODO: Add more types by object
// interface GroupById {}
// interface GroupByModule {}

export interface Groups {
  options?: Option;
  results: Group[];
}
