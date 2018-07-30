import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService:DataService,private _router:Router  ) { }

  ngOnInit() {
    this.dataService.getPrivado()
      .subscribe(
        res => {
          console.log('siiiiiiiiiiiiiiiiiiii')
        },
        err => {
          if (err.status == 500){
            this._router.navigate(['/login']);
          }
        }
      )
  }

}
