import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeesListComponent } from './employees/employees-list.component';
import { RouterModule,Routes } from '@angular/router';
import { AddEmployeeComponent } from './employees/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'addEmployee', component: AddEmployeeComponent},
  { path: 'employee/edit/:id', component: AddEmployeeComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    DataTablesModule,
    CommonModule,
    BrowserAnimationsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
