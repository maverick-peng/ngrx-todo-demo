import { IndexComponent } from './modules/index/components/index/index.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: '/todo', pathMatch: 'full' },
      { path: 'todo', loadChildren: () => import('./modules/todo/todo.module').then(m => m.TodoModule) },
      { path: '**', redirectTo: '' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
