import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}


  constructor(private dataService:DataService
  ) { }

  ngOnInit() {
  }

  loginUser(loginUserData){
    this.dataService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res),
          localStorage.setItem('token', res.json().token),
          console.log(res.json().token)
        },
        err => console.log(err)
      )
    console.log(this.loginUserData)
  }
}
