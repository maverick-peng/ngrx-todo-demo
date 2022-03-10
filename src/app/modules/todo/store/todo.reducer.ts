import { Todo } from '../models/todo.model';

import * as fromTodo from './todo.action';

export interface TodoState {
  data: Todo[];
  loading: boolean;
  loaded: boolean;
  saved: boolean;
  searchResult: Todo[];
  search: string;
}

const initialState: TodoState = {
  data: [],
  loading: false,
  loaded: false,
  saved: false,
  searchResult: [],
  search: '',
};

export const reducer = (state = initialState, action: any): TodoState => {
  switch (action.type) {
    case fromTodo.LOAD_TODO: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromTodo.LOAD_TODO_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data,
      };
    }
    case fromTodo.LOAD_TODO_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    case fromTodo.ADD_TODO: {
      const todo: Todo = {
        title: action.payload,
        createDate: new Date().toLocaleDateString(),
        id: Math.ceil(Math.random() * 1000000),
      };
      return {
        ...state,
        data: [...state.data, todo],
      };
    }
    case fromTodo.REMOVE_TODO: {
      const id = action.payload;
      const data = [...state.data.filter((el) => el.id !== id)];
      return {
        ...state,
        data,
      };
    }
    case fromTodo.SET_TODO: {
      const todo = action.payload;
      const found = state.data.find((el) => el.id === todo.id);
      if (found) {
        found.complete = todo.complete;
        found.createDate = todo.createDate;
        found.title = todo.title;

        const data = [...state.data.filter((el) => el.id !== todo.id), found];

        return {
          ...state,
          data,
        };
      }

      return { ...state };
    }
    case fromTodo.SAVE_TODO: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromTodo.SAVE_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        saved: true,
      };
    }
    case fromTodo.SAVE_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        saved: false,
      };
    }
    case fromTodo.SEARCH_TODO: {
      const searchStr = action.payload;
      const searchResult = state.data.filter(
        (el) => el.title!.indexOf(searchStr) > -1
      );
      return {
        ...state,
        searchResult,
        search: searchStr,
      };
    }
  }
  return state;
};

// selectors
export const getAllTodos = (state: TodoState) => state.data;
export const getTodosLoading = (state: TodoState) => state.loading;
export const getTodosLoaded = (state: TodoState) => state.loaded;
export const getTodoSaved = (state: TodoState) => state.saved;

export const getSearch = (state: TodoState) => state.search;
export const getSearchResults = (state: TodoState) => {
  if (getSearch(state)) {
    return state.searchResult;
  }
  return getAllTodos(state);
};

export * from './todo.action';
