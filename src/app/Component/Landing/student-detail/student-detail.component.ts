import { Component, OnInit } from '@angular/core';
import {Student} from '../../../Models/Student';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {StudentService} from '../../../shared/Service/student.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'pm-medicine-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

    student: Student;
    formDisable: Boolean = true;
    IsNew: Boolean = false;
    constructor(private  _router:  ActivatedRoute,
              private  _route: Router,
              private   _studentService: StudentService
              ) { }

   studentForm:  FormGroup;

    Add(formValue) {
        this.student = <Student>{
            FirstName: formValue.FirstName,
            Lastname: formValue.Lastname,
            Email: formValue.Email,
            MobileNo: formValue.MobileNo,

        };
        this._studentService.Add(this.student).subscribe(
            (s) => {
                this._studentService.Get();
                this.Back();
            },
            (err) => {
            console.log(err);
            });

    }

    Update(formValue) {
      this.student = <Student>{
          FirstName: formValue.FirstName,
          Lastname: formValue.Lastname,
          Email: formValue.Email,
          MobileNo: formValue.MobileNo,
          RollNo: formValue.RollNo
      };
      this._studentService.Update(this.student).subscribe(
          (s) => {
            if (s) {
                this.Cancel();
                this.loadData(this.student.RollNo);
            }
          },
          (err) => { console.log(err); });

    }
    Back() {
        this._route.navigate( ['/Me'] );
    }

    Edit() {
        this.formDisable =  false;
       this.studentForm.enable();
    }

    Cancel() {
        this.formDisable =  true;
       this.studentForm.disable();
    }



  ngOnInit() {
    const studentId =  +this._router.snapshot.paramMap.get('Id');
    if (studentId > 0) {
        this.loadData( studentId );
    }else {
       this.newData();
    }

  }

  newData(): void {
      this.studentForm = new FormGroup({
          FirstName: new FormControl(),
          Lastname: new FormControl(),
          Email: new FormControl(),
          MobileNo: new FormControl(),
          RollNo: new FormControl()});
          this.IsNew =  true;
  }

  loadData(rollNumber): void {
      this._studentService.GetById(rollNumber).subscribe((med) => {
              if (!med) {
                  this._route.navigate( ['/Me'] );
              }else {

                  this.student =  med;
                  this.studentForm = new FormGroup({
                      FirstName: new FormControl(this.student.FirstName),
                      Lastname: new FormControl(this.student.Lastname),
                      Email: new FormControl(this.student.Email),
                      MobileNo: new FormControl(this.student.MobileNo),
                      RollNo: new FormControl(this.student.RollNo)
                  });
                  this.studentForm.disable();
              }

          },
          (err) => { console.log(err); }
      );

  }

}
