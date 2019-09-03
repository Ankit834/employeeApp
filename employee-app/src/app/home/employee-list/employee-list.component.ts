import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeGrid } from 'src/app/shared/models/employeeGrid.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  allEmployees: Observable<EmployeeGrid[]>;

  constructor(private empService: EmployeeService, private route: Router) { }

  ngOnInit() {
    this.loadAllEmployees();
  }

  loadAllEmployees(){
    this.allEmployees = this.empService.getAllEmployees();
  }

  deleteEmployee(id : number){
    this.empService.deleteEmployee(id).subscribe(
      () =>{
        this.loadAllEmployees();
      });
  }

}
