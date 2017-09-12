import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  superMan = 'No Name';
  yourName = '';
  isSuperManFlying = false;
  flyColor: String = 'grey';
  stopColor: String = 'red';

  toggleFlying(status: boolean) {
    this.isSuperManFlying = status;
  }
}
