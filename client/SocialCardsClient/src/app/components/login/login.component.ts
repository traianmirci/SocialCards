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
  resultado:string = '';
  error:boolean = false;

  ngOnInit() {
  }

  loginUser(loginUserData){
    this.dataService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token),
          console.log("era:",this.dataService.loggedInUser)

          this.dataService.loggedInUser = res.username,
          console.log("acum:",this.dataService.loggedInUser)

          this._router.navigate(['/dashboard'])
        },
        err => {
          this.error = true;
          switch (err.status) {
            case 404:
                this.resultado = "Usuario no existe"
              break;
            case 401:
                this.resultado = "Login incorrecto"
            case 403:
                this.resultado = "Login incorrecto"
            break;
            case 200:
                this.resultado = "Login correcto"
              break;

            default:
              this.resultado = JSON.stringify(err);
              break;
          }
        }
      )
  }
}
