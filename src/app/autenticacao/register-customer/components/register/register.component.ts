import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { RegisterCustomer } from '../../models';

import { RegisterCustomerService } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
  	private fb: FormBuilder,
	private snackBar: MatSnackBar,
    private router: Router,
    private registerCustomerService : RegisterCustomerService) { }

  ngOnInit() {
  	this.generateForm();
  }

  generateForm() {
	this.form = this.fb.group({
	  	name: ['', [Validators.required, Validators.minLength(3)]],
	  	lastName: ['', [Validators.required, Validators.minLength(3)]],
	  	username: ['', [Validators.required, Validators.minLength(4)]],
	  	password: ['', [Validators.required, Validators.minLength(6)]],
	  	email: ['', [Validators.required, Validators.email]]
	  	});
  }

  register() {
		if (this.form.invalid) {
	  		return;
	  	}

		const registerCustomer: RegisterCustomer = this.form.value;
	  	this.registerCustomerService.register(registerCustomer)
	      .subscribe(
	        data => {
	          console.log(JSON.stringify(data));
	          const msg: string = "Log in to access the system";
	          this.snackBar.open(msg, "Success", { duration: 5000 });
	          this.router.navigate(['/login']);
	        },
	        err => {
	          console.log(JSON.stringify(err));
	          let msg: string = "Try again in a moments.";
	          if (err.status == 400) {
	            msg = err.error.errors.join(' ');
	          }
	          this.snackBar.open(msg, "Error", { duration: 5000 });
	        }
	      );
		return false;
   }

}

