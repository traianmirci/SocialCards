import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';
import { Link } from '../../models/link';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?:User;
  instagram:any;
  iGimages? : instagramImage[] = [{imageUrl: "" , igUrl: ""}];
  igUsername : string;
  userCorrecto: boolean = false;
  links: Link[];



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

      this.dataService.showInstagramFeed(this._router.url.replace('/',''))
      .subscribe(
        res => {
          this.instagram = res;
          this.displayInstagramFeed(res);
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
  getLinks() {      
    this.dataService.getLinksUser().subscribe((links)=>{this.links = links;console.log(links)})
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
  


