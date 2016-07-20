import { Component } from '@angular/core';
import { FallouthackcrackerComponentComponent } from './fallouthackcracker-component/';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [FallouthackcrackerComponentComponent]
})
export class AppComponent {
  title = 'app works!';
}
