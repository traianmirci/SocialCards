import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {ToasterModule, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';



@Component({
  selector: 'app-storeinstagram',
  templateUrl: './storeinstagram.component.html',
  styleUrls: ['./storeinstagram.component.css']
})
export class StoreinstagramComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService:DataService,
    private _router: Router,
    private toasterService:ToasterService) {        this.toasterService = toasterService;
    }

  postslimit:any;
  public config: ToasterConfig =     new ToasterConfig({positionClass: 'toast-top-left'});


  ngOnInit() {
  

  }

  guardar(){
    this.route.fragment.subscribe((fragment: string) => {
        this.dataService.saveInstagram(fragment.replace('access_token=',''),this.postslimit)
        .subscribe(
          res => {
            var toast : Toast = {
              type: 'success',
              title: 'Petición correcta',
              body: 'El limite se ha asignado correctamente',
              };
            this.toasterService.pop(toast);
            this._router.navigate(['/dashboard']);


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

  setLimit(id){
    //this.dataService.

  }
}

