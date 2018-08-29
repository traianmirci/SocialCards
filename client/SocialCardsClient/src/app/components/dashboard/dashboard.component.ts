import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Link } from '../../models/link';
import {ToasterModule, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';





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
    type:"link",
    name:""
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

  facebookNuevo = {
    active: true,
    type:"facebook",
    contenido:"",
    facebooktype:"fbpagina",
    url:""
  }

  youtubeNuevo = {
    active: true,
    type:"youtube",
    contenido:"",
    youtubetype:"video",
    url:""
  }
  
  

  constructor(private dataService:DataService,private _router:Router,private toasterService:ToasterService) {
    this.toasterService = toasterService;
  }

 

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

    var toast : Toast = {
      type: 'success',
      title: 'Elemento añadido correctamente',
      body: this.linkNuevo.name+" añadido correctamente",
      };
    this.toasterService.pop(toast);
    this.links.push(this.linkNuevo);
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

  insertFacebook(tipo){
    switch(tipo) { 
      case "fbpagina": { 
        //this.facebookNuevo.contenido = `<div class="fb-post" data-href="`.concat(this.facebookNuevo.contenido).concat(`" data-width="500" data-show-text="true"><blockquote cite="https://www.facebook.com/20531316728/posts/10154009990506729/" class="fb-xfbml-parse-ignore">Publicada por <a href="https://www.facebook.com/facebook/">Facebook</a> en&nbsp;<a href="https://www.facebook.com/20531316728/posts/10154009990506729/">Jueves, 27 de agosto de 2015</a></blockquote></div>`;
        this.facebookNuevo.facebooktype = "fbpagina";
        console.log("el tipo es",this.facebookNuevo.facebooktype)
        this.dataService.newLink(this.facebookNuevo).subscribe((success)=>{console.log("he metido uno nuevo",JSON.stringify(success))})
 
         break; 
      } 
      case "fbvideo": { 
        this.facebookNuevo.facebooktype = "fbvideo";
        console.log("el tipo es",this.facebookNuevo.facebooktype)
        this.dataService.newLink(this.facebookNuevo).subscribe((success)=>{console.log("he metido uno nuevo",JSON.stringify(success))})
  
         break; 
      }
      case "fbpublicacion": { 
        this.facebookNuevo.facebooktype = "fbpublicacion";
        console.log("el tipo es",this.facebookNuevo.facebooktype)
        this.dataService.newLink(this.facebookNuevo).subscribe((success)=>{console.log("he metido uno nuevo",JSON.stringify(success))})

        break; 
      }  
      default: { 
         //statements; 
         break; 
      } 
   } 

  }

  insertYoutube(tipo){
    console.log("estoy intentando meter esto",this.youtubeNuevo)
    switch(tipo) { 
      case "video": { 
        this.youtubeNuevo.youtubetype = "video";
        console.log("el tipo es",this.youtubeNuevo.youtubetype)
        this.dataService.newLink(this.youtubeNuevo).subscribe((success)=>{console.log("he metido uno nuevo",JSON.stringify(success))})
 
         break; 
      } 
      case "playlist": { 
        this.youtubeNuevo.youtubetype = "playlist";
        console.log("el tipo es",this.youtubeNuevo.youtubetype)
        this.dataService.newLink(this.youtubeNuevo).subscribe((success)=>{console.log("he metido uno nuevo",JSON.stringify(success))})
  
         break; 
      }
      default: { 
         //statements; 
         break; 
      } 
   } 
   
  }



}
