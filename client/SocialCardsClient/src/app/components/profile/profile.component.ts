import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';
import { Link } from '../../models/link';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user?:User;

  instagram = [{
    active:true,
    type:"instagram",
    instagram: {
      accesstoken: "",
      postslimit: 0
    },
    data:""
  }]
  
  iGimages? : instagramImage[] = [{imageUrl: "" , igUrl: ""}];
  igUsername : string;
  igProfilePicture : string;
  userCorrecto: boolean = false;
  links: Link[];

  twitter = [{
    active:true,
    type:"twitter",
    twitter: {
      username: "",
      postslimit: 0
    },
  }]


  
  



  constructor(private dataService:DataService,private _router: Router) { }

  ngOnInit() {
    console.log(this._router.url.replace('/',''))
    
    this.dataService.getUserByUsername(this._router.url.replace('/',''))
    .subscribe(
      res => {
        displayUser(res);
        console.log("xx",res.user[0])
        this.user = res.user[0]
        console.log('ee',this.user)
        
        //displayInstagramFeed(this.user.instagramToken)

      },
      err => {
        if (err.status == 404){
          this._router.navigate(['/404']);
        }
      }
    )
    

    this.getLinks();

     
    

    function displayUser(user){
      //this.user.name = user.user[0].name;
      //console.log(user.user[0].name)
      console.log('xx',user.user[0])
    }

  }

  getLinks() {      
    this.dataService.getLinksUser().subscribe((links)=>{
      this.links = links;
      console.log(links)
      this.parsearLinks(this.links)
    })
  }

  parsearLinks(links): void{
    links.forEach(element => {
      if(element.type == "twitter"){
        this.twitter.push(element)
      }else if(element.type == "instagram"){
        
        var datosInsta;
        this.dataService.showInstagramFeed(element.instagram.accesstoken)
        .subscribe(
          res => {
            element.data = res;
            this.instagram.push(element);
            this.displayInstagramFeed(res);
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

   displayInstagramFeed(json) :void{
    var auxiliar: instagramImage[] = []


    json.data.forEach(element => {
      let img: instagramImage = {imageUrl: "" , igUrl: ""};
      img.imageUrl = element.images.standard_resolution.url;
      img.igUrl = element.link;
      
      auxiliar.push(img)
    }); 

    this.iGimages = auxiliar;  
    console.log(this.iGimages)
    this.igUsername = json.data[0].user.username;
    this.igProfilePicture = json.data[0].user.profile_picture;
    console.log("hola",this.igUsername)

  }

  //para el script de twitter
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
}



interface instagramImage{
  imageUrl?: String,
  igUrl?: String
} 
  


