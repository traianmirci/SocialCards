import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  registerUser(registerUserData){
    this.dataService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res),
          localStorage.setItem('token', res.json().token),
          console.log(res.json().token)
        },
        err => console.log(err)
      )
    console.log(this.registerUserData)
  }

}
