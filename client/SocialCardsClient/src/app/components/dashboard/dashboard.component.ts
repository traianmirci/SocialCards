import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Link } from '../../models/link';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  links: Link[];
  user ={
    biography: "",
    twitterUsername: "",
    user: "",
    
  }
  linkNuevo = {
    active: true,
  }
  linkEdit = {
    
  }
  twitterNuevo = {
    active:true,
    type:"twitter",
    twitterUsername: "",
    twitterPostsLimit: 5
  }
  instagramPostsLimit:string;
  

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

    console.log("a ver si desde aqui lo veo",this.dataService.loggedInUser)
}

  ngOnInit() {
    this.user.biography="";
    this.user.twitterUsername = "";

    this.getLinks();
    this.getUser();
    this.dataService.getPrivado()
      .subscribe(
        res => {
          //console.log('privado')
          
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
    this.dataService.getLoggedUser().subscribe((user)=>{
      this.user = user;
      //console.log("que es mejor :",user,"o",user.user);
    })
  }
  newLink(link){
    this.dataService.newLink(this.linkNuevo).subscribe((success)=>{console.log(JSON.stringify(success))})
  } 
  linkEditFunction(link){
    console.log("editando",link);
    this.linkEdit = link;
  }

  insertTwitter(){
    //this.dataService.updateUser({twitterUsername : this.user.twitterUsername}).subscribe((success)=>{console.log(JSON.stringify(success))})
    console.log("estoy intentando meter esto",this.twitterNuevo)
    this.dataService.newLink(this.twitterNuevo).subscribe((success)=>{console.log("he metido uno nuevo",JSON.stringify(success))})
  }



}
