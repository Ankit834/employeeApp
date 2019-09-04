import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeGrid } from 'src/app/shared/models/employeeGrid.interface';
import { MatDialog, MatTable, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.css']
})
export class EmployeeGridComponent implements OnInit {

  dataSource: any;
  displayColumns: string[] = ['name', 'designation', 'employeeType', 'managerName', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private empService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.loadAllEmployees();
  }

  loadAllEmployees(){
    this.empService.getAllEmployees().subscribe(data => {
      this.dataSource = new MatTableDataSource<EmployeeGrid>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteEmployee(id : number){
    this.empService.deleteEmployee(id).subscribe(
      () =>{
        this.loadAllEmployees();
      });
  }

}
