import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DataService]
})
export class NavbarComponent implements OnInit {
  username:String ="";
  

  constructor(private dataService:DataService) { }

  
  ngOnInit() {
    this.username = this.dataService.loggedInUser;
    console.log('username ahora',this.username)
    console.log(this.dataService.loggedInUser)
    console.log(this.dataService.loggedInUser)

  }

}
