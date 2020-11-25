import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user/home.component";
import { RegisterComponent } from "./user/register/register.component";
import { LoginComponent } from "./user/login/login.component";
import { LoansComponent } from "./OtherComponents/MyLoans/loans/loans.component";
import { ProfilComponent } from "./OtherComponents/profil/profil.component";
import { ListReservationsComponent } from "./OtherComponents/MyLoans/list-reservations/list-reservations.component";
import { ComponentsComponent } from "./OtherComponents/component/components/components.component";
import { AuthGuard } from "./guard/auth.guard";
import { AboutComponent } from "./OtherComponents/about/about.component";
import { DetailComponentComponent } from "./OtherComponents/component/detail-component/detail-component.component";
import { AdminComponent } from "./Admin/admin/admin.component";
import { ComponentReservationConfirmedComponent } from "./OtherComponents/component/component-reservation-confirmed/component-reservation-confirmed.component";
import { DeleteReservationComponent } from "./OtherComponents/MyLoans/delete-reservation/delete-reservation.component";
import { PostComponentComponent} from "./Admin/post-component/post-component.component";
import { AdminComponentsListComponent } from "./Admin/editComponent/admin-components-list/admin-components-list.component";
import { AdminDetailedComponentComponent } from "./Admin/editComponent/admin-detailed-component/admin-detailed-component.component";
import { GetUserComponent } from "./Admin/EditUser/get-user/get-user.component";
import { EditUserComponent } from "./Admin/EditUser/edit-user/edit-user.component";
import { CreateUserComponent } from "./Admin/create-user/create-user.component";
import { DeleteLoanComponent } from "./Admin/loanProperty/delete-loan/delete-loan.component";
import { LoanGetUserComponent } from "./Admin/loanProperty/loan-get-user/loan-get-user.component";
import { LoanPropertyComponent } from "./Admin/loanProperty/loan-property/loan-property.component";
import{DeleteComponentComponent} from './Admin/editComponent/delete-component/delete-component.component';
import{CreateCategoriesComponent} from './Admin/create-categories/create-categories.component';
// Kilder: https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
const routes: Routes = [
  {
    path: "",
    component: UserComponent,
  },
  {
    path: "register",
     component: RegisterComponent 
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk'
    } 
  },
  {
    path: "create-categories",
    component: CreateCategoriesComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
    } 
  },
  {
    path: "delete-component/:id",
    component: DeleteComponentComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin'
    } 
  },
  {
    path: "loan-property/:id",
    component: LoanPropertyComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk'
    } 
  },
  {
    path: "loan-get-user",
    component: LoanGetUserComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk'
    } 
  },
  {
    path: "delete-loan/:id",
    component: DeleteLoanComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk'

    } 
  },
  {
    path: "admin-create-user",
    component: CreateUserComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin'
    } 
  },
    {
    path: "admin-edit-user/:id",
    component: EditUserComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin'
    } 
  },
  {
    path: "admin-get-user",
    component: GetUserComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin'
    } 
  },
  {
    path: "admin-components-list",
    component: AdminComponentsListComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin'
    } 
  },
  {
    path: "admin-detailed-component/:id",
    component: AdminDetailedComponentComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin'
    } 
  },
  {
    path: "delete-reservation/:id",
    component: DeleteReservationComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk',
      expectedRoleStudent: 'Student',
      expectedRoleStaff: 'Staff'
    } 
  },
  {
    path: "components",
    component: ComponentsComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk',
      expectedRoleStudent: 'Student',
      expectedRoleStaff: 'Staff'
    } 
  },
  {
    path: "loans",
    component: LoansComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk',
      expectedRoleStudent: 'Student',
      expectedRoleStaff: 'Staff'
    } 
  },
  {
    path: "component-reservation-confirmed/:id",
    component: ComponentReservationConfirmedComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk',
      expectedRoleStudent: 'Student',
      expectedRoleStaff: 'Staff'
    } 
  },
  {
    path: "create-component",
    component: PostComponentComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin'
    } 
  },
  {
    path: "profil",
    component: ProfilComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk',
      expectedRoleStudent: 'Student',
      expectedRoleStaff: 'Staff'
    } 
  },
  {
    path: "list-reservation",
    component: ListReservationsComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk',
      expectedRoleStudent: 'Student',
      expectedRoleStaff: 'Staff'
    } 
  },
  {
    path:"detailcomponent/:id",
    component: DetailComponentComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedRoleAdmin: 'Admin',
      expectedRoleClerk: 'Clerk',
      expectedRoleStudent: 'Student',
      expectedRoleStaff: 'Staff'
    } 
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full"
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
