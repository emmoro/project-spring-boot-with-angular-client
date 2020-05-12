import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import 'rxjs/add/observable/of';

import {
  ListService,
  Product,
  HttpUtilService
} from '../../../shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<Product>;
  column: string[] = ['description', 'details', 'urlSite'];
  totalProducts: number;

  private page: number;
  private order: string;
  private direc: string;

  products: Product[];
  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  form: FormGroup;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private listService: ListService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.page = 0;
    this.standardOrder();
    this.displayProducts();
  }

  displayProducts() {
    this.listService.findAllProduct()
      .subscribe(
        data => {
          const products = data['data'] as Product[];
          this.dataSource = new MatTableDataSource<Product>(products);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          const msg: string = "Error getting product.";
          this.snackBar.open(msg, "Error", { duration: 5000 });
        }
    );
  }

  standardOrder() {
    this.order = 'description';
    this.direc = 'DESC';
  }

  paginate(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.displayProducts();
  }

  ordain(sort: Sort) {
    if (sort.direction == '') {
      this.standardOrder();
    } else {
      this.order = sort.active;
      this.direc = sort.direction.toUpperCase();
    }
    this.displayProducts();
  }

}