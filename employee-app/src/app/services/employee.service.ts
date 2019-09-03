import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';  

import { BaseService } from './base.service';
import { EmployeeDetails } from '../shared/models/employeeDetails.interface';
import { EmployeeGrid } from '../shared/models/employeeGrid.interface';
import { Department } from '../shared/models/department.interface';
import { EmployeeType } from '../shared/models/employeeType.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {

  empApiUrl: string = "http://localhost:55621/api/employee/";

  constructor(private http: HttpClient) {
    super()
   }

   getDepartments(): Observable<Department[]>{
     let authToken = localStorage.getItem('auth_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${authToken}`
      })
    };
    return this.http.get<Department[]>(this.empApiUrl + "Departments", httpOptions);
   }

   getEmployeeTypes(){
    return this.http.get<EmployeeType[]>(this.empApiUrl + "EmployeeTypes");
   }

   getAllEmployees() : Observable<EmployeeGrid[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
     return this.http.get<EmployeeGrid[]>(this.empApiUrl + "employees", httpOptions);
   }

   getEmployeeById(empId: number): Observable<EmployeeDetails>{
    return this.http.get<EmployeeDetails>(this.empApiUrl + empId);

   }

   addEmployee(employee: EmployeeDetails){
    return this.http.post(this.empApiUrl, employee);
   }

   updateEmployee(employee: EmployeeDetails){
    return this.http.put(this.empApiUrl, employee);
   }

   deleteEmployee(id: number){
     return this.http.delete(this.empApiUrl + id);
    }
  
}
