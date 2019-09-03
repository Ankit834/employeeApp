import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeDetails } from 'src/app/shared/models/employeeDetails.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Department } from 'src/app/shared/models/department.interface';
import { Observable } from 'rxjs';
import { EmployeeType } from 'src/app/shared/models/employeeType.interface';
import { NgForm } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @ViewChild("f") public empForm : NgForm ;
  title: string = "Add New Employee"
  id: any;
  employee = {} as EmployeeDetails;
  isEdit: boolean = false;
  departments: Department[];
  employeeTypes: EmployeeType[];
  employeeDetails: Observable<EmployeeDetails>;
  message : string;
  imageUrl : string = "assets/images/default-image.png";
  fileToUpload : File = null;
  binaryImage : string;
  constructor(private router: Router, private route: ActivatedRoute, private empService: EmployeeService) { }

  ngOnInit() {
    this.getDepartments();
    this.getEmployeeTypes();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      this.title = "Edit Employee"
      this.isEdit = true;
      this.fetchEmployeeDetails(this.id);
    }

  }

  getDepartments(){
    this.empService.getDepartments().subscribe(data => {
      this.departments = data;
    });
    console.log(this.departments)
  }

  getEmployeeTypes(){
    this.empService.getEmployeeTypes().subscribe(data => {
      this.employeeTypes = data;
    });
    console.log(this.employeeTypes)
  }

  fetchEmployeeDetails(id : number){
    this.empService.getEmployeeById(id).subscribe(data => {
      console.log(data);
      this.employee = data;
      console.log(this.employee);
    })
  }

  onSubmit(){
    if(this.isEdit && this.id != null){
      this.employee.imageFile = this.binaryImage;
      this.empService.updateEmployee(this.employee).subscribe(() =>{
        this.message = "Data Updated Successfully";
        this.router.navigate(['/home']);
      });
    }

    else{
      this.empService.addEmployee(this.employee).subscribe(() => {
        this.message = "Data Saved Successfully";
        this.router.navigate(['/home']);
      });

    }
  }

  handleFileInput(file : FileList){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
      this.binaryImage = btoa(event.target.result)
    }

    reader.readAsDataURL(this.fileToUpload);
  }


}
