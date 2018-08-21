import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  links: Link[];
  user ={
    biography: "",
    
  }
  linkNuevo = {
    active: true,
  }
  linkEdit = {
    
  }

  constructor(private dataService:DataService,private _router:Router  ) { }

  ngAfterViewInit () {
    !function(d,s,id){
        var js: any,
            fjs=d.getElementsByTagName(s)[0],
            p='https';
        if(!d.getElementById(id)){
            js=d.createElement(s);
            js.id=id;
            js.src=p+"://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js,fjs);
        }
    }
    (document,"script","twitter-wjs");
}

  ngOnInit() {
    console.log("hola",this.user);
    this.user.biography="";
    console.log("hola2",this.user);

    this.getLinks();
    this.getUser();
    this.dataService.getPrivado()
      .subscribe(
        res => {
          //console.log('siiiiiiiiiiiiiiiiiiii')
          
        },
        err => {
          if (err.status == 500){
            this._router.navigate(['/login']);
          }
        }
      )

  }
  
  getLinks() {      
    this.dataService.getLinksUser().subscribe((links)=>{this.links = links;console.log(links)})
  }
  getUser() {      
    this.dataService.getLoggedUser().subscribe((user)=>{this.user = user;console.log(this.user)})
  }
  newLink(link){
    this.dataService.newLink(this.linkNuevo).subscribe((success)=>{console.log(JSON.stringify(success))})
  } 
  linkEditFunction(link){
    console.log("editando",link);
    this.linkEdit = link;
  }



}

interface Link{
  name: String,
  url: string,
  clicks: [{visits: Number, date:Date}],
  publicationDate: Date,
  active: boolean
}

interface User{
  id: string;
  name: String;
  email?:  String;
  password: String;
  picture: String;
  biography: String;
  userUrl: String;
}