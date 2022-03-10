import { Component, OnInit } from '@angular/core';

import { TodoService } from './../../services/todo.service';
import * as fromStore from '../../store';

import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  todos$: Observable<Todo[]>;
  constructor(
    private todoService: TodoService,
    private store: Store<fromStore.AppState>
  ) {
    // this.todos$ = this.todoService.getTodos();
    this.todos$ = this.store
      .select(fromStore.getTodoSearchResults)
      .pipe(tap((a) => console.log(a)));
  }
  ngOnInit(): void {}

  loadTodos() {
    // this.todoService.loadTodos();
    this.store.dispatch(new fromStore.LoadTodo());
  }

  saveTodos() {
    // this.todoService.saveTodos();
    this.store.dispatch(new fromStore.SaveTodo());
  }

  addTodo(title: string) {
    this.store.dispatch(new fromStore.AddTodo(title));
  }

  removeTodo(id: number) {
    this.store.dispatch(new fromStore.RemoveTodo(id));
  }
}
