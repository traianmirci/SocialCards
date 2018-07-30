import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  constructor(private dataService:DataService,private _router:Router  ) { }

  ngOnInit() {
  }

  loginUser(loginUserData){
    this.dataService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res),
          localStorage.setItem('token', res.token),
          console.log(res.token),
          this._router.navigate(['/dashboard'])
        },
        err => console.log(err)
      )
    console.log(this.loginUserData)
  }
}
