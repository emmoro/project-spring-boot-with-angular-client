import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	ListComponent,
	CreateComponent,
	UpdateComponent,
	AdminComponent
} from './components';

import { AdminGuard } from './services';

export const AdminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [ AdminGuard ],
		children: [
		  {
			path: '', 
			component: ListComponent
		  },
		  {
			path: 'create', 
			component: CreateComponent 
		  },
		  {
			path: 'update/:productId', 
			component: UpdateComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
