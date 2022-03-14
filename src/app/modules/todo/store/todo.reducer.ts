import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Todo } from '../models/todo.model';

import * as fromTodo from './todo.action';

// export interface TodoState {
//   entities: { [id: number]: Todo };

// }

export interface State extends EntityState<Todo> {
  loading: boolean;
  loaded: boolean;
  saved: boolean;
  searchResult: Todo[];
  search: string;
}

// const initialState: TodoState = {
//   entities: {},
//   loading: false,
//   loaded: false,
//   saved: false,
//   searchResult: [],
//   search: '',
// };

const adapter = createEntityAdapter<Todo>();

const initialState = adapter.getInitialState({
  loading: false,
  loaded: false,
  saved: false,
  searchResult: [],
  search: '',
});

export const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case fromTodo.LOAD_TODO: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromTodo.LOAD_TODO_SUCCESS: {
      const data = action.payload;
      return adapter.setAll(data, state);
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
      return adapter.addOne(todo, state);
    }
    case fromTodo.REMOVE_TODO: {
      const id = action.payload;
      return adapter.removeOne(id, state);
    }
    case fromTodo.SET_TODO: {
      const todo = action.payload;
      return adapter.setOne(todo, state);
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
export const { selectAll } = adapter.getSelectors();
export const getTodosLoading = (state: State) => state.loading;
export const getTodosLoaded = (state: State) => state.loaded;
export const getTodoSaved = (state: State) => state.saved;

export const getSearch = (state: State) => state.search;
export const getSearchResults = (state: State) => {
  if (getSearch(state)) {
    return state.searchResult;
  }
  return selectAll(state);
};

export * from './todo.action';
