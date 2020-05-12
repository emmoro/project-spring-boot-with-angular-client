import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterCustomerComponent, RegisterComponent  } from './components';

export const RegisterCustomerRoutes: Routes = [
	{
		path: 'registerCustomer',
		component: RegisterCustomerComponent,
		children: [
			{ path: '', 
			component: RegisterComponent 
			}
		]
	}
];

@NgModule({
  imports: [ RouterModule.forChild(RegisterCustomerRoutes) ],
  exports: [ RouterModule ]
})
export class RegisterCustomerRoutingModule {
}

