import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//services
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { AccueilService } from './services/accueil.service';
import { AuthService } from './services/auth.service';
// import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

//components
import { AppComponent } from './app.component';
import { ProfileTabsComponent } from './profileFolder/profile-tabs/profile-tabs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccueilComponent } from './accueilFolder/accueil/accueil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ColisComponent } from './accueilFolder/colis/colis.component';
import { ConducteurComponent } from './accueilFolder/conducteur/conducteur.component';
import { TrajetComponent } from './accueilFolder/trajet/trajet.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { InscrComponent } from './singleComponentFolder/inscr/inscr.component';
import { AuthComponent } from './singleComponentFolder/auth/auth.component';
import { SearchTrajConductComponent } from './searchFolder/search-traj-conduct/search-traj-conduct.component';
import { SidebarComponent } from './searchFolder/sidebar/sidebar.component';
import { AddTrajetComponent } from './singleComponentFolder/add-trajet/add-trajet.component';
import { AddColisComponent } from './singleComponentFolder/add-colis/add-colis.component';
import { FooterComponent } from './footerFolder/footer/footer.component';
import { AideComponent } from './footerFolder/aide/aide.component';
import { ContactComponent } from './footerFolder/contact/contact.component';
import { DescriptionComponent } from './footerFolder/description/description.component';
import { MapComponent } from './searchFolder/map/map.component';
import { PersonalDataComponent } from './profileFolder/personal-data/personal-data.component';
import { PhotoComponent } from './profileFolder/photo/photo.component';
import { VehicleComponent } from './profileFolder/vehicle/vehicle.component';
import { PreferencesComponent } from './profileFolder/preferences/preferences.component';
import { RatingComponent } from './profileFolder/rating/rating.component';
import { PaymentsComponent } from './singleComponentFolder/payments/payments.component';
import { AccountComponent } from './profileFolder/account/account.component';
import { AdminListUtComponent } from './adminFolder/admin-list-ut/admin-list-ut.component';
import { AdminListTrajComponent } from './adminFolder/admin-list-traj/admin-list-traj.component';
import { MessagerieComponent } from './messagerieFolder/messagerie/messagerie.component';
import { InfoTrajComponent } from './adminFolder/info-traj/info-traj.component';
import { AdminRemboursComponent } from './adminFolder/admin-rembours/admin-rembours.component';
import { AdminComponent } from './adminFolder/admin/admin.component';
import { LoginstatComponent } from './adminFolder/loginstat/loginstat.component';
import { ParcelstatComponent } from './adminFolder/parcelstat/parcelstat.component';
import { TripstatComponent } from './adminFolder/tripstat/tripstat.component';
import { UserstatComponent } from './adminFolder/userstat/userstat.component';
import { NavbarAdminComponent } from './adminFolder/navbar-admin/navbar-admin.component';
import { NavbarReservationComponent } from './reservations/navbar-reservation/navbar-reservation.component';
import { MesTrajComponent } from './reservations/mes-traj/mes-traj.component';
import { MesColisComponent } from './reservations/mes-colis/mes-colis.component';
import { MesTournComponent } from './reservations/mes-tourn/mes-tourn.component';


const appRoutes: Routes = [

  { path: 'profile', canActivate: [AuthGuard], component: ProfileTabsComponent }, // :id is a route parameter and data is to parse static data
  { path: 'accueil', component: AccueilComponent },
  { path: 'add-trajet', canActivate: [AuthGuard], component: AddTrajetComponent },
  { path: 'add-colis', canActivate: [AuthGuard], component: AddColisComponent },
  { path: 'searchTrajConduct', canActivate: [AuthGuard], component: SearchTrajConductComponent},
  { path: 'aide', component: AideComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'mes-traj', canActivate: [AuthGuard], component: MesTrajComponent },
  { path: 'mes-colis', canActivate: [AuthGuard], component: MesColisComponent },
  { path: 'mes-tourn', canActivate: [AuthGuard], component: MesTournComponent },
  { path: 'messagerie', canActivate: [AuthGuard], component: MessagerieComponent },
  { path: 'payements', canActivate: [AuthGuard], component: PaymentsComponent },
  { path: 'admin', canActivate: [AdminGuard], component: AdminComponent },
  { path: 'admin-list-ut', canActivate: [AdminGuard], component: AdminListUtComponent },
  { path: 'admin-list-traj', canActivate: [AdminGuard], component: AdminListTrajComponent },
  { path: 'info-traj', canActivate: [AuthGuard], component: InfoTrajComponent },
  { path: 'admin-rembours', canActivate: [AdminGuard], component: AdminRemboursComponent },
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
    AccountComponent,
    AdminListUtComponent,
    AdminListTrajComponent,
    MessagerieComponent,
    InfoTrajComponent,
    AdminRemboursComponent,
    AdminComponent,
    LoginstatComponent,
    ParcelstatComponent,
    TripstatComponent,
    UserstatComponent,
    NavbarAdminComponent,
    NavbarReservationComponent,
    MesTrajComponent,
    MesColisComponent,
    MesTournComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ChartsModule,
    HttpClientModule
  ],
  providers: [
    AccueilService,
    AuthService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
