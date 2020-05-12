import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	ListComponent,
	UserComponent
} from './components';

export const UserRoutes: Routes = [
	{
		path: 'user',
		component: UserComponent,
		children: [
		  {
			path: '', 
			component: ListComponent
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(UserRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {
}
