import { Component, OnInit } from '@angular/core';
import {Student} from '../../../Models/Student';
import {StudentService} from '../../../shared/Service/student.service';
import {forEach} from '@angular/router/src/utils/collection';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {


    StudentList: Student[];
    private studentsSub: Subscription;
    FilterList: Student[];
    SearchString: String;
  constructor(private  _studentService: StudentService) { }




  Search(): void {
      if (this.SearchString.length > 2) {
          const array = [];
          const str   =  this.SearchString.toLocaleLowerCase();
          for (let i = 0; i <  this.FilterList.length ; i++) {
              if (this.FilterList[i].FirstName.toLocaleLowerCase().indexOf(str) !== -1) {
                  array.push(this.FilterList[i]);
              }
          }
          this.FilterList = array;
      }else {
          this.FilterList =  this.StudentList;
      }

  }

  ngOnInit() {
      this._studentService.Get().subscribe(s => {
              this.StudentList = s;
              this.FilterList = this.StudentList;
          },
          error => console.log(error)
      );

      this.studentsSub = this._studentService.getStudentUpdateListener()
          .subscribe((students: Student[]) => {
              this.StudentList = students;
          });
  }

}
