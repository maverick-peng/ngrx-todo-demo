import { Route, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { ShareModule } from "../../shared/share.module";

import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoSearchComponent } from './components/todo-search/todo-search.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';


const routes: Route[] = [
  {path: '', component: TodoListComponent}
];

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoSearchComponent,
    AddTodoComponent
  ],
  imports: [ ShareModule, RouterModule.forChild(routes) ]
})
export class TodoModule {}
