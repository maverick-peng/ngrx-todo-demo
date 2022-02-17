import { Component, OnInit } from '@angular/core';

import { TodoService } from './../../services/todo.service';

import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  todos$: Observable<Todo[]>;
  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos();
  }

  ngOnInit(): void {
  }

  loadTodos() {
    this.todoService.loadTodos();
  }

  saveTodos() {
    this.todoService.saveTodos();
  }
}
