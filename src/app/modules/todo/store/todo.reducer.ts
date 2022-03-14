import { Todo } from '../models/todo.model';

import * as fromTodo from './todo.action';

export interface TodoState {
  entities: { [id: number]: Todo };
  loading: boolean;
  loaded: boolean;
  saved: boolean;
  searchResult: Todo[];
  search: string;
}

const initialState: TodoState = {
  entities: {},
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
      const entities = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
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
        complete: false,
      };
      return {
        ...state,
        entities: { ...state.entities, [todo.id]: todo },
      };
    }
    case fromTodo.REMOVE_TODO: {
      const id = action.payload;
      const entities = { ...state.entities };
      delete entities[id];
      return {
        ...state,
        entities,
      };
    }
    case fromTodo.SET_TODO: {
      const todo = action.payload;
      const found = state.entities[todo.id];
      // const found = state.data.find((el) => el.id === todo.id);
      if (found) {
        const newTodo: Todo = {
          ...todo,
        };
        const entities = {
          ...state.entities,
          [found.id]: newTodo,
        };

        return {
          ...state,
          entities,
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
      const searchResult = Object.values(state.entities).filter(
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
export const getAllTodos = (state: TodoState) => state.entities;
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
