export interface Scheme {
  [key: number]: {
    photos?: string[];
    messages?: string[];
  };
}

export const scheme: Scheme = {};

export const used: number[] = [];
