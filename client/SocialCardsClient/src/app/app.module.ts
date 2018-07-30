import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';

import { DataService } from './services/data.service';
import { HelpComponent } from './components/help/help.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StreamsComponent } from './components/streams/streams.component';
import { StreamDetailsComponent } from './components/stream-details/stream-details.component';
import { AddStreamComponent } from './components/add-stream/add-stream.component';
import { EditStreamComponent } from './components/edit-stream/edit-stream.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';

import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

const appRoutes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  {path:'user', component:UserComponent,canActivate: [AuthGuard]}


];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HelpComponent,
    DashboardComponent,
    StreamsComponent,
    StreamDetailsComponent,
    AddStreamComponent,
    EditStreamComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService, AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true //poder usar multiples interceptores
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
