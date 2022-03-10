import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShareModule } from '../../shared/share.module';

import { StoreModule } from '@ngrx/store';

import { reducers } from './store';
import { effects } from './store/todo.effect';

import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoSearchComponent } from './components/todo-search/todo-search.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EffectsModule } from '@ngrx/effects';

const routes: Route[] = [{ path: '', component: TodoListComponent }];

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoSearchComponent,
    AddTodoComponent,
  ],
  imports: [
    ShareModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('app', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class TodoModule {}
