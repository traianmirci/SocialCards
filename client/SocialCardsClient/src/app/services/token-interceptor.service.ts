import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req,next){
    let dataService = this.injector.get(DataService)

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${dataService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
