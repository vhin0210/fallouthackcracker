declare var componentHandler: any;

import { Component, OnInit } from '@angular/core';
// import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
// import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
// import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
// import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
// import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
// import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { FallouthackcrackerComponentComponent } from './fallouthackcracker-component/';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
  	// MD_CARD_DIRECTIVES,
  	// MD_BUTTON_DIRECTIVES,
   //  MD_PROGRESS_CIRCLE_DIRECTIVES,
   //  MD_TOOLBAR_DIRECTIVES,
   //  MD_GRID_LIST_DIRECTIVES,
  	// MdIcon,
  	FallouthackcrackerComponentComponent
  ]
  // providers: [ MdIconRegistry ]
})
export class AppComponent implements OnInit {
  title = 'Fallout Hack Cracker';

  ngOnInit() {
    componentHandler.upgradeDom();
  }
}
