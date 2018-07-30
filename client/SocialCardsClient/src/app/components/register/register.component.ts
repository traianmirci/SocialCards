import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  constructor(private _dataService:DataService, private _router:Router) { }

  ngOnInit() {
  }

  registerUser(registerUserData){
    this._dataService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token),
          this._router.navigate(['/dashboard'])
        },
        err => console.log(err)
      )
    console.log(this.registerUserData)
  }

}
