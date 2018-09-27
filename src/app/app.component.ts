import { Component } from '@angular/core';
import {AuthenticationService} from './shared/Service/authentication.service';
import {StudentService} from './shared/Service/student.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [ AuthenticationService, StudentService]
})
export class AppComponent {
  title = 'Angular: Getting Started';
}
