import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

import * as fromActions from './todo.action';
import * as fromStore from './index';

@Injectable()
export class TodoEffect {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store<fromStore.AppState>
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_TODO),
      switchMap(() => {
        return this.todoService.loadTodos().pipe(
          map((todos) => new fromActions.LoadTodoSuccess(todos)),
          catchError((err) => of(new fromActions.LoadTodoFail(err)))
        );
      })
    )
  );

  saveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SAVE_TODO),
      switchMap(() => {
        return this.store.select(fromStore.getAllTodos).pipe(
          take(1),
          switchMap((todos) =>
            this.todoService.saveTodos(todos).pipe(
              map(() => new fromActions.SaveTodoSuccess()),
              catchError((err) => of(new fromActions.SaveTodoFail(err)))
            )
          )
        );

        // return this.todoService.saveTodos()
      })
    )
  );
}

export const effects = [TodoEffect];
