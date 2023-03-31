import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit,OnDestroy {
  employees:Employee[]=[];
  dtOptions: DataTables.Settings = {};
  constructor(private employeeService:EmployeeService){}

  ngOnInit() : void{
    this.dtOptions = {
      //pagingType: 'full_numbers',
      //pageLength: 10,    
      //processing: true,  
      //search:true  
      
    };
   this.getEmployees();

  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe({
      next:emps =>this.employees=emps,
    }
    );
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe(
      res => this.getEmployees()
    );
  }
  ngOnDestroy(): void {
    
  }

}
