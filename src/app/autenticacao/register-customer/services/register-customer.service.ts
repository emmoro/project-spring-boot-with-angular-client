import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

import { RegisterCustomer } from '../';

@Injectable()
export class RegisterCustomerService {

  private readonly PATH: string = 'registerCustomer';

  constructor(private http: HttpClient) { }

  register(registerCustomer: RegisterCustomer): Observable<any> {
  	  return this.http.post(env.baseApiUrl + this.PATH, registerCustomer);
  }

}
