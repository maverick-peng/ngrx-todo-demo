import { Action } from '@ngrx/store';

import { Todo } from '../models/todo.model';

export const LOAD_TODO = '[Todo] Load Todo';
export const LOAD_TODO_SUCCESS = '[Todo] Load Todo Success';
export const LOAD_TODO_FAIL = '[Todo] Load Todo Fail';
export const SAVE_TODO = '[Todo] Save Todo';
export const SAVE_TODO_SUCCESS = '[Todo] Save Todo Success';
export const SAVE_TODO_FAIL = '[Todo] Save Todo Fail';
export const SEARCH_TODO = '[Todo] Search Todo';

export const ADD_TODO = '[Todo] Add Todo';
export const REMOVE_TODO = '[Todo] Remove Todo';
export const SET_TODO = '[Todo] Set Todo';

export class LoadTodo implements Action {
  type = LOAD_TODO;
}

export class LoadTodoSuccess implements Action {
  type = LOAD_TODO_SUCCESS;
  constructor(public payload: Todo[]) {}
}

export class LoadTodoFail implements Action {
  type = LOAD_TODO;
  constructor(public payload: any) {}
}

export class AddTodo implements Action {
  type = ADD_TODO;
  constructor(public payload: string) {}
}

export class RemoveTodo implements Action {
  type = REMOVE_TODO;
  constructor(public payload: number) {}
}

export class SetTodo implements Action {
  type = SET_TODO;
  constructor(public payload: Todo) {}
}

export class SaveTodo implements Action {
  type = SAVE_TODO;
}

export class SaveTodoSuccess implements Action {
  type = SAVE_TODO_SUCCESS;
}

export class SaveTodoFail implements Action {
  type = SAVE_TODO_FAIL;
  constructor(public payload: any) {}
}

export class SearchTodo implements Action {
  type = SEARCH_TODO;
  constructor(public payload: string) {}
}

export type TodoActions =
  | LoadTodo
  | LoadTodoSuccess
  | LoadTodoFail
  | AddTodo
  | RemoveTodo
  | SetTodo
  | SaveTodo
  | SaveTodoSuccess
  | SaveTodoFail
  | SearchTodo;
