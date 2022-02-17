import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Todo } from "../models/todo.model";

@Injectable({providedIn: 'root'})
export class TodoService {

  loaded = false;
  loading = false;
  todos: Todo[] = [];

  todoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject([] as Todo[]);

  public broadcast() {
    this.todoSubject.next(this.todos);
  }

  loadTodos() {
    let result: Todo[] = [];
    const data = localStorage.getItem('todos');
    if (data) {
      result = JSON.parse(data);
    }
    this.todos = result;
    this.todoSubject.next(this.todos);
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos(): Observable<Todo[]> {
    return this.todoSubject;
  }

  addTodo(title: string){
    const newTodo: Todo = {
      title,
      createDate: new Date().toLocaleDateString(),
      id: this.generateNewId(),
      complete: false
    }

    this.todos.push(newTodo);
    console.log(this.todos)
    this.todoSubject.next(this.todos);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todoSubject.next(this.todos);
  }

  setTodo(todo: Todo) {
    const found = this.todos.find(el => el.id === todo.id);
    if (found){
      found.complete = todo.complete;
      found.createDate = todo.createDate;
      found.title = todo.title;
    }
    this.todoSubject.next(this.todos);
  }

  searchTodo(search: string) {
    console.log(search)
    if (search === '') {
      this.todoSubject.next(this.todos);
    } else {
      const searchResult = this.todos.filter(el => el.title!.indexOf(search) > -1);
      this.todoSubject.next(searchResult);
    }
  }

  private generateNewId() {
    if (this.todos.length === 0) {
      return 0;
    } else {
      return this.todos.length;
    }
  }


}
