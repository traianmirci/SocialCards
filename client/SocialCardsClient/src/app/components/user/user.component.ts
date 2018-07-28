import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: string;
  name: String;
  email:  String;
  password: String;
  signUpDate: {type: Date};
  lastLogin: Date;
  picture: String;
  biography: String;
  userUrl: String;
  occupation: { type: String, enum: ['Student','Developer']};
  country: { type: String, enum: ['Spain','USA','France']};

  links: Link[];

  isEdit:boolean = false;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.name = 'Traian';
    this.email = "traian@gmail.com";
    this.id = "5b5a5998be57931458f22886";
     

    this.dataService.getUser().subscribe((users)=>{console.log(users)})
    this.dataService.getLinksUser(this.id).subscribe((links)=>{this.links = links;console.log(links)})
  }

  onClick(){
    console.log('Hola')
    this.name = "nombre cambiado"
  }

  addLink(link){
    console.log(link)
    this.links.push(link);
    return false;
  }

  deleteLink(link){
    console.log(link)
    for(let i=0;i<this.links.length;i++){
      if(this.links[i]==link){
        this.links.splice(i, 1)
      }
    }
  }

  toggleEdit(){
    this.isEdit = !this.isEdit;
  }

}


interface Link{
  name: String,
  url: string,
  clicks: [{visits: Number, date:Date}]
  publicationDate: Date,
  user: UserComponent
}