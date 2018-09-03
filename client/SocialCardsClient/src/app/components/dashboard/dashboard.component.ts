import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Link } from '../../models/link';
import {ToasterModule, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';
import {Md5} from 'ts-md5/dist/md5';
declare var $: any;






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
    email: " ",
    username: ""
    
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
    twitterPostsLimit: 5,
  }

  twitterEdit = {}
  instagramEdit = {}

  instagramPostsLimit:string;

  facebookNuevo = {
    active: true,
    type:"facebook",
    contenido:"",
    facebooktype:"fbpagina",
    url:""
  }
  facebookEdit = {}

  youtubeNuevo = {
    active: true,
    type:"youtube",
    contenido:"",
    youtubetype:"video",
    url:""
  }
  youtubeEdit = {}
  avatarUrl:any
  

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
    
    //this.loadScripts();
}

  ngOnInit() {
    this.user.biography="";
    this.user.twitterUsername = "";

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

      console.log("mi usuario",this.user)

  }
  
  getLinks() {      
    this.dataService.getLinksUser(this.user.username).subscribe((links)=>{this.links = links;console.log(links)})
  }
  getUser() {      
    this.dataService.getLoggedUser().subscribe((user)=>{
      console.log("el usuario que saco",user)
      this.user = user.user;
      this.getAvatarUrl();
      console.log("y el usuario que dejo guardado",this.user)
      this.getLinks();

    })
  }
  newLink(link){
    
    this.dataService.newLink(this.linkNuevo).subscribe((success)=>{console.log(JSON.stringify(success));this.links.push(success.link)})

    
  }

  linkEditFunction(link){
    console.log("editando",link);
    this.linkEdit = link;
  }

  twitterEditFunction(link){
    console.log("editando",link);
    //$("#modalEdit").modal('show');
    //$('.nav-tabs a[href="#' + "twitterEdit" + '"]').tab('show');

    this.twitterEdit = link
  }

  instagramEditFunction(link){
    console.log("editando",link);
    this.instagramEdit = link;
  }

  youtubeEditFunction(link){
    console.log("editando",link);
    this.youtubeEdit = link
  }

  facebookEditFunction(link){
    console.log("editando",link);
    this.facebookEdit = link
  }
  insertTwitter(){
    this.dataService.newLink(this.twitterNuevo).subscribe((success)=>{JSON.stringify(success);;this.links.push(success.link)})
    this.toasterService.pop({ type: 'success',
                              title: 'Twitter añadido correctamente',
                              body: "El usuario de twitter:"+this.twitterNuevo.twitterUsername+" se ha añadido correctamente"});
  }

  borrarLink(link){
    this.dataService.borrarLink(link).subscribe((success)=>{
      //reasigno links en vez de hacerle directamente filter para que me detecte los cambios y me recargue la vista
      this.links = this.links.filter(item => item._id != link._id)
      this.toasterService.pop({type: 'success',
                              title: 'Elemento borrado correctamente'});
    })
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

  getAvatarUrl(){
    console.log("el email es",this.user.email)
    let hash = Md5.hashStr(this.user.email)
    this.avatarUrl = 'https://www.gravatar.com/avatar/'+hash+'?s=200&d=retro'
  }

  loadScripts() {
    const dynamicScripts = [
     '../../../assets/js/core/popper.min.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  toggleLink(link){
    this.dataService.toggleLink(link).subscribe((success)=>{
      this.toasterService.pop({ type: 'success',
      title: 'Link cambiado con éxito'});
    })
  }

  updateLink(link){
    this.dataService.updateLink(link).subscribe((success)=>{
      this.toasterService.pop({ type: 'success',
      title: 'Link cambiado con éxito'});
    })
  }


}
