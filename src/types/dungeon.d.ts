export interface OnlyId {
  id: number;
}

export interface OnlyModule {
  module: string;
}

export interface Group {
  id?: number;
  module?: string;
  link?: string;
  show?: boolean;
}

export interface Admin {
  id: number;
}
