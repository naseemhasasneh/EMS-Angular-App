import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

function numberRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit,OnDestroy {
  employeeForm!:FormGroup;
  employee:Employee=new Employee();
  private sub!: Subscription;
  constructor(private formBulider:FormBuilder ,private EmployeeService:EmployeeService,private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.employeeForm=this.formBulider.group({
      id:[0],
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      age:[0,[Validators.required,numberRange(22,50)]],
      position:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      salary:[0,[Validators.required,numberRange(260,5000)]],
  });

   // Read the product Id from the route parameter
   this.sub = this.route.paramMap.subscribe(
    params => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.getEmployee(id);
    }
  );
}
ngOnDestroy(): void {
  this.sub.unsubscribe();
}
  getEmployee(id: number): void {
    this.EmployeeService.getEmployee(id)
      .subscribe({
        next: (employee:Employee) => this.displayEmployee(employee),
      });
  }

  displayEmployee(employee:Employee): void {
   
    this.employee = employee;
    // Update the data on the form
    this.employeeForm.patchValue({
      id:this.employee.id,
      name: this.employee.name,
      age: this.employee.age,
      position: this.employee.position,
      salary: this.employee.salary
    });
  }

  onSubmit():void{
    const p = { ...this.employee, ...this.employeeForm.value };
    if(p.id ==0){
      this.createEmployee(p);
    }
    else{
      this.updateEmployee(p);
    }
    //this.employee.name = this.employeeForm.get('name')?.value;
    //this.employee.age = this.employeeForm.get('age')?.value;
    //this.employee.position = this.employeeForm.get('position')?.value;
    //this.employee.salary = this.employeeForm.get('salary')?.value;
   
}

  createEmployee(employee:Employee){
    
   this.EmployeeService.createEmployee(employee).subscribe(
    res=>this.onComplete()
   );
  }
  updateEmployee(employee:Employee){
    this.EmployeeService.updateEmployee(employee).subscribe(
      res=>this.onComplete()
    )
  }

  onComplete(){
    this.router.navigate(['/employees']);
  }

}
