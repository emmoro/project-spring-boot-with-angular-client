import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilService {

  constructor() { }

  headers() {
  	let httpHeaders: HttpHeaders = new HttpHeaders();
	
  	if (localStorage['token']) {
  	  httpHeaders = httpHeaders.set(
  	  	'Authorization', 'Bearer ' + localStorage['token']
  	  );
  	}
    
    return { headers: httpHeaders };
  } 
	
  getIdUser(): string {
    if (!localStorage['token']) {
      return '';
    }
    const userData = this.getDataUser();
    return userData ? userData.id : '';
  }

  getDataUser() {
    if (!localStorage['token']) {
      return '';
    }
    return JSON.parse(atob(localStorage['token'].split('.')[1]));
  }

  getProfile(): string {
    if (!localStorage['token']) {
      return '';
    }
    const userData = this.getDataUser();
    return userData ? userData.role : '';
  } 

}
