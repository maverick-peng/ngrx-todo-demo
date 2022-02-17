import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinct, tap } from 'rxjs/operators'
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-search, [app-todo-search]',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.css']
})
export class TodoSearchComponent implements OnInit, OnDestroy {

  searchTxt: string = ''

  searchSubject: Subject<string> = new Subject();
  subscription: Subscription = new Subscription();

  @ViewChild('search') searchRef: ElementRef;
  @Input() placeholder = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.subscription = this.searchSubject.pipe(
      delay(200),
      debounceTime(1000),
      tap(() => {
        this.todoService.searchTodo(this.searchRef.nativeElement.value);
      })
    ).subscribe();
  }

  onSearchChange() {
    this.searchSubject.next();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
