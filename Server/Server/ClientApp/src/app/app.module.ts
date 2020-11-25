import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// De her type moduler bruges til design af hjemmesiden:
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserComponent } from "./user/home.component";
import { RegisterComponent } from "./user/register/register.component";
import { LoginComponent } from "./user/login/login.component";
import { AuthGuard } from "./guard/auth.guard";
import { AuthInterceptorService } from "./interceptor/auth-interceptor.service";
import { UserService } from "./Service/UserService/user.service";

import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button/";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { NavbarComponent } from "./navbar/navbar.component";
import { AboutComponent } from "./OtherComponents/about/about.component";
import { MatMenuModule } from "@angular/material/menu";
import { ComponentsComponent } from "./OtherComponents/component/components/components.component";
import { LoansComponent } from "./OtherComponents/MyLoans/loans/loans.component";
import { ProfilComponent } from "./OtherComponents/profil/profil.component";
import { DetailComponentComponent } from "./OtherComponents/component/detail-component/detail-component.component";
import { AdminComponent } from "./Admin/admin/admin.component";
import { ListReservationsComponent } from "./OtherComponents/MyLoans/list-reservations/list-reservations.component";
import { ReservationDialogComponent } from "./OtherComponents/component/components/reservation-dialog/reservation-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ComponentReservationConfirmedComponent } from "./OtherComponents/component/component-reservation-confirmed/component-reservation-confirmed.component";
import { DeleteReservationComponent } from "./OtherComponents/MyLoans/delete-reservation/delete-reservation.component";
import { PostComponentComponent } from "./Admin/post-component/post-component.component";
import { AdminComponentsListComponent } from "./Admin/editComponent/admin-components-list/admin-components-list.component";
import { AdminDetailedComponentComponent } from "./Admin/editComponent/admin-detailed-component/admin-detailed-component.component";
import { AdminReservationDialogComponent } from "./Admin/editComponent/admin-detailed-component/admin-reservation-dialog/admin-reservation-dialog.component";
import { GetUserComponent } from './Admin/EditUser/get-user/get-user.component';
import { EditUserComponent } from './Admin/EditUser/edit-user/edit-user.component';
import { CreateUserComponent } from './Admin/create-user/create-user.component';
import { DeleteLoanComponent } from './Admin/loanProperty/delete-loan/delete-loan.component';
import { LoanGetUserComponent } from './Admin/loanProperty/loan-get-user/loan-get-user.component';
import { LoanPropertyComponent } from './Admin/loanProperty/loan-property/loan-property.component';
import { LoanPropertyDialogComponent } from './Admin/loanProperty/loan-property/loan-property-dialog/loan-property-dialog.component';
import { DeleteComponentComponent } from './Admin/editComponent/delete-component/delete-component.component';
import { CreateCategoriesComponent } from './Admin/create-categories/create-categories.component';
import { DeleteProfilDialogComponent } from './OtherComponents/profil/delete-profil-dialog/delete-profil-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    AboutComponent,
    ComponentsComponent,
    LoansComponent,
    ProfilComponent,
    DetailComponentComponent,
    AdminComponent,
    ListReservationsComponent,
    ReservationDialogComponent,
    ComponentReservationConfirmedComponent,
    DeleteReservationComponent,
    PostComponentComponent,
    AdminComponentsListComponent,
    AdminDetailedComponentComponent,
    AdminReservationDialogComponent,
    GetUserComponent,
    EditUserComponent,
    CreateUserComponent,
    DeleteLoanComponent,
    LoanGetUserComponent,
    LoanPropertyComponent,
    LoanPropertyDialogComponent,
    DeleteComponentComponent,
    CreateCategoriesComponent,
    DeleteProfilDialogComponent,
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,

    // Her under importer man animations på browseren
    BrowserAnimationsModule,

    FormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  // provider er en object, som er erklæret til angular, så det kan inject i counstructor af alle komponenter.
  providers: [
    AuthGuard,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  // Booststrp er en funktion komponent i core ng module som sørger for at starte angular applikation manuel.
  bootstrap: [AppComponent],
  // Der er tilføjet komponenter til entryComponent, for at kunne fortælle offline template compiler
  // til at compile dem og oprette factories for dem.
  entryComponents: [
    ReservationDialogComponent,
    AdminReservationDialogComponent,
  ],
})
export class AppModule {}
