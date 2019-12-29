import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
// services
import { AuthGuard } from './services/singleComponentServices/auth-guard.service';
import { AdminGuard } from './services/singleComponentServices/admin-guard.service';
import { AccueilService } from './services/accueil.service';
import { AuthService } from './services/singleComponentServices/auth.service';
import { DriverService } from './services/map.service';
import { ValidationService} from './searchFolder/sidebar/validation.service';
// import { ConfirmationDialogService } from './searchFolder/validation/confirmation-dialog.service'
// import {MesColisService} from './services/profileServices/mes-colis.service';
import { ValidationTrajetService} from './validationtrajet/validationtrajet.service';
import {MesTournService} from './services/profileServices/mes-tourn.service';

// import { TrajetService} from './searchFolder/sidebar/trajet';
import { ConfirmationDialogService } from './searchFolder/validation/confirmation-dialog.service';
import {MesColisService} from './services/profileServices/mes-colis.service';
import {MesTrajService} from './services/profileServices/mes-traj.service';
// modules for file upload ( profile pic )
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileSelectDirective } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';

// import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

// components
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
import { Navbar2Component } from './navbar2/navbar2.component';
// import { RouteData } from './searchFolder/map/map.interface';
import { AdmintableComponent } from './adminFolder/admintable/admintable.component';
import { MailingService } from './services/mailing.service';
import { PaypalComponent } from './paypal/paypal.component';
import {PersonalDataService} from './services/profileServices/personal-data.service';
import {AccountService} from './services/profileServices/account.service';
import {PreferencesService} from './services/profileServices/preferences.service';
import {RatingService} from './services/profileServices/rating.service';
import {VehicleService} from './services/profileServices/vehicle.service';
import {DataTrajService} from './services/admin-list-traj.service';
import {AdminListUtService} from './services/admin-list-user.service';
import {InscrService} from './services/singleComponentServices/inscr.service';
import { LienInscrService } from './services/singleComponentServices/lien-inscr.service';
import {AddColisService} from './services/singleComponentServices/add-colis.service';
import {AddtrajetService} from './services/singleComponentServices/addtrajet.service';
import { ServerconfigService } from './serverconfig.service';
import { PaypalService } from './services/paypal.service';
import { AdminpayComponent } from './adminFolder/adminpay/adminpay.component';
import { InfoCondComponent } from './adminFolder/info-cond/info-cond.component';
import { UserStatService } from './services/adminServices/userstat.service';
import { LienInscrComponent } from './singleComponentFolder/lien-inscr/lien-inscr.component';
import {  ConfirmationDialogComponent } from './searchFolder/validation/confirmation-dialog.component';
import {ValidationTrajetComponent} from './validationtrajet/validationtrajet.component';
import { PhotoService } from './services/profileServices/photo.service';

const appRoutes: Routes = [
  // tslint:disable-next-line:max-line-length
  { path: 'profile', canActivate: [AuthGuard], component: ProfileTabsComponent }, // :id is a route parameter and data is to parse static data
  { path: 'accueil', component: AccueilComponent },
  { path: 'add-trajet', canActivate: [AuthGuard], component: AddTrajetComponent },
  { path: 'add-colis', canActivate: [AuthGuard], component: AddColisComponent },
  { path: 'validationtrajet', canActivate: [AuthGuard], component: ValidationTrajetComponent },
  { path: 'searchTrajConduct', canActivate: [AuthGuard], component: SearchTrajConductComponent},
  { path: 'aide', component: AideComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'mes-traj', canActivate: [AuthGuard], component: MesTrajComponent },
  { path: 'mes-colis', canActivate: [AuthGuard], component: MesColisComponent },
  { path: 'mes-tourn', canActivate: [AuthGuard], component: MesTournComponent },
  { path: 'messagerie', canActivate: [AuthGuard], component: MessagerieComponent },
  { path: 'payements', canActivate: [AuthGuard], component: PaymentsComponent },
  { path: 'paypal', canActivate: [AuthGuard], component: PaypalComponent },
  { path: 'admin', canActivate: [AdminGuard], component: AdminComponent },
  { path: 'admin-list-ut', canActivate: [AdminGuard], component: AdminListUtComponent },
  { path: 'admin-list-traj', canActivate: [AdminGuard], component: AdminListTrajComponent },
  { path: 'info-traj', canActivate: [AuthGuard], component: InfoTrajComponent },
  { path: 'info-cond', canActivate: [AuthGuard], component: InfoCondComponent },
  { path: 'admin-rembours', canActivate: [AdminGuard], component: AdminRemboursComponent },
  { path: 'adminpay', canActivate: [AdminGuard], component: AdminpayComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'inscrire', component: InscrComponent },
  { path: 'lien-inscrire', component: LienInscrComponent },
  { path: '', component: AccueilComponent },
  { path: '**', component: FourOhFourComponent },
  { path: 'map', canActivate: [DriverService], component: MapComponent },
  {path: 'validation', canActivate : [ConfirmationDialogService], component: ConfirmationDialogComponent}


   //  The router will select this route if the requested URL doesn't match any paths for routes defined earlier in the
  // tslint:disable-next-line:max-line-length
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
    PaypalComponent,
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
    MesTournComponent,
    Navbar2Component,
    AdmintableComponent,
    AdminpayComponent,
    InfoCondComponent,
    LienInscrComponent,
    ConfirmationDialogComponent,
    FileSelectDirective,
    ValidationTrajetComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ChartsModule,
    HttpClientModule,
    NgxPayPalModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule
  ],
  providers: [
    AccueilService,
    AuthService,
    AuthGuard,
    AdminGuard,
    DriverService,
    MailingService,
    InscrService,
    LienInscrService,
    AddColisService,
    AddtrajetService,
    PersonalDataService,
    AccountService,
    PreferencesService,
    RatingService,
    VehicleService,
    DataTrajService,
    MesTournService,
    AdminListUtService,
    AddtrajetService,
    ServerconfigService,
    PaypalService,
    UserStatService,
    ValidationService,
    ConfirmationDialogService,
    MesColisService,
    ValidationTrajetService,
    MesTrajService,
    MesTournService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
