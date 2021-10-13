import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './Componentes/crud/crud.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Crud',
    pathMatch:'full'
  },
  {
    path: '**',
    component: CrudComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
