import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Student} from '../../Models/Student';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {environment} from '../../../environments/environment';
import { Subject } from 'rxjs';



@Injectable()
export class StudentService {

    constructor(private _http: HttpClient) { }
   // private   _productUrl  = './api/student/student.json';
    private _studentUrl= environment.studentUrl;
    private  _studentList: Student[]  =  [];
    private studentUpdated = new Subject<Student[]>();

    private  HandleError(err: HttpErrorResponse) {
        console.log(err);
        return  Observable.throw(err.message);
    }

    GetById(Id: Number): Observable<Student> {
        let  student: Student;
        this._studentList.forEach((item) => {
            if (item.RollNo ===  Id) {
                student = item;
            }
        });
        return  Observable.of(student);
    }

    Get(): Observable<Student[]> {

        if (this._studentList.length >= 1) {
            return Observable.of( this._studentList );
        } else {
            return this._http.get<Student[]>( this._studentUrl )
                .do( data => {
                    this._studentList = data;
                    this.studentUpdated.next([...this._studentList]);
                })
                .catch( this.HandleError );
        }

    }

    Update(student: Student): Observable<boolean> {
        this._studentList.forEach((item) => {
            if (item.RollNo ===  student.RollNo) {
                item.FirstName =  student.FirstName;
                item.Lastname =  student.Lastname;
                item.Email =  student.Email;
                item.MobileNo =  student.MobileNo;
            }
        });
        return  Observable.of(true);
    }

    Delete(studentRollNo: Number): Observable<boolean> {
        const array  = [];
        this._studentList.forEach((item) => {
            if (item.RollNo !==  studentRollNo) {
                array.push(item);
            }
        });

        this._studentList =  array;
        return  Observable.of(true);
    }

    Add(student: Student): Observable<boolean> {
        /*
student.RollNo =  this._studentList.length + 1;
        this._studentList.push(student);
*/
        this._http.post(environment.studentUrl, student)
            .subscribe(res => {
                console.log(res);
                let studentObject;
                studentObject = res;
                this._studentList.push(studentObject);
                this.studentUpdated.next([...this._studentList]);
            });
        return  Observable.of(true);

    }

    getStudentUpdateListener() {
        return this.studentUpdated.asObservable();
    }

}

