import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-storeinstagram',
  templateUrl: './storeinstagram.component.html',
  styleUrls: ['./storeinstagram.component.css']
})
export class StoreinstagramComponent implements OnInit {

  constructor(private route: ActivatedRoute,private dataService:DataService,private _router: Router) { }

  ngOnInit() {
    this.myfunction()
  }

  myfunction(){
    this.route.fragment.subscribe((fragment: string) => {
        this.dataService.saveInstagram(fragment.replace('access_token=',''))
        .subscribe(
          res => {
            //displayUser(res);
            console.log("xx",res)

          },
          err => {
            if (err.status == 404){
              this._router.navigate(['/404']);
            }
          }
        )
        console.log('http://localhost:3000/api/user/saveInstagram/'.concat(fragment))
    })
  }
}
