import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProfileTabsComponent } from './profile/profile-tabs/profile-tabs.component';
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
import { AddTrajetComponent } from './add-trajet/add-trajet.component';
import { AddColisComponent } from './add-colis/add-colis.component';
import { FooterComponent } from './footer/footer.component';
import { AideComponent } from './aide/aide.component';
import { ContactComponent } from './contact/contact.component';
import { DescriptionComponent } from './description/description.component';
import { MapComponent } from './map/map.component';
import { PersonalDataComponent } from './profile/personal-data/personal-data.component';
import { PhotoComponent } from './profile/photo/photo.component';
import { VehicleComponent } from './profile/vehicle/vehicle.component';
import { PreferencesComponent } from './profile/preferences/preferences.component';
import { RatingComponent } from './profile/rating/rating.component';
import { PaymentsComponent } from './profile/payments/payments.component';
import { AccountComponent } from './profile/account/account.component';


const appRoutes: Routes = [

  { path: 'profile', canActivate: [AuthGuard],component: ProfileTabsComponent }, // :id is a route parameter and data is to parse static data
  { path: 'accueil', component: AccueilComponent },
  { path: 'add-trajet', canActivate: [AuthGuard], component: AddTrajetComponent },
  { path: 'add-colis', canActivate: [AuthGuard], component: AddColisComponent },
  { path: 'searchTrajConduct', canActivate: [AuthGuard], component: SearchTrajConductComponent},
  { path: 'aide', component: AideComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'auth', component: AuthComponent },
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
    SearchTrajConductComponent,
    SidebarComponent,
    AddTrajetComponent,
    AddColisComponent,
    FooterComponent,
    AideComponent,
    ContactComponent,
    DescriptionComponent,
    MapComponent,
    PersonalDataComponent,
    PhotoComponent,
    VehicleComponent,
    PreferencesComponent,
    RatingComponent,
    PaymentsComponent,
    AccountComponent
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
