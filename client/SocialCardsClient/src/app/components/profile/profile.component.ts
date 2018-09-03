import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';
import { Link } from '../../models/link';
import * as $ from 'jquery';
import { FacebookService, InitParams } from 'ngx-facebook';
import { DomSanitizer } from '@angular/platform-browser';

 

declare var jquery:any;
declare var $ :any;
declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user?:User;
  links: Link[];

  twitter = [{
    active:true,
    type:"twitter",
    twitter: {
      username: "",
      postslimit: 0
    },
  }]

  instagram = [{
    active:true,
    type:"instagram",
    instagram: {
      accesstoken: "",
      postslimit: 0
    },
    data:""
  }]

  facebook = [{
    active: true,
    type:"facebook",
    contenido:"",
    facebooktype:"fbpagina",
    url:""
  }]

  youtube = [{
    active: true,
    type:"youtube",
    youtubetype:"video",
    url:""
  }]

  videocode = "hz8SPiw-_MQ";


  constructor(private dataService:DataService,private _router: Router,private fb: FacebookService,public sanitizer: DomSanitizer) { 
    /*let initParams: InitParams = {
      appId: '636914473329974',
      xfbml: true,
      version: 'v2.8'
    };
 
    fb.init(initParams);*/



  window.fbAsyncInit = () => {
    console.log("fbasyncinit")

    FB.init({
        appId            : '636914473329974',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.10'
    });
    FB.AppEvents.logPageView();
}

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


 
  }

  ngOnInit() {
    //console.log(this._router.url.replace('/',''))
    
    this.dataService.getUserByUsername(this._router.url.replace('/',''))
    .subscribe(
      res => {
        displayUser(res);
        console.log("xx",res.user[0])
        this.user = res.user[0]
        
        console.log('ee',this.user)
        this.getLinks();
      },
      err => {
        if (err.status == 404){
          this._router.navigate(['/404']);
        }
      }
    )
    
    


    function displayUser(user){
      //this.user.name = user.user[0].name;
      //console.log(user.user[0].name)
      console.log('xx',user.user[0])
    }
    

  }

  getHeader() {
    
  }
  getLinks() {      
    this.dataService.getLinksUser(this.user.username).subscribe((links)=>{
      this.links = links;
      console.log(links)
      this.parsearLinks(this.links)
    })
  }

  
  youtube_parser(url){
    var ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
      return ID;
}

  parsearLinks(links): void{
    links.forEach(element => {
      if(element.type == "twitter"){
        this.twitter.push(element)
      }else if(element.type == "facebook"){
        if(element.facebooktype == "fbvideo"){
          element.url = "https://www.facebook.com/plugins/video.php?href="+ encodeURIComponent(element.url)+"&width=297&show_text=false&appId=636914473329974&height=166" 
        }else if(element.facebooktype == "fbpublicacion"){
          element.url = "https://www.facebook.com/plugins/post.php?href="+ encodeURIComponent(element.url)+"&width=297&show_text=false&appId=636914473329974&height=326" 
        }else if(element.facebooktype == "fbpagina"){
          element.url =  "https://www.facebook.com/plugins/page.php?href="+ encodeURIComponent(element.url)+"&tabs=timeline&width=297&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=636914473329974"
                       
        }
        this.facebook.push(element)
      }else if(element.type == "youtube"){
        if(element.youtubetype == 'video'){
          console.log("POPO",this.youtube_parser(element.url))
          element.url = this.youtube_parser(element.url)
        }else if(element.youtubetype == 'playlist'){
          element.url = element.url.replace('https://www.youtube.com/playlist?list=','')
          element.url = element.url.replace('http://www.youtube.com/playlist?list=','')

        }

        this.youtube.push(element)
      }else if(element.type == "instagram"){
        
        var datosInsta;
        this.dataService.showInstagramFeed(element.instagram.accesstoken)
        .subscribe(
          res => {
            element.data = res;
            this.instagram.push(element);
          },
          err => {
            if (err.status == 404){
              this._router.navigate(['/404']);
            }
          }
        )

      }
    });   
  
  }

  sacarTwitter(){
    console.log("mi objeto twitter",this.twitter)
  }

 

  //para el script de twitter
  ngAfterViewInit () {
    
  }

  
}

function sanearUrl(url){
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

interface instagramImage{
  imageUrl?: String,
  igUrl?: String
} 
  
