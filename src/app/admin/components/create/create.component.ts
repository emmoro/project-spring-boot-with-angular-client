import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
  ListService,
  Product,
  HttpUtilService
} from '../../../shared';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
  	private fb: FormBuilder,
	  private snackBar: MatSnackBar,
    private router: Router,
    private listService : ListService) { }

  ngOnInit() {
  	this.generateForm();
  }

  generateForm() {
	this.form = this.fb.group({
	  	description: ['', [Validators.required, Validators.minLength(5)]],
	  	details: ['', [Validators.required, Validators.minLength(15)]],
	  	urlSite: ['', [Validators.required, Validators.minLength(5)]]
	});
  }

  registerProduct() {
	  if (this.form.invalid) {
  		return;
    }

	  const product: Product = this.form.value;
  	  this.listService.registerProduct(product)
        .subscribe(
          data => {
            console.log(JSON.stringify(data));
            const msg: string = "Product successfully registered";
            this.snackBar.open(msg, "Success", { duration: 5000 });
            this.router.navigate(['/admin/']);
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