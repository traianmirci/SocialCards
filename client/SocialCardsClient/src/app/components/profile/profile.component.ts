import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;

  constructor(private dataService:DataService,private _router: Router) { }

  ngOnInit() {
    console.log(this._router.url)
    this.dataService.getUserByUsername(this._router.url.replace('/',''))
    .subscribe(
      res => {
        displayUser(res);
        console.log("xx",this.user)
      },
      err => {
        if (err.status == 404){
          this._router.navigate(['/404']);
        }
      }
    )


    function displayUser(user){
      this.user.name = user.user[0].name;
      //console.log(user.user[0].name)
      console.log('xx',user.user[0])
    }
  }

  
}
interface User{
  id?: string;
  name?: String;
  email?:  String;
  password?: String;
  picture?: String;
  biography?: String;
  userUrl?: String;
}