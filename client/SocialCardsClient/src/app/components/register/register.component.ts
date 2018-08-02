import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = <any>{  }
  constructor(private _dataService:DataService, private _router:Router) { }
  resultado:string = '';
  error:boolean = false;

  ngOnInit() {
  }

  registerUser(registerUserData){
    console.log(this.registerUserData.email);
    if(this.registerUserData.password != this.registerUserData.password2){
      this.error = true;
      this.resultado = 'Las contraseñas deben coincidir'
      console.log("esto",this.registerUserData.email)
  }else if(this.registerUserData.email.includes('@')){

    this._dataService.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token),
        this._router.navigate(['/dashboard'])
      },
      err =>{
        if(err.status == 409){
          console.log(err.error)

          this.resultado = err.error.message;
          this.error = true;
        }
      }
    )
    console.log(this.registerUserData)
  }else if (!this.registerUserData.email.valid){
    this.error = true;
    this.resultado = 'Introduce un email válido';
  }
}
    

}
