import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo, [app-add-todo]',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  title = '';
  @Output('onadd') addEmitter = new EventEmitter<string>();

  // constructor(private todoService: TodoService) { }

  ngOnInit(): void {}

  addTodo() {
    // if (!this.title) return;

    // this.todoService.addTodo(this.title);
    // this.title = '';

    this.addEmitter.next(this.title);
  }
}
