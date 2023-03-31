import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl:string ='https://localhost:44341/api/Employees';

  constructor(private http:HttpClient) { }

  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl);
  }
  getEmployee(id:number):Observable<Employee>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  createEmployee(employee:Employee) :Observable<Employee>{
    return this.http.post<Employee>(this.baseUrl,employee)
  }

  updateEmployee(employee:Employee):Observable<Employee>{
    const url = `${this.baseUrl}/${employee.id}`;
    return this.http.put<Employee>(url,employee);
  }

  deleteEmployee(id:number): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Employee>(url);
  }
}
