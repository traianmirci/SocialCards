import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:Http) { 
    console.log('Data service connected')
  }

  getUser(){
    return this.http.get('http://localhost:3000/api/user/5b561f16f4e3d30a68754113')
      .pipe(map(res=> res.json()))
  }


}
