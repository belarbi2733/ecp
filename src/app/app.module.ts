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
import { SearchTrajConductComponent } from './search-traj-conduct/search-traj-conduct.component';
import { SidebarComponent } from './sidebar/sidebar.component';





const appRoutes: Routes = [
  { path: 'profile', canActivate: [AuthGuard],component: ProfileTabsComponent }, // :id is a route parameter and data is to parse static data
  { path: 'accueil', component: AccueilComponent },
  { path: 'auth',component: AuthComponent },
  { path: 'inscrire', component: InscrComponent},
  { path: 'searchTrajConduct', component: SearchTrajConductComponent},
  { path: '', component: AccueilComponent},
  { path: '**', component: FourOhFourComponent}


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
    SearchTrajConductComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
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
