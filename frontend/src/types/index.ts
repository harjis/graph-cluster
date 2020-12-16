export enum LoadingState {
  NOT_LOADED,
  LOADING,
  LOADED,
}

export type Errors = {
  [key: string]: string[];
};
