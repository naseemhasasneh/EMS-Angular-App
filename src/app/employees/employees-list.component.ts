import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit,AfterViewInit,OnDestroy {
  employees:Employee[]=[];
  displayedColumns: string[] = ['name', 'age', 'positon','salary','edit','delete'];
  dataSource=new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  constructor(private employeeService:EmployeeService){}

  ngOnInit() : void{
   this.getEmployees();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe({
      next:emps =>this.dataSource.data=emps,
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
