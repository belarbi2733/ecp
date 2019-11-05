import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProfileTabsComponent } from './profile-tabs/profile-tabs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ColisComponent } from './colis/colis.component';
import { ConducteurComponent } from './conducteur/conducteur.component';
import { TrajetComponent } from './trajet/trajet.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { InscrComponent } from './inscr/inscr.component';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from './services/auth-guard.service';
import { AccueilService } from './services/accueil.service';
import { AuthService } from './services/auth.service';
import { AddTrajetComponent } from './add-trajet/add-trajet.component';
import { AddColisComponent } from './add-colis/add-colis.component';





const appRoutes: Routes = [
  { path: 'profile', canActivate: [AuthGuard], component: ProfileTabsComponent , data: {title:'page title1'} }, // :id is a route parameter and data is to parse static data
  { path: 'accueil', component: AccueilComponent , data: {title:'page title2'} },
  { path: 'add-trajet', canActivate: [AuthGuard], component: AddTrajetComponent },
  { path: 'add-colis', canActivate: [AuthGuard], component: AddColisComponent },
  { path: 'auth',component: AuthComponent },
  { path: 'inscrire', component: InscrComponent },
  { path: '', component: AccueilComponent },
  { path: '**', component: FourOhFourComponent }


   //  The router will select this route if the requested URL doesn't match any paths for routes defined earlier in the
   //                                      configuration. This is useful for displaying a "404 - Not Found" page or redirecting to another route. It MUST BE THE LAST ROUTE
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileTabsComponent,
    AccueilComponent,
    NavbarComponent,
    ColisComponent,
    ConducteurComponent,
    TrajetComponent,

    FourOhFourComponent,
    InscrComponent,
    AuthComponent,
    AddTrajetComponent,
    AddColisComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AccueilService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
