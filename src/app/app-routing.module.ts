import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewUsersComponent} from './user/view-users/view-users.component';


const routes: Routes = [
  {
    path: '', component: ViewUsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
