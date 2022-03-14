import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromTodos from './todo.reducer';

export interface AppState {
  todos: fromTodos.State;
}

export const reducers: ActionReducerMap<AppState, fromTodos.TodoActions> = {
  todos: fromTodos.reducer,
};

//#region selectors
export const getAppState = createFeatureSelector<AppState>('app');
export const getTodoState = createSelector(
  getAppState,
  (state: AppState) => state.todos
);
export const getAllTodos = createSelector(getTodoState, fromTodos.selectAll);

export const getTodosLoaded = createSelector(
  getTodoState,
  fromTodos.getTodosLoaded
);
export const getTodosLoading = createSelector(
  getTodoState,
  fromTodos.getTodosLoading
);
export const getTodoSaved = createSelector(
  getTodoState,
  fromTodos.getTodoSaved
);
//#endregion

export const getTodoSearchResults = createSelector(
  getTodoState,
  fromTodos.getSearchResults
);

export * from './todo.action';
export * from './todo.reducer';
