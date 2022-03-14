import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item, [app-todo-item]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = {};
  @Output('onremove') deleteEmiiter = new EventEmitter<number>();
  @Output('completeChange') completeEmiiter = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.deleteEmiiter.next(this.todo.id);
  }

  change(checked) {
    this.completeEmiiter.next({ ...this.todo, complete: checked });
  }
}
