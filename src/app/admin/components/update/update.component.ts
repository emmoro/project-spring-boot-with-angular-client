import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ListService,
  Product,
  HttpUtilService
} from '../../../shared';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  form: FormGroup;
  productId: string;
  description: string;
  details: string;
  urlSite: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private listService: ListService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.generateForm();
    this.getProductData();  
  }

  getProductData() {
    this.listService.findById(this.productId)
      .subscribe(
        dados => {
          const data = dados.data;
  		    this.form.get('description').setValue(dados.data.description);
  		    this.form.get('details').setValue(dados.data.details);
  		    this.form.get('urlSite').setValue(dados.data.urlSite);
        },
        err => {
          let msg: string = "Error get Product";
          this.snackBar.open(msg, "Error", { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      );
  }

  generateForm() {
  	this.form = this.fb.group({
  	  description: ['', [Validators.required]],
  	  details: ['', [Validators.required]],
      urlSite: ['', [Validators.required]]
  	});
  }

  updateProduct() {
  	if (this.form.invalid) return;

    const data = this.form.value;
    this.listService.updateProduct(this.getProduct(data))
      .subscribe(
        data => {
          const msg: string = "Product Successfully updated!";
          this.snackBar.open(msg, "Success", { duration: 5000 });
          this.router.navigate(['/admin']);
        },
        err => {
          let msg: string = "Try again in a moment.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Error", { duration: 5000 });
        }
      );
  }

  getProduct(data: any): Product {
  
    return new Product(
        data.description,
        data.details,
        data.urlSite,
        this.productId
      );
  }

  get userId(): string {
    return sessionStorage['userId'];
  }

}
